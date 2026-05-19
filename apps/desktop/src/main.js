const { app, BrowserWindow, ipcMain, Menu, globalShortcut, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const HIDManager = require('./hid-manager');

let rdevGrabber = null;
let rdevRunning = false;
let isInControlMode = false;
let isWindowFocused = false;
const OSRBOT_PROVENANCE = Object.freeze({
  product: 'OSRBOT Link',
  owner: 'OSRBOT',
  hardwareContributor: 'Maxwell',
  hardwareId: 'USB\\VID_413D&PID_2107',
  marker: 'OSRBOT-LINK::413D:2107'
});

function loadRdevGrabber() {
  const basePath = path.join(__dirname, '..', 'native', 'rdev-grabber');
  const asarUnpackedPath = basePath.replace('app.asar', 'app.asar.unpacked');
  const resourceNativePath = process.resourcesPath
    ? path.join(process.resourcesPath, 'native', 'rdev-grabber')
    : null;
  const resourceUnpackedPath = process.resourcesPath
    ? path.join(process.resourcesPath, 'app.asar.unpacked', 'native', 'rdev-grabber')
    : null;

  const candidatePaths = [
    basePath,
    asarUnpackedPath,
    resourceNativePath,
    resourceUnpackedPath
  ].filter(Boolean);

  let lastError = null;
  for (const candidate of candidatePaths) {
    try {
      if (!fs.existsSync(candidate)) {
        continue;
      }
      const grabber = require(candidate);
      console.log('rdev-grabber loaded from', candidate);
      return grabber;
    } catch (err) {
      lastError = err;
    }
  }

  console.warn(
    'rdev-grabber native module not loaded; system hotkeys will not be blocked. Build it via npm run build:native.',
    lastError ? `Error: ${lastError.message}` : ''
  );
  return null;
}

function getBundledResourcePath(fileName) {
  const candidates = [
    process.resourcesPath ? path.join(process.resourcesPath, fileName) : null,
    path.join(__dirname, '..', 'assets', fileName),
    path.join(__dirname, '..', fileName)
  ].filter(Boolean);

  return candidates.find(candidate => fs.existsSync(candidate)) || null;
}

function copyLinuxPermissionFiles() {
  const rulesSource = getBundledResourcePath('99-hidraw-permissions.rules');
  const scriptSource = getBundledResourcePath('post-install.sh');
  if (!rulesSource || !scriptSource) {
    throw new Error('Linux HID permission helper files are missing from the application bundle.');
  }

  const tempDir = path.join(os.tmpdir(), 'osrbot-link-permissions');
  fs.mkdirSync(tempDir, { recursive: true });

  const rulesTarget = path.join(tempDir, '99-hidraw-permissions.rules');
  const scriptTarget = path.join(tempDir, 'post-install.sh');
  fs.copyFileSync(rulesSource, rulesTarget);
  fs.copyFileSync(scriptSource, scriptTarget);
  fs.chmodSync(scriptTarget, 0o755);
  return scriptTarget;
}

function runFile(command, args, options = {}) {
  return new Promise((resolve) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      resolve({
        success: !error,
        error: error ? error.message : null,
        stdout: stdout || '',
        stderr: stderr || ''
      });
    });
  });
}

function linuxPermissionManualCommand() {
  return [
    'sudo tee /etc/udev/rules.d/99-osrbot-link.rules >/dev/null <<EOF',
    '# OSRBOT keyboard/mouse sharing device',
    'SUBSYSTEM=="hidraw", ATTRS{idVendor}=="413d", ATTRS{idProduct}=="2107", MODE="0666", GROUP="plugdev", TAG+="uaccess"',
    'SUBSYSTEM=="usb", ATTR{idVendor}=="413d", ATTR{idProduct}=="2107", MODE="0666", GROUP="plugdev", TAG+="uaccess"',
    'EOF',
    'sudo udevadm control --reload-rules',
    'sudo udevadm trigger',
    'sudo usermod -a -G plugdev "$USER"'
  ].join('\n');
}

