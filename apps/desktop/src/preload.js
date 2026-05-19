const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // HID API
  getHIDDevices: () => ipcRenderer.invoke('get-hid-devices'),
  getAllHIDDevices: () => ipcRenderer.invoke('get-all-hid-devices'),
  getHIDEnumerationError: () => ipcRenderer.invoke('get-hid-enumeration-error'),
  connectHIDDevice: (devicePath) => ipcRenderer.invoke('connect-hid-device', devicePath),
  disconnectHIDDevice: () => ipcRenderer.invoke('disconnect-hid-device'),
  installLinuxHIDPermissions: () => ipcRenderer.invoke('install-linux-hid-permissions'),
  sendMouseEvent: (data) => ipcRenderer.invoke('send-mouse-event', data),
  sendKeyboardEvent: (data) => ipcRenderer.invoke('send-keyboard-event', data),
  
  // Global key events from main process
  onGlobalKeyPressed: (callback) => ipcRenderer.on('global-key-pressed', callback),
  
  // Window controls
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),
  exitFullscreen: () => ipcRenderer.invoke('exit-fullscreen'),
  setControlMode: (inControlMode) => ipcRenderer.invoke('set-control-mode', inControlMode),

  // Local capture files
  saveCaptureFile: (payload) => ipcRenderer.invoke('save-capture-file', payload),
  getBuildInfo: () => ipcRenderer.invoke('get-build-info')
});