// Start/stop rdev grab based on focus + control state
function updateGrabState() {
  const shouldGrab = isInControlMode && isWindowFocused;
  console.log('updateGrabState', { shouldGrab, isInControlMode, isWindowFocused, rdevRunning });
  if (shouldGrab && !rdevRunning && rdevGrabber && typeof rdevGrabber.start_grab === 'function') {
    // Check permissions before starting grab (macOS requirement)
    if (!checkMacOSPermissions()) {
      console.error('Cannot start keyboard grab: macOS permissions not granted');
      return;
    }

    try {
      rdevGrabber.start_grab((event) => {
        if (!event) {
          console.warn('rdev callback received null event');
          return;
        }

        // Normalize event data from rdev
        const payload = {
          key: event.key || 'Unknown',
          code: event.code || event.key || '',
          eventType: event.event_type || event.eventType || 'down',
          ctrlKey: !!(event.ctrl ?? event.ctrlKey),
          altKey: !!(event.alt ?? event.altKey),
          shiftKey: !!(event.shift ?? event.shiftKey),
          metaKey: !!(event.meta ?? event.metaKey),
          platformCode: event.platform_code ?? event.platformCode ?? null,
          scanCode: event.scan_code ?? event.scanCode ?? null,
          usbHid: event.usb_hid ?? event.usbHid ?? null,
        };

        console.log('━━━ RDEV EVENT ━━━', {
          type: payload.eventType,
          key: payload.key,
          code: payload.code,
          usbHid: payload.usbHid,
          modifiers: {
            ctrl: payload.ctrlKey,
            alt: payload.altKey,
            shift: payload.shiftKey,
            meta: payload.metaKey
          },
          isInControlMode,
          hidConnected: hidManager?.connected
        });

        // In control mode: send directly to HID
        if (isInControlMode && hidManager && hidManager.connected) {
          console.log('→ Sending to HID:', payload.key, payload.code);
          const result = hidManager.sendKeyboardEvent({
            type: payload.eventType === 'up' ? 'keyup' : 'keydown',
            key: payload.key,
            code: payload.code,
            usbHid: payload.usbHid,
            scanCode: payload.scanCode,
            platformCode: payload.platformCode,
            metaKey: payload.metaKey,
            ctrlKey: payload.ctrlKey,
            altKey: payload.altKey,
            shiftKey: payload.shiftKey,
          });
          if (!result.success) {
            console.error('✗ HID send failed:', result.error);
          }
        } else {
          console.log('✗ Not sending to HID:', { isInControlMode, hidConnected: hidManager?.connected });
        }

        // Also send to renderer for quit key detection
        if (mainWindow && mainWindow.webContents) {
          mainWindow.webContents.send('global-key-pressed', payload);
        }
      });
      rdevRunning = true;
      console.log('✓ rdev grab started - capturing keyboard events');
    } catch (err) {
      console.error('Failed to start rdev grabber:', err);
    }
  } else if (!shouldGrab && rdevRunning && rdevGrabber && typeof rdevGrabber.stop_grab === 'function') {
    try {
      rdevGrabber.stop_grab();
    } catch (err) {
      console.warn('Failed to stop rdev grabber:', err);
    }
    rdevRunning = false;
    console.log('✓ rdev grab stopped - keyboard released');
  } else if (shouldGrab && rdevRunning) {
    console.log('⚠ rdev already running');
  } else if (!shouldGrab && !rdevRunning) {
    console.log('⚠ rdev already stopped');
  }
}

rdevGrabber = loadRdevGrabber();

// Check macOS permissions (following RustDesk's approach)
function checkMacOSPermissions() {
  if (process.platform !== 'darwin') {
    return true;
  }

  const { systemPreferences } = require('electron');

  // Check for Input Monitoring permission (required for keyboard capture on macOS 10.15+)
  const hasInputMonitoring = systemPreferences.isTrustedAccessibilityClient(false);

  if (!hasInputMonitoring) {
    console.warn('⚠️  PERMISSION REQUIRED: Input Monitoring / Accessibility access is not granted!');
    console.warn('');
    console.warn('To enable keyboard capture on macOS:');
    console.warn('1. Open System Settings → Privacy & Security → Accessibility');
    console.warn('2. Add "OSRBOT Link" or "Electron" to the list');
    console.warn('3. Restart the application');
    console.warn('');
    console.warn('Alternatively, the app will prompt you when you try to use keyboard capture.');

    // Show system prompt to request permission
    setTimeout(() => {
      systemPreferences.isTrustedAccessibilityClient(true); // true = show prompt
    }, 1000);

    return false;
  }

  console.log('✅ macOS permissions granted: Input Monitoring / Accessibility');
  return true;
}

// Disable network services and SSL connections at startup (guarded for safety)
if (app && app.commandLine) {
  if (process.platform === 'linux') {
    app.commandLine.appendSwitch('no-sandbox');
    app.commandLine.appendSwitch('disable-setuid-sandbox');
  }

  app.commandLine.appendSwitch('--disable-features', 'CertificateTransparencyComponentUpdater');
  app.commandLine.appendSwitch('--disable-background-networking');
  app.commandLine.appendSwitch('--disable-background-timer-throttling');
  app.commandLine.appendSwitch('--disable-backgrounding-occluded-windows');
  app.commandLine.appendSwitch('--disable-component-update');
  app.commandLine.appendSwitch('--disable-default-apps');
  app.commandLine.appendSwitch('--disable-ipc-flooding-protection');
  app.commandLine.appendSwitch('--disable-web-security');
  app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');
  app.commandLine.appendSwitch('--disable-features', 'DnsOverHttps');
  app.commandLine.appendSwitch('--disable-domain-reliability');
}

let mainWindow;
let hidManager;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Disable network access for security and to prevent SSL errors
      webSecurity: true,
      allowRunningInsecureContent: false,
      // Disable additional web features that might make network requests
      experimentalFeatures: false
    },
    titleBarStyle: process.platform === 'darwin' ? 'default' : 'default',
    title: 'OSRBOT Link',
    show: false,
    icon: path.join(__dirname, '..', 'icon.png'),
    autoHideMenuBar: process.platform !== 'darwin',
    // Try to prevent macOS from handling function keys
    alwaysOnTop: false,
  skipTaskbar: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Track focus to manage grab state
  mainWindow.on('focus', () => {
    isWindowFocused = true;
    console.log('Window focused');
    updateGrabState();
  });

  mainWindow.on('blur', () => {
    isWindowFocused = false;
    console.log('Window blurred');
    updateGrabState();
  });

  if (process.platform !== 'darwin') {
    mainWindow.setMenuBarVisibility(false);
    mainWindow.removeMenu();
    return;
  }

  // Create menu
  const template = [
    {
      label: 'OSRBOT Link',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  // Set app user model ID for Windows
  app.setAppUserModelId('com.osrbot.link');

  // Check macOS permissions on startup
  checkMacOSPermissions();

  createWindow();

  // Initialize HID manager
  hidManager = new HIDManager();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('browser-window-focus', () => {
    isWindowFocused = true;
    console.log('Browser window focused');
    updateGrabState();
  });

  app.on('browser-window-blur', () => {
    isWindowFocused = false;
    console.log('Browser window blurred');
    updateGrabState();
  });

  mainWindow.on('close', () => {
    console.log('Window closing, stopping grab and cleaning up');
    // Stop grab when window closes
    if (rdevGrabber && typeof rdevGrabber.stop_grab === 'function' && rdevRunning) {
      try {
        rdevGrabber.stop_grab();
        rdevRunning = false;
        console.log('✓ rdev grab stopped on window close');
      } catch (err) {
        console.warn('Failed to stop rdev grabber on window close:', err);
      }
    }
    // On macOS, quit the app when window closes (better UX for single-window app)
    if (process.platform === 'darwin') {
      app.quit();
    }
  });
});

app.on('window-all-closed', () => {
  // Always quit when all windows are closed (including macOS)
  app.quit();
});

app.on('before-quit', () => {
  // Unregister global shortcuts
  globalShortcut.unregisterAll();
  
  if (rdevGrabber && typeof rdevGrabber.stop_grab === 'function') {
    try {
      rdevGrabber.stop_grab();
    } catch (err) {
      console.warn('Failed to stop rdev grabber:', err);
    }
  }

  if (hidManager) {
    hidManager.close();
  }
});

// IPC handlers
ipcMain.handle('get-hid-devices', async () => {
  return hidManager.getDevices();
});

ipcMain.handle('get-all-hid-devices', async () => {
  return hidManager.getAllDevices();
});

ipcMain.handle('get-hid-enumeration-error', async () => {
  return hidManager.getLastEnumerationError();
});

ipcMain.handle('connect-hid-device', async (event, devicePath) => {
  return hidManager.connect(devicePath);
});

ipcMain.handle('disconnect-hid-device', async () => {
  return hidManager.disconnect();
});

ipcMain.handle('install-linux-hid-permissions', async () => {
  if (process.platform !== 'linux') {
    return { success: false, error: 'Linux HID permission setup is only available on Linux.' };
  }

  try {
    const scriptPath = copyLinuxPermissionFiles();
    const manualCommand = linuxPermissionManualCommand();

    if (fs.existsSync('/usr/bin/pkexec')) {
      const result = await runFile('/usr/bin/pkexec', ['bash', scriptPath], { timeout: 120000 });
      if (result.success) {
        return {
          success: true,
          message: 'Linux HID permissions installed. Unplug and replug the OSRBOT sharing device. If it still fails, log out and back in once.'
        };
      }

      return {
        success: false,
        error: result.stderr || result.error || 'Permission helper was canceled or failed.',
        manualCommand
      };
    }

    return {
      success: false,
      error: 'pkexec is not available on this Ubuntu system.',
      manualCommand
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      manualCommand: linuxPermissionManualCommand()
    };
  }
});

ipcMain.handle('send-mouse-event', async (event, data) => {
  return hidManager.sendMouseEvent(data);
});

ipcMain.handle('send-keyboard-event', async (event, data) => {
  return hidManager.sendKeyboardEvent(data);
});

ipcMain.handle('get-build-info', async () => {
  return {
    version: app.getVersion(),
    buildTimestamp: process.env.BUILD_DATE || process.env.BUILD_TIMESTAMP || null,
    platform: process.platform,
    arch: process.arch,
    provenance: OSRBOT_PROVENANCE.marker
  };
});

ipcMain.handle('save-capture-file', async (_event, payload) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: path.join(app.getPath('pictures'), payload.defaultName),
      filters: payload.filters || []
    });

    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }

    fs.writeFileSync(filePath, Buffer.from(payload.data));
    return { success: true, filePath };
  } catch (error) {
    console.error('Failed to save capture file:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-stream-url', async () => {
  return null;
});

ipcMain.handle('toggle-fullscreen', async () => {
  if (mainWindow) {
    const isFullscreen = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!isFullscreen);
    
    // Hide menu bar on Windows when fullscreen
    if (process.platform === 'win32') {
      mainWindow.setMenuBarVisibility(isFullscreen);
    }
    
    return !isFullscreen;
  }
  return false;
});

ipcMain.handle('exit-fullscreen', async () => {
  if (mainWindow && mainWindow.isFullScreen()) {
    mainWindow.setFullScreen(false);
  }
  return false;
});

// Handle control mode changes - starts/stops rdev keyboard grabbing
ipcMain.handle('set-control-mode', async (_, inControlMode) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('SET CONTROL MODE:', inControlMode);
  console.log('Current state:', { isInControlMode, isWindowFocused, rdevRunning });
  isInControlMode = inControlMode;
  updateGrabState();
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  return {
    nativeInputAvailable: !!(rdevGrabber && typeof rdevGrabber.start_grab === 'function'),
    nativeInputRunning: rdevRunning
  };
});
