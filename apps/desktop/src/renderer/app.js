class KVMClient {
    constructor() {
        this.PROVENANCE = Object.freeze({
            product: 'OSRBOT Link',
            marker: 'OSRBOT Link'
        });

        this.I18N = {
            en: {
                panelTitle: 'Control Panel',
                labelVideo: 'Video:',
                labelHID: 'HID:',
                deviceLabel: 'Device:',
                resolutionLabel: 'Resolution:',
                fpsLabel: 'FPS:',
                languageTitle: 'Language',
                languageHint: 'Auto-detected by system language; you can override here.',
                themeTitle: 'Skin',
                themeBright: 'Bright',
                themeDark: 'Dark',
                themeHint: 'Choose a brighter daily skin or the original dark skin.',
                targetModeTitle: 'Target Device',
                targetModeDesktop: 'Computer',
                targetModeAndroid: 'Android',
                targetModeDescDesktop: 'Computer target: absolute mouse mode for Windows, macOS, and Linux.',
                targetModeDescAndroid: 'Android target: relative mouse mode for phones and tablets.',
                displayModeTitle: 'Display Scaling',
                displayModeFit: 'Fit',
                displayModeFill: 'Fill',
                displayModeOriginal: 'Original',
                displayModeDescFit: 'Fit to the window while preserving aspect ratio.',
                displayModeDescFill: 'Fill the window while preserving aspect ratio; edges may be cropped.',
                displayModeDescOriginal: 'Show source pixels at original size for clarity checks.',
                displayScaleDisconnected: 'Display: disconnected',
                displayScaleInfo: 'Input {input} / View {view} / Scale {scale}',
                mouseModeTitle: 'Mouse Mode',
                mouseModeAbsolute: 'Absolute',
                mouseModeRelative: 'Relative',
                mouseModeDescAbs: 'Click to send absolute mouse positions',
                mouseModeDescRel: 'Move mouse for relative positioning',
                scrollTitle: 'Scroll Direction',
                scrollNatural: 'Natural',
                scrollTraditional: 'Traditional',
                scrollDescNatural: 'Natural scrolling (like macOS/mobile)',
                scrollDescTraditional: 'Traditional scrolling (like Windows)',
                quitKeyTitle: 'Exit Control Mode',
                quitKeyDesc: 'Shift+Esc exits fullscreen and control mode.',
                quitKeyDescOther: 'Right Ctrl exits control mode. Shift+Esc exits fullscreen and control mode.',
                changeBtn: 'Fixed',
                customResTitle: 'Custom Resolutions',
                customResDesc: 'Append to the resolution menu (no guarantee device supports them).',
                addBtn: 'Add',
                saveBtn: 'Save',
                settings: 'Settings',
                btnStartVideo: 'Start Video',
                btnStopVideo: 'Stop Video',
                btnRefresh: 'Refresh',
                btnConnectHID: 'Connect HID',
                btnShowHIDDiagnostics: 'Show All HID',
                btnDisconnectHID: 'Disconnect HID',
                btnCtrlAltDel: 'Ctrl+Alt+Del',
                btnFullscreen: 'Fullscreen',
                videoDisconnected: 'Disconnected',
                videoConnected: 'Connected',
                hidDisconnected: 'Disconnected',
                hidConnected: 'Connected',
                overlayActive: 'Control Mode Active',
                overlayHint: 'Press <kbd>Shift+Esc</kbd> to exit',
                overlayHintOther: 'Press <kbd>Right Ctrl</kbd> to exit control mode, or <kbd>Shift+Esc</kbd> to exit fullscreen and control.',
                forwardingActive: 'Keyboard and mouse forwarding active',
                noValidRes: 'No valid resolutions found. Use formats like 1920x1200 or 2560*1440, separated by commas.',
                noWebRTC: 'Browser does not support WebRTC',
                sectionVideo: 'Video Input',
                sectionInput: 'Keyboard / Mouse Share',
                sectionActions: 'Actions',
                btnScreenshot: 'Screenshot',
                btnRecord: 'Record',
                btnRecordStop: 'Stop Rec',
                btnGif: 'GIF',
                btnSwitchDisplay: 'Switch Display',
                switchDisplayHint: 'Mainly for Windows target devices.',
                btnExitFullscreen: 'Exit Fullscreen',
                btnPasteCommand: 'Paste',
                pasteTitle: 'Paste Command',
                pasteDesc: 'Only ASCII terminal commands are supported in this build.',
                pasteEnter: 'Press Enter after paste',
                pasteSpeed: 'Speed',
                pasteSpeedFast: 'Fast',
                pasteSpeedNormal: 'Normal',
                pasteSpeedSlow: 'Slow',
                pasteSend: 'Send',
                pasteStop: 'Stop',
                cancelBtn: 'Cancel',
                pasteNeedHID: 'Please connect OSRBOT HID before pasting.',
                pasteEmpty: 'Clipboard has no text.',
                pasteUnsupported: 'Only ASCII command text is supported. Remove unsupported characters first.',
                pasteTooLong: 'Command is too long. Keep it under {max} characters for this build.',
                pasteDone: 'Command pasted.',
                pasteStopped: 'Paste stopped.',
                stopVideoBeforeChanging: 'Stop video before changing capture device, resolution, or FPS.',
                disconnectHIDBeforeChanging: 'Disconnect HID before selecting another device.',
                unsupportedHIDDevice: 'Only OSRBOT HID devices are supported in this build.',
                fullscreenToolsHint: 'Show toolbar',
                fullscreenGuideTitle: 'Toolbar',
                fullscreenGuide: 'Shift+Esc exits fullscreen and control mode. Click Show toolbar to open controls.',
                btnHideTools: 'Hide',
                captureNeedVideo: 'Start video before taking a screenshot.',
                recordNeedVideo: 'Start video before recording.',
                gifNeedVideo: 'Start video before recording GIF.',
                screenshotSaved: 'Screenshot saved',
                screenshotFailed: 'Screenshot failed',
                recordingStarted: 'Recording started.',
                recordingSaved: 'Recording saved',
                recordingFailed: 'Recording failed',
                gifRecordingStarted: 'GIF recording started.',
                gifSaved: 'GIF saved',
                gifFailed: 'GIF failed',
                pngFilter: 'PNG Image',
                webmFilter: 'Compressed WebM Video',
                gifFilter: 'GIF Image',
                noRecordingData: 'Recording stopped with no video data.',
                noGifData: 'GIF stopped with no frames.',
                switchDisplaySent: 'Sent display switch shortcut (Win+P).',
                selectVideoOption: 'Select Video Device',
                selectResolutionOption: 'Select Resolution',
                selectHIDOption: 'Select HID Device',
                unsupportedRecording: 'Recording is not supported by this runtime.',
                cameraPermission: 'Camera permission is required for video streaming',
                noVideoDevices: 'No video devices detected',
                selectVideoDevice: 'Please select a video device',
                failedStartVideo: 'Failed to start video stream',
                selectHIDDevice: 'Please select a HID device',
                noCompatibleHID: 'No OSRBOT HID device matched. On Windows, click "Show All HID" and send the visible VID/PID/path if the device is still missing.',
                hidDiagnosticsLoaded: 'All HID devices are shown for diagnostics. Select the OSRBOT device if visible, then click Connect HID.',
                connectHIDFailed: 'Failed to connect HID device',
                connectHIDError: 'Error connecting HID device',
                linuxHIDPermissionHint: 'Linux HID permission is missing. Click "Fix Linux Permissions", enter the system password, then unplug and replug the OSRBOT sharing device.',
                fixLinuxPermissions: 'Fix Linux Permissions',
                fixingLinuxPermissions: 'Installing Linux HID permissions...',
                linuxPermissionsFixed: 'Linux HID permissions installed. Unplug and replug the sharing device, then connect HID again.',
                linuxPermissionsManual: 'Automatic permission setup failed. Run these commands in Terminal, then unplug and replug the device:',
                refreshHIDError: 'Error refreshing HID connection',
                connectHIDFirst: 'Please connect HID device first',
                connectHIDFirstMouse: 'Please connect HID device first for mouse/keyboard control',
                startVideoFirst: 'Video is optional. Connect HID to use input bridge mode.',
                inputBridgeReadyTitle: 'Input Bridge Ready',
                inputBridgeReadyBody: 'Connect OSRBOT KVM, then click this area to share keyboard and mouse without a capture card.',
                inputBridgeReadySub: 'Video preview is optional when the controlled device already has a screen.',
                fallbackResolution: 'Resolution {from} failed ({error}). Falling back to {to}.',
                negotiatedResolution: 'Requested {from}, device provided {to}. Using {to}.',
                actualCaptureDisconnected: 'Actual capture: disconnected',
                actualCaptureInfo: 'Actual capture: {resolution} @ {fps}fps',
                actualCaptureInfoNoFps: 'Actual capture: {resolution}'
            },
            zh: {
                panelTitle: '控制台',
                labelVideo: '视频：',
                labelHID: 'HID：',
                deviceLabel: '设备：',
                resolutionLabel: '分辨率：',
                fpsLabel: 'FPS：',
                languageTitle: '语言',
                languageHint: '默认根据系统语言，可在此手动切换。',
                themeTitle: '皮肤',
                themeBright: '明亮',
                themeDark: '深色',
                themeHint: '日常使用推荐明亮皮肤，深色皮肤仍可切换。',
                targetModeTitle: '目标设备',
                targetModeDesktop: '电脑',
                targetModeAndroid: '安卓',
                targetModeDescDesktop: '电脑模式：使用绝对鼠标模式，适合 Windows、macOS、Linux。',
                targetModeDescAndroid: '安卓模式：使用相对鼠标模式，适合手机和平板。',
                displayModeTitle: '画面缩放',
                displayModeFit: '自适应',
                displayModeFill: '填满',
                displayModeOriginal: '原始',
                displayModeDescFit: '保持比例适应窗口，优先显示完整画面。',
                displayModeDescFill: '保持比例填满窗口，可能裁切边缘。',
                displayModeDescOriginal: '按原始像素显示，用于判断采集清晰度。',
                displayScaleDisconnected: '显示：未连接',
                displayScaleInfo: '输入 {input} / 显示 {view} / 缩放 {scale}',
                mouseModeTitle: '鼠标模式',
                mouseModeAbsolute: '绝对',
                mouseModeRelative: '相对',
                mouseModeDescAbs: '点击直接定位鼠标坐标',
                mouseModeDescRel: '移动发送相对偏移',
                scrollTitle: '滚动方向',
                scrollNatural: '自然',
                scrollTraditional: '传统',
                scrollDescNatural: '自然滚动（macOS/移动端样式）',
                scrollDescTraditional: '传统滚动（Windows 样式）',
                quitKeyTitle: '退出控制模式',
                quitKeyDesc: 'Shift+Esc 退出全屏和控制模式。',
                quitKeyDescOther: '右 Ctrl 退出控制模式；Shift+Esc 退出全屏和控制模式。',
                changeBtn: '固定',
                customResTitle: '自定义分辨率',
                customResDesc: '添加到分辨率列表（设备是否支持不保证）。',
                addBtn: '添加',
                saveBtn: '保存',
                settings: '设置',
                btnStartVideo: '开始视频',
                btnStopVideo: '停止视频',
                btnRefresh: '刷新',
                btnConnectHID: '连接 HID',
                btnShowHIDDiagnostics: '显示全部 HID',
                btnDisconnectHID: '断开 HID',
                btnCtrlAltDel: 'Ctrl+Alt+Del',
                btnFullscreen: '全屏',
                videoDisconnected: '未连接',
                videoConnected: '已连接',
                hidDisconnected: '未连接',
                hidConnected: '已连接',
                overlayActive: '控制模式已开启',
                overlayHint: '按 <kbd>Shift+Esc</kbd> 退出',
                overlayHintOther: '按 <kbd>右 Ctrl</kbd> 退出控制模式，或按 <kbd>Shift+Esc</kbd> 退出全屏和控制。',
                forwardingActive: '键盘和鼠标正在转发',
                noValidRes: '未找到有效分辨率。格式示例：1920x1200 或 2560*1440，使用逗号分隔。',
                noWebRTC: '浏览器不支持 WebRTC',
                sectionVideo: '视频采集',
                sectionInput: '键鼠共享',
                sectionActions: '快捷操作',
                btnScreenshot: '截图',
                btnRecord: '录屏',
                btnRecordStop: '停止录屏',
                btnGif: '录制 GIF',
                btnSwitchDisplay: '切换显示',
                switchDisplayHint: '主要适用于 Windows 被控端。',
                btnExitFullscreen: '退出全屏',
                btnPasteCommand: '粘贴命令',
                pasteTitle: '粘贴命令',
                pasteDesc: '当前版本只支持英文、数字和常见符号，适合终端命令。',
                pasteEnter: '粘贴后按 Enter',
                pasteSpeed: '速度',
                pasteSpeedFast: '快',
                pasteSpeedNormal: '正常',
                pasteSpeedSlow: '慢',
                pasteSend: '发送',
                pasteStop: '停止',
                cancelBtn: '取消',
                pasteNeedHID: '请先连接 OSRBOT HID 后再粘贴。',
                pasteEmpty: '剪贴板没有文本。',
                pasteUnsupported: '当前只支持 ASCII 命令文本，请先移除中文或不支持字符。',
                pasteTooLong: '命令过长，当前版本请控制在 {max} 个字符以内。',
                pasteDone: '命令已粘贴。',
                pasteStopped: '已停止粘贴。',
                stopVideoBeforeChanging: '请先停止视频，再切换采集卡、分辨率或 FPS。',
                disconnectHIDBeforeChanging: '请先断开 HID，再选择其他设备。',
                unsupportedHIDDevice: '当前版本只支持 OSRBOT HID 设备。',
                fullscreenToolsHint: '显示工具栏',
                fullscreenGuideTitle: '工具栏',
                fullscreenGuide: 'Shift+Esc 退出全屏和控制模式；点击“显示工具栏”打开工具栏。',
                btnHideTools: '隐藏',
                captureNeedVideo: '请先启动视频采集后再截图。',
                recordNeedVideo: '请先启动视频采集后再录屏。',
                gifNeedVideo: '请先启动视频采集后再录制 GIF。',
                screenshotSaved: '截图已保存',
                screenshotFailed: '截图失败',
                recordingStarted: '开始录屏。',
                recordingSaved: '录屏已保存',
                recordingFailed: '录屏失败',
                gifRecordingStarted: '开始录制 GIF。',
                gifSaved: 'GIF 已保存',
                gifFailed: 'GIF 录制失败',
                pngFilter: 'PNG 图片',
                webmFilter: '压缩 WebM 视频',
                gifFilter: 'GIF 动图',
                noRecordingData: '录屏停止，但没有生成视频数据。',
                noGifData: 'GIF 停止，但没有生成帧数据。',
                switchDisplaySent: '已发送切换显示快捷键（Win+P）。',
                selectVideoOption: '选择视频设备',
                selectResolutionOption: '选择分辨率',
                selectHIDOption: '选择 HID 设备',
                unsupportedRecording: '当前运行环境不支持录屏。',
                cameraPermission: '需要相机权限才能开启视频流',
                noVideoDevices: '未检测到视频设备',
                selectVideoDevice: '请选择视频设备',
                failedStartVideo: '启动视频流失败',
                selectHIDDevice: '请选择 HID 设备',
                noCompatibleHID: '未匹配到 OSRBOT HID 设备。Windows 下可点击“显示全部 HID”，如果仍看不到设备，请把显示的 VID/PID/path 发回来。',
                hidDiagnosticsLoaded: '已显示全部 HID 诊断列表。若能看到 OSRBOT 设备，请选择后点击连接 HID。',
                connectHIDFailed: '连接 HID 设备失败',
                connectHIDError: '连接 HID 设备出错',
                linuxHIDPermissionHint: 'Linux HID 权限不足。点击“修复 Linux 权限”，输入系统密码后，拔插一次 OSRBOT 共享器。',
                fixLinuxPermissions: '修复 Linux 权限',
                fixingLinuxPermissions: '正在安装 Linux HID 权限...',
                linuxPermissionsFixed: 'Linux HID 权限已安装。请拔插一次共享器，然后重新连接 HID。',
                linuxPermissionsManual: '自动修复权限失败。请在终端执行以下命令，然后拔插一次设备：',
                refreshHIDError: '刷新 HID 连接出错',
                connectHIDFirst: '请先连接 HID 设备',
                connectHIDFirstMouse: '请先连接 HID 设备以控制鼠标/键盘',
                startVideoFirst: '视频是可选的，连接 HID 后即可使用纯键鼠共享模式。',
                inputBridgeReadyTitle: '共享器就绪',
                inputBridgeReadyBody: '连接 OSRBOT KVM 后，点击此区域即可在无采集卡时共享键盘鼠标。',
                inputBridgeReadySub: '当被控端本身有屏幕时，视频预览不是必需项。',
                fallbackResolution: '分辨率 {from} 失败（{error}），切换到 {to}。',
                negotiatedResolution: '请求 {from}，设备返回 {to}，已使用 {to}。',
                actualCaptureDisconnected: '实际采集：未连接',
                actualCaptureInfo: '实际采集：{resolution} @ {fps}fps',
                actualCaptureInfoNoFps: '实际采集：{resolution}'
            }
        };

        this.videoConnected = false;
        this.hidConnected = false;
        this.manualHIDDisconnect = false; // Track if HID was manually disconnected
        this.mouseCaptured = false;
        this.mouseMode = 'absolute'; // 'absolute' or 'relative'
        this.targetMode = 'desktop'; // 'desktop' or 'android'
        this.displayMode = 'fit'; // 'fit', 'fill', or 'original'
        this.currentStream = null;
        this.sidebarVisible = false;
        this.headerVisible = true;
        this.hideTimer = null;
        this.mouseButtonsPressed = 0; // Track which buttons are pressed
        this.reverseScroll = true; // Traditional scrolling direction by default
        this.isFullscreen = false; // Track fullscreen state
        this.nativeInputAvailable = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.recordingCanvas = null;
        this.recordingContext = null;
        this.recordingAnimationId = null;
        this.recordingStream = null;
        this.isRecording = false;
        this.isRecordingGif = false;
        this.gifFrames = [];
        this.gifTimer = null;
        this.quitKeyCombo = { ctrlKey: false, altKey: false, shiftKey: true, metaKey: false, key: 'Escape', code: 'Escape' }; // Shift+Esc exits fullscreen and control mode
        this.localExitKeyCodes = new Set(['ControlRight']);
        this.fullscreenToolsTimer = null;
        this.pasteMaxLength = 1200;
        this.pasteAbortRequested = false;
        this.pasteSending = false;
        this.toolsManuallyHidden = false;
        this.fullscreenGuideShown = false;

        // Compatible KVM device list for auto-detection
        // Add new compatible devices here with their VID/PID and description
        this.COMPATIBLE_DEVICES = [
            {
                vendorId: 0x413D,
                productId: 0x2107,
                description: 'KVM Control Interface (OSRBOT, KVM Card Mini, CH582F-based devices)'
            }
            // Add more devices here:
            // { vendorId: 0x1234, productId: 0x5678, description: 'My Custom KVM Device' }
        ];

        // Disable WebRTC's default STUN servers to prevent external network connections
        this.disableWebRTCExternalConnections();

        // Load saved settings
        this.loadSettings();

        // Common resolutions (from HttpVideo.html)
        this.COMMON_RESOLUTIONS = [
            [3840, 2160], [2560, 1440], [2560, 1080], [2048, 1536],
            [1920, 1200], [1920, 1080], [1680, 1050], [1600, 1200],
            [1600, 900], [1440, 1080], [1440, 900], [1366, 768],
            [1360, 768], [1280, 1024], [1280, 960], [1280, 800],
            [1280, 720], [1024, 768], [800, 600], [720, 576],
            [720, 480], [640, 480]
        ];

        this.initializeElements();
        this.bindEvents();
        this.setupGlobalKeyHandler();  // Setup rdev global key handler for quit key
        this.initializeVideo();
        this.applyLoadedSettings();
    }

    disableWebRTCExternalConnections() {
        // Override RTCPeerConnection to disable STUN servers and external connections
        if (typeof RTCPeerConnection !== 'undefined') {
            const originalRTCPeerConnection = RTCPeerConnection;
            
            window.RTCPeerConnection = function(config) {
                // Remove any external STUN/TURN servers
                if (config && config.iceServers) {
                    config.iceServers = [];
                }
                return new originalRTCPeerConnection(config);
            };
            
            // Copy static methods
            Object.setPrototypeOf(window.RTCPeerConnection, originalRTCPeerConnection);
            window.RTCPeerConnection.prototype = originalRTCPeerConnection.prototype;
        }
        
        // Override getUserMedia to ensure no external network calls
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('WebRTC external connections disabled for local KVM use');
        }
    }

    initializeElements() {
        // Device selectors
        this.videoDevicesSelect = document.getElementById('videoDevices');
        this.resolutionSelect = document.getElementById('resolutionSelect');
        this.fpsSelect = document.getElementById('fpsSelect');
        this.hidDevicesSelect = document.getElementById('hidDevices');
        
        // Buttons
        this.refreshDevicesBtn = document.getElementById('refreshDevices');
        this.startVideoBtn = document.getElementById('startVideo');
        this.stopVideoBtn = document.getElementById('stopVideo');
        this.actualCaptureInfo = document.getElementById('actualCaptureInfo');
        this.connectHIDBtn = document.getElementById('connectHID');
        this.showHIDDiagnosticsBtn = document.getElementById('showHIDDiagnostics');
        this.disconnectHIDBtn = document.getElementById('disconnectHID');
        this.fixHIDPermissionsBtn = document.getElementById('fixHIDPermissions');
        this.hidMessage = document.getElementById('hidMessage');
        this.customResInput = document.getElementById('customResInput');
        this.addCustomResBtn = document.getElementById('addCustomRes');
        
        // Quick control buttons
        this.sendCADBtn = document.getElementById('sendCAD');
        this.switchDisplayBtn = document.getElementById('switchDisplay');
        this.pasteCommandBtn = document.getElementById('pasteCommand');
        this.captureScreenshotBtn = document.getElementById('captureScreenshot');
        this.toggleRecordingBtn = document.getElementById('toggleRecording');
        this.recordGifBtn = document.getElementById('recordGif');
        this.toggleFullscreenBtn = document.getElementById('toggleFullscreen');
        this.fullscreenTools = document.getElementById('fullscreenTools');
        this.fullscreenHideToolsBtn = document.getElementById('fullscreenHideTools');
        this.fullscreenDisplayModeBtn = document.getElementById('fullscreenDisplayMode');
        this.fullscreenTargetModeBtn = document.getElementById('fullscreenTargetMode');
        this.fullscreenPasteCommandBtn = document.getElementById('fullscreenPasteCommand');
        this.fullscreenSwitchDisplayBtn = document.getElementById('fullscreenSwitchDisplay');
        this.fullscreenScreenshotBtn = document.getElementById('fullscreenScreenshot');
        this.fullscreenRecordBtn = document.getElementById('fullscreenRecord');
        this.fullscreenGifBtn = document.getElementById('fullscreenGif');
        this.fullscreenExitBtn = document.getElementById('fullscreenExit');
        this.fullscreenToolsHint = document.getElementById('fullscreenToolsHint');
        this.fullscreenGuide = document.getElementById('fullscreenGuide');
        this.languageSelect = document.getElementById('languageSelect');
        this.themeSelect = document.getElementById('themeSelect');
        this.targetModeSelect = document.getElementById('targetModeSelect');
        this.targetModeDescription = document.getElementById('targetModeDescription');
        this.displayModeSelect = document.getElementById('displayModeSelect');
        this.displayModeDescription = document.getElementById('displayModeDescription');
        this.displayScaleInfo = document.getElementById('displayScaleInfo');
        
        // Mouse mode controls
        this.mouseModeToggle = document.getElementById('mouseModeToggle');
        this.mouseModeLabel = document.getElementById('mouseModeLabel');
        this.mouseModeDescription = document.getElementById('mouseModeDescription');
        
        // Scroll controls
        this.scrollReverseToggle = document.getElementById('scrollReverseToggle');
        this.scrollDirectionLabel = document.getElementById('scrollDirectionLabel');
        this.scrollDirectionDescription = document.getElementById('scrollDirectionDescription');
        
        // Status elements
        this.videoStatus = document.getElementById('videoStatus');
        this.hidStatus = document.getElementById('hidStatus');
        
        // Video elements
        this.videoElement = document.getElementById('videoElement');
        this.videoPlaceholder = document.getElementById('videoPlaceholder');
        
        // Mouse capture overlay
        this.mouseCaptureOverlay = document.getElementById('mouseCaptureOverlay');
        
        // UI elements
        this.header = document.querySelector('.header');
        this.infoPanel = document.querySelector('.info-panel');
        this.sidebarToggleBtn = document.getElementById('sidebarToggle');
        this.closeSidebarBtn = document.getElementById('closeSidebar');
        
        // Quit key elements
        this.quitKeyDisplay = document.getElementById('quitKeyDisplay');
        this.changeQuitKeyBtn = document.getElementById('changeQuitKey');
        this.quitKeyModal = document.getElementById('quitKeyModal');
        this.keyCaptureArea = document.getElementById('keyCaptureArea');
        this.capturedKeys = document.getElementById('capturedKeys');
        this.confirmQuitKeyBtn = document.getElementById('confirmQuitKey');
        this.cancelQuitKeyBtn = document.getElementById('cancelQuitKey');
        this.resetQuitKeyBtn = document.getElementById('resetQuitKey');
        this.pasteModal = document.getElementById('pasteModal');
        this.pastePreview = document.getElementById('pastePreview');
        this.pasteEnterToggle = document.getElementById('pasteEnterToggle');
        this.pasteSpeedSelect = document.getElementById('pasteSpeedSelect');
        this.pasteLimitInfo = document.getElementById('pasteLimitInfo');
        this.confirmPasteBtn = document.getElementById('confirmPaste');
        this.stopPasteBtn = document.getElementById('stopPaste');
        this.cancelPasteBtn = document.getElementById('cancelPaste');
    }

    loadSettings() {
        try {
            // Language
            const savedLang = localStorage.getItem('kvmLanguage');
            if (savedLang && this.I18N[savedLang]) {
                this.language = savedLang;
            } else {
                this.language = 'zh';
            }

            const savedTheme = localStorage.getItem('kvmTheme');
            this.theme = savedTheme === 'dark' ? 'dark' : 'bright';
            this.applyTheme();

            const savedTargetMode = localStorage.getItem('kvmTargetMode');
            if (['desktop', 'android'].includes(savedTargetMode)) {
                this.targetMode = savedTargetMode;
            }

            const savedDisplayMode = localStorage.getItem('kvmDisplayMode');
            if (['fit', 'fill', 'original'].includes(savedDisplayMode)) {
                this.displayMode = savedDisplayMode;
            }

            // Load mouse mode preference
            const savedMouseMode = localStorage.getItem('kvmMouseMode');
            if (savedMouseMode && (savedMouseMode === 'absolute' || savedMouseMode === 'relative')) {
                this.mouseMode = savedMouseMode;
            }
            this.applyTargetModeDefaults();
            
            // Load scroll direction preference
            const savedScrollReverse = localStorage.getItem('kvmScrollReverse');
            if (savedScrollReverse !== null) {
                this.reverseScroll = savedScrollReverse === 'true';
            } else {
                this.reverseScroll = true;
            }
            
            // Load video source preferences
            const savedVideoDevice = localStorage.getItem('kvmVideoDevice');
            const savedVideoDeviceLabel = localStorage.getItem('kvmVideoDeviceLabel');
            const savedResolution = localStorage.getItem('kvmResolution');
            const savedFPS = localStorage.getItem('kvmFPS');
            const savedVideoPrefsByDevice = localStorage.getItem('kvmVideoPrefsByDevice');
            const savedCustomRes = localStorage.getItem('kvmCustomResolutions');
            
            this.savedVideoPreferences = {
                deviceId: savedVideoDevice,
                deviceLabel: savedVideoDeviceLabel,
                resolution: savedResolution,
                fps: savedFPS
            };
            this.videoPrefsByDevice = savedVideoPrefsByDevice ? JSON.parse(savedVideoPrefsByDevice) : {};
            try {
                this.customResolutions = savedCustomRes ? JSON.parse(savedCustomRes) : [];
            } catch (err) {
                console.warn('Failed to parse custom resolutions, resetting.', err);
                this.customResolutions = [];
            }
            if (!Array.isArray(this.customResolutions)) {
                this.customResolutions = [];
            }
            
            // Load quit key combination preference
            const savedQuitKeyCombo = localStorage.getItem('kvmQuitKeyCombo');
            if (savedQuitKeyCombo) {
                try {
                    const parsed = JSON.parse(savedQuitKeyCombo);
                    this.quitKeyCombo = parsed;
                    
                    // Migration: Add code field if it doesn't exist
                    if (this.quitKeyCombo.code === undefined) {
                        this.quitKeyCombo.code = null;
                    }
                } catch (error) {
                    console.error('Error parsing quit key combo:', error);
                }
            }
            this.quitKeyCombo = { ctrlKey: false, altKey: false, shiftKey: true, metaKey: false, key: 'Escape', code: 'Escape' };
            localStorage.setItem('kvmQuitKeyCombo', JSON.stringify(this.quitKeyCombo));
            
            console.log('Loaded settings:', { 
                mouseMode: this.mouseMode,
                targetMode: this.targetMode,
                displayMode: this.displayMode,
                reverseScroll: this.reverseScroll,
                language: this.language,
                videoPreferences: this.savedVideoPreferences,
                videoPrefsByDevice: this.videoPrefsByDevice,
                customResolutions: this.customResolutions,
                quitKeyCombo: this.quitKeyCombo
            });
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('kvmMouseMode', this.mouseMode);
            localStorage.setItem('kvmTargetMode', this.targetMode);
            localStorage.setItem('kvmDisplayMode', this.displayMode);
            localStorage.setItem('kvmScrollReverse', this.reverseScroll.toString());
            localStorage.setItem('kvmQuitKeyCombo', JSON.stringify(this.quitKeyCombo));
            if (this.language) {
                localStorage.setItem('kvmLanguage', this.language);
            }
            if (this.theme) {
                localStorage.setItem('kvmTheme', this.theme);
            }
            console.log('Saved settings:', { mouseMode: this.mouseMode, targetMode: this.targetMode, displayMode: this.displayMode, reverseScroll: this.reverseScroll, theme: this.theme, quitKeyCombo: this.quitKeyCombo });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    saveVideoPreferences() {
        try {
            const deviceId = this.videoDevicesSelect.value;
            const deviceLabel = this.videoDevicesSelect.selectedOptions[0]?.textContent || '';
            const resolution = this.resolutionSelect.value;
            const fps = this.fpsSelect.value;

            // Persist per-device preferences (keyed by deviceId or label fallback)
            const deviceKey = deviceId || deviceLabel || 'default';
            if (!this.videoPrefsByDevice) {
                this.videoPrefsByDevice = {};
            }
            this.videoPrefsByDevice[deviceKey] = { deviceId, deviceLabel, resolution, fps };
            localStorage.setItem('kvmVideoPrefsByDevice', JSON.stringify(this.videoPrefsByDevice));
            
            if (deviceId) {
                localStorage.setItem('kvmVideoDevice', deviceId);
                localStorage.setItem('kvmVideoDeviceLabel', deviceLabel);
            }
            if (resolution) {
                localStorage.setItem('kvmResolution', resolution);
            }
            if (fps) {
                localStorage.setItem('kvmFPS', fps);
            }
            
            console.log('Saved video preferences:', { deviceId, deviceLabel, resolution, fps });
        } catch (error) {
            console.error('Error saving video preferences:', error);
        }
    }

    getDevicePreferences(deviceId, deviceLabel) {
        const deviceKey = deviceId || deviceLabel;
        if (deviceKey && this.videoPrefsByDevice && this.videoPrefsByDevice[deviceKey]) {
            return this.videoPrefsByDevice[deviceKey];
        }
        return this.savedVideoPreferences;
    }

    addCustomResolutionsFromInput() {
        if (!this.customResInput) return;
        const raw = this.customResInput.value || '';
        const parsed = this.parseCustomResolutions(raw);
        if (!raw.trim().length) {
            // Allow empty input to clear custom resolutions without warning
            this.customResolutions = [];
            localStorage.setItem('kvmCustomResolutions', JSON.stringify(this.customResolutions));
            this.buildResolutionFPS();
            return;
        }
        if (!parsed.length) {
            alert(this.t('noValidRes'));
            return;
        }
        if (!this.customResolutions) this.customResolutions = [];

        parsed.forEach(({ width, height }) => {
            if (!this.customResolutions.find(r => r.width === width && r.height === height)) {
                this.customResolutions.push({ width, height });
            }
        });

        localStorage.setItem('kvmCustomResolutions', JSON.stringify(this.customResolutions));
        this.buildResolutionFPS();
    }

    parseCustomResolutions(text) {
        return (text || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(entry => {
                const normalized = entry.replace('×', 'x').replace('*', 'x').toLowerCase();
                const parts = normalized.split('x');
                if (parts.length !== 2) return null;
                const w = parseInt(parts[0], 10);
                const h = parseInt(parts[1], 10);
                if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
                return { width: w, height: h };
            })
            .filter(Boolean);
    }

    setLanguage(lang) {
        if (!this.I18N[lang]) return;
        this.language = lang;
        localStorage.setItem('kvmLanguage', lang);
        this.applyTranslations();
        this.loadBuildInfo();
        this.updateMouseModeDisplay();
        this.updateScrollDirectionDisplay();
    }

    setTheme(theme) {
        this.theme = theme === 'dark' ? 'dark' : 'bright';
        localStorage.setItem('kvmTheme', this.theme);
        this.applyTheme();
    }

    setTargetMode(mode) {
        if (!['desktop', 'android'].includes(mode)) return;
        this.targetMode = mode;
        this.applyTargetModeDefaults();
        this.updateTargetModeDisplay();
        this.updateMouseModeDisplay();
        this.updateFullscreenModeButtons();
        this.saveSettings();
    }

    applyTargetModeDefaults() {
        if (this.targetMode === 'android') {
            this.mouseMode = 'relative';
        } else {
            this.mouseMode = 'absolute';
        }
    }

    setDisplayMode(mode) {
        if (!['fit', 'fill', 'original'].includes(mode)) return;
        this.displayMode = mode;
        this.applyDisplayMode();
        this.updateDisplayModeDisplay();
        this.updateFullscreenModeButtons();
        this.saveSettings();
    }

    applyTheme() {
        document.body.dataset.theme = this.theme === 'dark' ? 'dark' : 'bright';
        if (this.themeSelect) {
            this.themeSelect.value = this.theme;
        }
    }

    applyDisplayMode() {
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.dataset.displayMode = this.displayMode || 'fit';
        }
        if (this.displayModeSelect) {
            this.displayModeSelect.value = this.displayMode || 'fit';
        }
        this.updateDisplayScaleInfo();
    }

    t(key, params = {}) {
        const dict = this.I18N[this.language] || this.I18N.en;
        let str = dict[key] || this.I18N.en[key] || key;
        Object.entries(params).forEach(([k, v]) => {
            str = str.replace(`{${k}}`, v);
        });
        return str;
    }

    applyTranslations() {
        const dict = this.I18N[this.language] || this.I18N.en;
        const mapIds = [
            { id: 'sectionVideo', key: 'sectionVideo' },
            { id: 'panelTitle', key: 'panelTitle' },
            { id: 'sectionInput', key: 'sectionInput' },
            { id: 'sectionActions', key: 'sectionActions' },
            { id: 'startVideo', key: 'btnStartVideo' },
            { id: 'stopVideo', key: 'btnStopVideo' },
            { id: 'refreshDevices', key: 'btnRefresh' },
            { id: 'connectHID', key: 'btnConnectHID' },
            { id: 'showHIDDiagnostics', key: 'btnShowHIDDiagnostics' },
            { id: 'disconnectHID', key: 'btnDisconnectHID' },
            { id: 'fixHIDPermissions', key: 'fixLinuxPermissions' },
            { id: 'sendCAD', key: 'btnCtrlAltDel' },
            { id: 'switchDisplay', key: 'btnSwitchDisplay' },
            { id: 'pasteCommand', key: 'btnPasteCommand' },
            { id: 'fullscreenPasteCommand', key: 'btnPasteCommand' },
            { id: 'captureScreenshot', key: 'btnScreenshot' },
            { id: 'toggleRecording', key: this.isRecording ? 'btnRecordStop' : 'btnRecord' },
            { id: 'recordGif', key: this.isRecordingGif ? 'btnRecordStop' : 'btnGif' },
            { id: 'fullscreenHideTools', key: 'btnHideTools' },
            { id: 'fullscreenExit', key: 'btnExitFullscreen' },
            { id: 'fullscreenSwitchDisplay', key: 'btnSwitchDisplay' },
            { id: 'fullscreenScreenshot', key: 'btnScreenshot' },
            { id: 'fullscreenGif', key: this.isRecordingGif ? 'btnRecordStop' : 'btnGif' },
            { id: 'toggleFullscreen', key: 'btnFullscreen' },
            { id: 'sidebarToggle', key: 'settings' },
            { id: 'mouseModeDescription', key: this.mouseMode === 'absolute' ? 'mouseModeDescAbs' : 'mouseModeDescRel' },
            { id: 'mouseModeLabel', key: this.mouseMode === 'absolute' ? 'mouseModeAbsolute' : 'mouseModeRelative' },
            { id: 'scrollDirectionDescription', key: this.reverseScroll ? 'scrollDescTraditional' : 'scrollDescNatural' },
            { id: 'scrollDirectionLabel', key: this.reverseScroll ? 'scrollTraditional' : 'scrollNatural' },
            { id: 'targetModeDescription', key: `targetModeDesc${this.capitalizeMode(this.targetMode)}` },
            { id: 'displayModeDescription', key: `displayModeDesc${this.capitalizeMode(this.displayMode)}` },
            { id: 'videoStatus', key: this.videoConnected ? 'videoConnected' : 'videoDisconnected' },
            { id: 'hidStatus', key: this.hidConnected ? 'hidConnected' : 'hidDisconnected' },
            { id: 'actualCaptureInfo', key: this.videoConnected ? null : 'actualCaptureDisconnected' }
        ];
        mapIds.forEach(({ id, key }) => {
            const el = document.getElementById(id);
            if (el && key && dict[key]) el.textContent = dict[key];
        });

        // data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.getAttribute('data-i18n-html') === 'true') {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        const quitKeyDesc = document.getElementById('quitKeyDesc');
        if (quitKeyDesc) {
            quitKeyDesc.textContent = this.getQuitKeyDescription();
        }
        document.querySelectorAll('[data-i18n="overlayHint"]').forEach(el => {
            el.innerHTML = this.getControlOverlayHint();
        });
        [this.switchDisplayBtn, this.fullscreenSwitchDisplayBtn].forEach(btn => {
            if (btn) btn.title = this.t('switchDisplayHint');
        });

        // Custom res placeholder
        if (this.customResInput) {
            this.customResInput.placeholder = '1920x1200,2560x1440';
        }

        // Status labels via attributes already set; video/hid status updated elsewhere
        if (!this.videoConnected) {
            this.updateVideoDisplay();
        }
        this.updateTargetModeDisplay();
        this.updateDisplayModeDisplay();
        this.updateFullscreenModeButtons();
    }

    isMacPlatform() {
        return /Mac/i.test(navigator.platform || navigator.userAgent || '');
    }

    getQuitKeyDescription() {
        return this.isMacPlatform() ? this.t('quitKeyDesc') : this.t('quitKeyDescOther');
    }

    getControlOverlayHint() {
        return this.isMacPlatform() ? this.t('overlayHint') : this.t('overlayHintOther');
    }

    capitalizeMode(mode) {
        if (!mode) return '';
        return mode.charAt(0).toUpperCase() + mode.slice(1);
    }

    applyLoadedSettings() {
        this.applyTargetModeDefaults();

        // Apply mouse mode setting to UI
        this.mouseModeToggle.checked = (this.mouseMode === 'relative');
        this.updateMouseModeDisplay();
        this.updateTargetModeDisplay();
        this.applyDisplayMode();
        this.updateDisplayModeDisplay();
        
        // Apply scroll direction setting to UI
        this.scrollReverseToggle.checked = this.reverseScroll;
        this.updateScrollDirectionDisplay();
        
        // Apply quit key combination setting to UI
        this.updateQuitKeyDisplay();

        // Populate custom resolution input
        if (this.customResInput) {
            const list = (this.customResolutions || []).map(r => `${r.width}x${r.height}`).join(',');
            this.customResInput.value = list;
        }

        // Apply language to UI
        if (this.languageSelect) {
            this.languageSelect.value = this.language;
        }
        if (this.themeSelect) {
            this.themeSelect.value = this.theme;
        }
        if (this.targetModeSelect) {
            this.targetModeSelect.value = this.targetMode;
        }
        if (this.displayModeSelect) {
            this.displayModeSelect.value = this.displayMode;
        }
        this.applyTheme();
        this.applyTranslations();
        this.loadBuildInfo();
        this.updateDeviceSelectionLocks();
        
        console.log('Applied loaded settings to UI');
    }

    async loadBuildInfo() {
        const el = document.getElementById('buildInfo');
        if (!el || !window.electronAPI?.getBuildInfo) return;

        try {
            const info = await window.electronAPI.getBuildInfo();
            const parts = [`v${info.version}`];
            if (info.buildTimestamp) parts.push(info.buildTimestamp);
            if (info.platform && info.arch) parts.push(`${info.platform}-${info.arch}`);
            el.textContent = parts.join(' | ');
        } catch (error) {
            console.warn('Failed to load build info:', error);
        }
    }

    bindEvents() {
        // Video controls
        if (this.refreshDevicesBtn) {
            this.refreshDevicesBtn.addEventListener('click', () => this.refreshAllDevices());
        }
        this.startVideoBtn.addEventListener('click', () => this.startVideo());
        this.stopVideoBtn.addEventListener('click', () => this.stopVideo());
        
        // Device selection changes
        this.videoDevicesSelect.addEventListener('change', () => {
            if (this.videoConnected) {
                this.showAutoConnectNotification(this.t('stopVideoBeforeChanging'), 'error');
                this.restoreLockedVideoSelection();
                return;
            }
            this.buildResolutionFPS();
            this.saveVideoPreferences();
        });
        this.resolutionSelect.addEventListener('change', () => {
            if (this.videoConnected) {
                this.showAutoConnectNotification(this.t('stopVideoBeforeChanging'), 'error');
                this.restoreLockedVideoSelection();
                return;
            }
            this.buildFPS();
            this.saveVideoPreferences();
        });
        this.fpsSelect.addEventListener('change', () => {
            if (this.videoConnected) {
                this.showAutoConnectNotification(this.t('stopVideoBeforeChanging'), 'error');
                this.restoreLockedVideoSelection();
                return;
            }
            this.saveVideoPreferences();
        });
        
        // HID controls
        this.connectHIDBtn.addEventListener('click', () => this.connectHID());
        this.hidDevicesSelect.addEventListener('change', () => {
            if (this.hidConnected) {
                this.showHIDMessage(this.t('disconnectHIDBeforeChanging'), 'info');
                return;
            }
            const selected = this.getSelectedHIDDevice();
            if (selected && !this.isCompatibleHIDDevice(selected)) {
                this.showHIDMessage(this.t('unsupportedHIDDevice'), 'error');
            }
        });
        if (this.showHIDDiagnosticsBtn) {
            this.showHIDDiagnosticsBtn.addEventListener('click', () => this.loadAllHIDDevicesForDiagnostics());
        }
        this.disconnectHIDBtn.addEventListener('click', () => this.disconnectHID());
        if (this.fixHIDPermissionsBtn) {
            this.fixHIDPermissionsBtn.addEventListener('click', () => this.installLinuxHIDPermissions());
        }
        
        // Mouse mode toggle
        this.mouseModeToggle.addEventListener('change', () => this.toggleMouseMode());
        
        // Scroll direction toggle
        this.scrollReverseToggle.addEventListener('change', () => this.toggleScrollDirection());
        
        // Quit key controls
        this.changeQuitKeyBtn.addEventListener('click', () => this.showQuitKeyModal());
        
        this.addCustomResBtn.addEventListener('click', () => this.addCustomResolutionsFromInput());

        if (this.languageSelect) {
            this.languageSelect.addEventListener('change', (e) => this.setLanguage(e.target.value));
        }
        if (this.themeSelect) {
            this.themeSelect.addEventListener('change', (e) => this.setTheme(e.target.value));
        }
        if (this.targetModeSelect) {
            this.targetModeSelect.addEventListener('change', (e) => this.setTargetMode(e.target.value));
        }
        if (this.displayModeSelect) {
            this.displayModeSelect.addEventListener('change', (e) => this.setDisplayMode(e.target.value));
        }
        
        // Quick control buttons
        this.sendCADBtn.addEventListener('click', () => this.sendCtrlAltDelete());
        this.switchDisplayBtn.addEventListener('click', () => this.switchRemoteDisplay());
        this.pasteCommandBtn.addEventListener('click', () => this.openPasteCommandModal());
        this.captureScreenshotBtn.addEventListener('click', () => this.captureScreenshot());
        this.toggleRecordingBtn.addEventListener('click', () => this.toggleRecording());
        this.recordGifBtn.addEventListener('click', () => this.toggleGifRecording());
        this.toggleFullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        this.fullscreenHideToolsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideFullscreenTools(true);
        });
        this.fullscreenDisplayModeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.cycleDisplayMode();
        });
        this.fullscreenTargetModeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.cycleTargetMode();
        });
        this.fullscreenPasteCommandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openPasteCommandModal();
        });
        this.fullscreenSwitchDisplayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.switchRemoteDisplay();
        });
        this.fullscreenScreenshotBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.captureScreenshot();
        });
        this.fullscreenRecordBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleRecording();
        });
        this.fullscreenGifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleGifRecording();
        });
        this.fullscreenExitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.exitControlAndFullscreen();
        });
        
        // Quit key modal event listeners
        this.confirmQuitKeyBtn.addEventListener('click', () => this.confirmQuitKeyChange());
        this.cancelQuitKeyBtn.addEventListener('click', () => this.hideQuitKeyModal());
        this.resetQuitKeyBtn.addEventListener('click', () => this.resetQuitKeyToDefault());
        this.confirmPasteBtn.addEventListener('click', () => this.confirmPasteCommand());
        this.stopPasteBtn.addEventListener('click', () => this.stopPasteCommand());
        this.cancelPasteBtn.addEventListener('click', () => this.hidePasteCommandModal());
        this.pastePreview.addEventListener('input', () => this.updatePasteLimitInfo());
        
        // Video stream mouse/keyboard capture
        this.videoElement.addEventListener('click', (e) => {
            if (!this.mouseCaptured) {
                // Toggle capture mode
                this.toggleMouseCapture();
                e.preventDefault();
            }
            // Note: Mouse clicks when captured are handled by mousedown/mouseup events
        });

        this.videoPlaceholder.addEventListener('click', (e) => {
            if (!this.mouseCaptured) {
                this.toggleMouseCapture();
                e.preventDefault();
            }
        });
        
        document.addEventListener('keydown', (e) => this.handleDocumentKey(e, true), true);
        document.addEventListener('keyup', (e) => this.handleDocumentKey(e, false), true);
        
        // Handle pointer lock changes
        document.addEventListener('pointerlockchange', () => {
            console.log('Pointer lock changed:', document.pointerLockElement);
            if (!document.pointerLockElement && this.mouseCaptured && this.requiresPointerLockControl()) {
                // Pointer lock was lost, release capture with key reset
                this.releaseMouseCaptureWithKeyReset();
            }
        });
        
        // Handle pointer lock errors
        document.addEventListener('pointerlockerror', () => {
            console.error('Pointer lock failed');
            if (this.mouseCaptured && this.requiresPointerLockControl()) {
                this.releaseMouseCaptureWithKeyReset();
            }
        });
        
        
        // Video element mouse events (for both absolute and relative modes)
        this.videoElement.addEventListener('mousemove', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseMove(e);
            }
        });

        this.videoElement.addEventListener('mouseleave', () => {
            if (this.mouseCaptured && this.mouseMode === 'absolute' && this.videoConnected) {
                this.releaseMouseCaptureWithKeyReset();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.mouseCaptured && this.hidConnected && this.requiresPointerLockControl() && !this.isLocalControlEvent(e)) {
                this.handleMouseMove(e);
            }
        });
        
        // Mouse capture overlay events (backup for relative mode)
        this.mouseCaptureOverlay.addEventListener('mousemove', (e) => {
            if (this.mouseCaptured && this.hidConnected && this.mouseMode === 'relative') {
                this.handleMouseMove(e);
            }
        });
        
        // Mouse button events on video element
        this.videoElement.addEventListener('mousedown', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseEvent(e);
                e.preventDefault();
            }
        });

        document.addEventListener('mousedown', (e) => {
            if (this.mouseCaptured && this.hidConnected && this.requiresPointerLockControl() && !this.isLocalControlEvent(e)) {
                this.handleMouseEvent(e);
                e.preventDefault();
            }
        });
        
        this.videoElement.addEventListener('mouseup', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseEvent(e);
                e.preventDefault();
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (this.mouseCaptured && this.hidConnected && this.requiresPointerLockControl() && !this.isLocalControlEvent(e)) {
                this.handleMouseEvent(e);
                e.preventDefault();
            }
        });
        
        // Mouse wheel events on video element
        this.videoElement.addEventListener('wheel', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseWheel(e);
                e.preventDefault();
            }
        });

        document.addEventListener('wheel', (e) => {
            if (this.mouseCaptured && this.hidConnected && this.requiresPointerLockControl() && !this.isLocalControlEvent(e)) {
                this.handleMouseWheel(e);
                e.preventDefault();
            }
        }, { passive: false });
        
        // Context menu prevention
        this.videoElement.addEventListener('contextmenu', (e) => {
            if (this.mouseCaptured) {
                e.preventDefault();
            }
        });
        
        this.mouseCaptureOverlay.addEventListener('mousedown', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseEvent(e);
            }
        });
        
        this.mouseCaptureOverlay.addEventListener('mouseup', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseEvent(e);
            }
        });
        
        this.mouseCaptureOverlay.addEventListener('wheel', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                this.handleMouseWheel(e);
                e.preventDefault();
            }
        });
        
        // Additional drag support for overlay
        this.mouseCaptureOverlay.addEventListener('drag', (e) => {
            if (this.mouseCaptured && this.hidConnected) {
                e.preventDefault();
            }
        });
        
        this.mouseCaptureOverlay.addEventListener('dragstart', (e) => {
            if (this.mouseCaptured) {
                e.preventDefault();
            }
        });

        // Sidebar toggle
        this.sidebarToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        });
        this.closeSidebarBtn.addEventListener('click', () => this.toggleSidebar());
        
        // Click on header to close sidebar
        this.header.addEventListener('click', (e) => {
            if (this.sidebarVisible) {
                this.toggleSidebar();
            }
        });
        
        // Header auto-hide functionality
        document.addEventListener('mousemove', (e) => this.handleHeaderAutoHide(e));
        document.addEventListener('mousemove', (e) => this.handleFullscreenToolsAutoHide(e));
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        if (this.fullscreenTools) {
            this.fullscreenTools.addEventListener('mouseenter', () => {
                if (this.fullscreenTools.classList.contains('visible')) {
                    clearTimeout(this.fullscreenToolsTimer);
                }
            });
            this.fullscreenTools.addEventListener('mouseleave', () => {
                if (this.fullscreenTools.classList.contains('visible')) {
                    this.scheduleHideFullscreenTools();
                }
            });
        }
        if (this.fullscreenToolsHint) {
            this.fullscreenToolsHint.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showFullscreenTools(true);
            });
        }
        window.addEventListener('resize', () => this.updateDisplayScaleInfo());
        this.videoElement.addEventListener('loadedmetadata', () => this.updateDisplayScaleInfo());
        this.videoElement.addEventListener('resize', () => this.updateDisplayScaleInfo());

        // Device change detection
        if (navigator.mediaDevices) {
            navigator.mediaDevices.addEventListener('devicechange', () => {
                this.handleDeviceChange();
            });
        }
    }


    setupGlobalKeyHandler() {
        // Track last quit key detection time for debouncing
        this.lastQuitKeyTime = 0;
        this.quitKeyDebounceMs = 500; // Prevent multiple triggers within 500ms

        // Listen for rdev key events from main process for quit key detection
        if (window.electronAPI && window.electronAPI.onGlobalKeyPressed) {
            window.electronAPI.onGlobalKeyPressed((event, data) => {
                if (!this.mouseCaptured) return;

                // Only check for quit key combination in renderer
                // Main process handles sending to HID
                const eventType = data.eventType || data.event_type;

                // Check quit key on keydown only
                if (eventType === 'down') {
                    const syntheticEvent = {
                        key: data.key,
                        code: data.code,
                        metaKey: !!(data.metaKey ?? data.meta),
                        ctrlKey: !!(data.ctrlKey ?? data.ctrl),
                        altKey: !!(data.altKey ?? data.alt),
                        shiftKey: !!(data.shiftKey ?? data.shift),
                    };

                    if (this.isQuitKeyCombo(syntheticEvent)) {
                        const now = Date.now();
                        if (now - this.lastQuitKeyTime < this.quitKeyDebounceMs) return;
                        this.lastQuitKeyTime = now;
                        console.log('Shift+Esc local exit matched. Exiting control mode and fullscreen');
                        this.exitControlAndFullscreen();
                        return;
                    }

                    if (this.isLocalExitKey(syntheticEvent)) {
                        const now = Date.now();
                        if (now - this.lastQuitKeyTime < this.quitKeyDebounceMs) return;
                        this.lastQuitKeyTime = now;
                        console.log('Right Ctrl local exit matched. Exiting control mode');
                        this.releaseControlModeOnly();
                        return;
                    }

                    // Debug logging for quit key detection
                    console.log('Checking quit key:', {
                        key: syntheticEvent.key,
                        modifiers: {
                            ctrl: syntheticEvent.ctrlKey,
                            alt: syntheticEvent.altKey,
                            shift: syntheticEvent.shiftKey,
                            meta: syntheticEvent.metaKey
                        },
                        required: this.quitKeyCombo
                    });

                    // Check if quit key combination is pressed
                    if (this.isQuitKeyCombo(syntheticEvent)) {
                        // Debounce: prevent multiple triggers in quick succession
                        const now = Date.now();
                        if (now - this.lastQuitKeyTime < this.quitKeyDebounceMs) {
                            console.log('Quit key debounced, ignoring');
                            return;
                        }

                        this.lastQuitKeyTime = now;
                        console.log('✓ Quit key combo matched! Exiting control mode');
                        this.releaseMouseCaptureWithKeyReset();
                    }
                }
            });
        }
    }

    async handleDocumentKey(event, isDown) {
        if (event.defaultPrevented || this.quitKeyModal?.style.display === 'flex' || this.pasteModal?.style.display === 'flex') {
            return;
        }

        if (this.mouseCaptured && this.isLocalExitKey(event)) {
            event.preventDefault();
            event.stopPropagation();

            if (isDown && !event.repeat) {
                await this.releaseControlModeOnly();
            }
            return;
        }

        if (event.key === 'Escape' && this.isQuitKeyCombo(event)) {
            if (this.mouseCaptured || this.isFullscreen) {
                event.preventDefault();
                event.stopPropagation();

                if (isDown && !event.repeat) {
                    await this.exitControlAndFullscreen();
                }
            }
            return;
        }

        if (!this.mouseCaptured || !this.hidConnected || this.nativeInputAvailable) {
            return;
        }

        if (this.isEditableTarget(event.target)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (isDown && event.repeat) {
            return;
        }

        try {
            await window.electronAPI.sendKeyboardEvent({
                type: isDown ? 'keydown' : 'keyup',
                key: event.key,
                code: event.code,
                metaKey: event.metaKey,
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey
            });
        } catch (error) {
            console.error('Error sending DOM keyboard event:', error);
        }
    }

    isLocalExitKey(event) {
        return this.localExitKeyCodes.has(event.code) || (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT && event.key === 'Control');
    }

    isEditableTarget(target) {
        if (!target) {
            return false;
        }

        const tagName = target.tagName;
        return target.isContentEditable ||
            tagName === 'INPUT' ||
            tagName === 'TEXTAREA' ||
            tagName === 'SELECT';
    }

    async exitControlAndFullscreen() {
        if (this.mouseCaptured) {
            await this.releaseMouseCaptureWithKeyReset();
        }

        if (this.isFullscreen) {
            try {
                await window.electronAPI.exitFullscreen();
                this.isFullscreen = false;
                this.applyWorkspaceFullscreen(false);
            } catch (error) {
                console.error('Error exiting fullscreen:', error);
            }
        }
    }

    async releaseControlModeOnly() {
        if (this.mouseCaptured) {
            await this.releaseMouseCaptureWithKeyReset();
        }
    }

    async initializeVideo() {
        // Check WebRTC support
        if (!navigator.mediaDevices?.enumerateDevices) {
            alert(this.t('noWebRTC'));
            return;
        }

        try {
            // Request initial permission
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            await this.refreshVideoDevices();
        } catch (error) {
            console.error('Camera permission required:', error);
            alert(this.t('cameraPermission'));
        }

        await this.loadHIDDevices();
        this.updateMouseModeDisplay();
        this.updateScrollDirectionDisplay();
        
        // Start periodic HID device monitoring
        this.startHIDMonitoring();
    }

    async refreshAllDevices() {
        console.log('Refreshing all devices (video and HID)...');
        
        // Refresh both video and HID devices concurrently
        try {
            await Promise.all([
                this.refreshVideoDevicesWithReconnect(),
                this.refreshHID()
            ]);
            console.log('All devices refreshed successfully');
        } catch (error) {
            console.error('Error refreshing devices:', error);
        }
    }

    async refreshVideoDevicesWithReconnect() {
        // Store current video state
        const wasVideoConnected = this.videoConnected;
        const currentDeviceId = this.videoDevicesSelect.value;
        const currentResolution = this.resolutionSelect.value;
        const currentFPS = this.fpsSelect.value;
        
        // Disconnect video if connected
        if (wasVideoConnected) {
            await this.stopVideo();
        }
        
        // Refresh device list
        await this.refreshVideoDevices();
        
        if (wasVideoConnected) {
            this.showAutoConnectNotification(this.t('selectVideoDevice'), 'info');
        }
    }

    async refreshVideoDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            
            this.videoDevicesSelect.innerHTML = `<option value="">${this.t('selectVideoOption')}</option>`;
            
            videoDevices.forEach((device, index) => {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label || `Camera ${index + 1}`;
                this.videoDevicesSelect.appendChild(option);
            });

            if (videoDevices.length === 0) {
                alert(this.t('noVideoDevices'));
                return;
            }

            this.videoDevicesSelect.value = '';
            this.resolutionSelect.innerHTML = `<option value="">${this.t('selectResolutionOption')}</option>`;
            this.fpsSelect.innerHTML = '<option value="">Select FPS</option>';
            this.updateDeviceSelectionLocks();
        } catch (error) {
            console.error('Error refreshing video devices:', error);
        }
    }

    async handleDeviceChange() {
        console.log('Device change detected');
        
        // Store current video state
        const wasVideoConnected = this.videoConnected;
        const currentDeviceId = this.videoDevicesSelect.value;
        const currentResolution = this.resolutionSelect.value;
        const currentFPS = this.fpsSelect.value;
        
        // Stop current stream if running
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
            this.videoConnected = false;
        }
        
        // Refresh device list
        await this.refreshVideoDevices();
        
        if (wasVideoConnected) {
            this.showAutoConnectNotification(this.t('selectVideoDevice'), 'info');
        }
    }

    async buildResolutionFPS() {
        this.resolutionSelect.innerHTML = `<option value="">${this.t('selectResolutionOption')}</option>`;
        this.fpsSelect.innerHTML = '<option value="">Select FPS</option>';
        const deviceId = this.videoDevicesSelect.value;
        if (!deviceId) return;
        const deviceLabel = this.videoDevicesSelect.selectedOptions[0]?.textContent || '';
        const devicePrefs = this.getDevicePreferences(deviceId, deviceLabel);

        try {
            // Get device capabilities
            const tempStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: deviceId } }
            });
            
            const track = tempStream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            tempStream.getTracks().forEach(t => t.stop());

            // Build resolution list using device-reported max first, then fall back to common set
            const maxWidth = capabilities.width?.max;
            const maxHeight = capabilities.height?.max;
            const availableResolutions = [];
            const resolutionSet = new Set();

            const addResolution = (w, h) => {
                if (!w || !h) return;
                const key = `${w}x${h}`;
                if (resolutionSet.has(key)) return;
                resolutionSet.add(key);
                availableResolutions.push([w, h]);
            };

            // Prefer the device's maximum capability as the first entry
            addResolution(maxWidth, maxHeight);

            // Add common resolutions that fit within the device limits (if known)
            this.COMMON_RESOLUTIONS.forEach(([w, h]) => {
                if (maxWidth && maxHeight && (w > maxWidth || h > maxHeight)) return;
                addResolution(w, h);
            });

            // Fallback: if nothing was added but max is known, ensure it's present
            if (!availableResolutions.length && maxWidth && maxHeight) {
                addResolution(maxWidth, maxHeight);
            }

            // Append user-defined resolutions (best effort)
            if (this.customResolutions && this.customResolutions.length) {
                this.customResolutions.forEach(({ width, height }) => addResolution(width, height));
            }

            // Sort by pixel count descending so the highest option is first
            availableResolutions.sort((a, b) => (b[0] * b[1]) - (a[0] * a[1]));

            availableResolutions.forEach(resolution => {
                const option = document.createElement('option');
                const value = `${resolution[0]}x${resolution[1]}`;
                option.value = value;
                option.textContent = `${resolution[0]}×${resolution[1]}`;
                this.resolutionSelect.appendChild(option);
            });

            // Try to restore saved resolution preference first
            let resolutionSelected = false;
            if (devicePrefs?.resolution) {
                const savedResolutionOption = this.resolutionSelect.querySelector(`option[value="${devicePrefs.resolution}"]`);
                if (savedResolutionOption) {
                    this.resolutionSelect.value = devicePrefs.resolution;
                    resolutionSelected = true;
                    console.log('Restored saved resolution:', devicePrefs.resolution);
                }
            }
            
            // Default to 1080p when available and no saved preference; otherwise pick first option
            if (!resolutionSelected && this.resolutionSelect.options.length > 1) {
                const prefer1080 = this.resolutionSelect.querySelector('option[value="1920x1080"]');
                if (prefer1080) {
                    this.resolutionSelect.value = '1920x1080';
                    console.log('Defaulting to 1080p resolution');
                } else {
                    this.resolutionSelect.selectedIndex = 1;
                }
            }

            await this.buildFPS();
        } catch (error) {
            console.error('Error building resolution list:', error);
            // Fallback to a basic list if capabilities fetch fails
            this.COMMON_RESOLUTIONS.forEach(resolution => {
                const option = document.createElement('option');
                const value = `${resolution[0]}x${resolution[1]}`;
                option.value = value;
                option.textContent = `${resolution[0]}×${resolution[1]}`;
                this.resolutionSelect.appendChild(option);
            });
            this.resolutionSelect.selectedIndex = 1;
        }
    }

    async buildFPS() {
        this.fpsSelect.innerHTML = '<option value="">Select FPS</option>';
        
        const deviceId = this.videoDevicesSelect.value;
        const resolution = this.resolutionSelect.value;
        if (!deviceId || !resolution) return;
        const deviceLabel = this.videoDevicesSelect.selectedOptions[0]?.textContent || '';
        const devicePrefs = this.getDevicePreferences(deviceId, deviceLabel);

        try {
            const [width, height] = resolution.split('x').map(Number);
            
            // Get FPS capabilities for specific resolution
            const tempStream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    deviceId: { exact: deviceId },
                    width: { exact: width },
                    height: { exact: height }
                }
            });
            
            const track = tempStream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            tempStream.getTracks().forEach(t => t.stop());

            // Build FPS list with robust fallbacks
            const frameRateCaps = capabilities.frameRate || {};
            const maxFPSRaw = Number.isFinite(frameRateCaps.max) ? frameRateCaps.max : null;
            const minFPSRaw = Number.isFinite(frameRateCaps.min) ? frameRateCaps.min : null;
            const candidates = [120, 90, 60, 30, 24, 15];
            let availableFPS = candidates.filter(fps => {
                const withinMax = !maxFPSRaw || fps <= Math.round(maxFPSRaw);
                const withinMin = !minFPSRaw || fps >= Math.ceil(minFPSRaw);
                return withinMax && withinMin;
            });

            if (!availableFPS.length) {
                const fallback = maxFPSRaw ? Math.max(minFPSRaw || 1, Math.min(Math.round(maxFPSRaw), 120)) : (minFPSRaw ? Math.max(Math.ceil(minFPSRaw), 60) : 60);
                availableFPS.push(fallback);
            }

            availableFPS.forEach(fps => {
                const option = document.createElement('option');
                option.value = fps.toString();
                option.textContent = `${fps} fps`;
                this.fpsSelect.appendChild(option);
            });

            // Try to restore saved FPS preference first
            let fpsSelected = false;
            if (devicePrefs?.fps) {
                const savedFPS = parseInt(devicePrefs.fps);
                if (availableFPS.includes(savedFPS)) {
                    this.fpsSelect.value = devicePrefs.fps;
                    fpsSelected = true;
                    console.log('Restored saved FPS:', devicePrefs.fps);
                }
            }
            
            // Clarity-first default: many capture cards heavily compress high-FPS
            // 1080p modes, so prefer 30fps, then 60fps, before higher rates.
            if (!fpsSelected) {
                const preferred = [30, 60, 24, 15, 90, 120].find(fps => availableFPS.includes(fps));
                this.fpsSelect.value = (preferred || Math.max(...availableFPS)).toString();
            }

        } catch (error) {
            console.error('Error building FPS list:', error);
            // Fallback to a basic FPS list
            [60, 30, 24].forEach(fps => {
                const option = document.createElement('option');
                option.value = fps.toString();
                option.textContent = `${fps} fps`;
                this.fpsSelect.appendChild(option);
            });
            this.fpsSelect.value = '60';
        }
    }

    async startVideo(allowFallback = true) {
        const deviceId = this.videoDevicesSelect.value;
        const resolution = this.resolutionSelect.value;
        const requestedResolution = resolution;
        const fps = this.fpsSelect.value;

        if (!deviceId) {
            alert(this.t('selectVideoDevice'));
            return;
        }

        if (!resolution || !fps) {
            console.log('Resolution or FPS not selected, building options...');
            if (!resolution) await this.buildResolutionFPS();
            if (!fps) await this.buildFPS();
            return;
        }

        // Stop current stream if running
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
        }

        try {
            const [width, height] = resolution.split('x').map(Number);
            const frameRate = Number(fps);

            // Configure getUserMedia to avoid external network connections
            const constraintsPrimary = {
                video: {
                    deviceId: { exact: deviceId },
                    width: { exact: width },
                    height: { exact: height },
                    frameRate: { ideal: frameRate }
                },
                audio: false
            };

            const constraintsNoFps = {
                video: {
                    deviceId: { exact: deviceId },
                    width: { exact: width },
                    height: { exact: height }
                },
                audio: false
            };

            const constraintsRelaxed = {
                video: {
                    deviceId: { exact: deviceId },
                    width: { ideal: width },
                    height: { ideal: height }
                },
                audio: false
            };

            // Try primary, then progressively relax constraints
            let stream;
            let lastError = null;
            const attempts = [constraintsPrimary, constraintsNoFps, constraintsRelaxed];
            for (const attempt of attempts) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia(attempt);
                    break;
                } catch (err) {
                    lastError = err;
                    console.warn('getUserMedia attempt failed, trying fallback:', err);
                }
            }

            if (!stream) {
                throw lastError || new Error('Unable to start video stream with current settings');
            }

            // Reflect actual negotiated settings in the UI (in case constraints were relaxed)
            const track = stream.getVideoTracks()[0];
            const settings = track.getSettings ? track.getSettings() : {};
            const actualWidth = settings.width;
            const actualHeight = settings.height;
            const actualFrameRate = settings.frameRate ? Math.round(settings.frameRate) : null;
            const actualResolution = (actualWidth && actualHeight) ? `${actualWidth}x${actualHeight}` : null;
            this.updateActualCaptureInfo(actualResolution, actualFrameRate);

            if (actualResolution && this.resolutionSelect.value !== actualResolution) {
                let opt = this.resolutionSelect.querySelector(`option[value="${actualResolution}"]`);
                if (!opt) {
                    opt = document.createElement('option');
                    opt.value = actualResolution;
                    opt.textContent = `${actualWidth}×${actualHeight}`;
                    // Insert after placeholder
                    this.resolutionSelect.insertBefore(opt, this.resolutionSelect.options[1] || null);
                }
                this.resolutionSelect.value = actualResolution;

                // Inform user when the device negotiated a different resolution
                if (requestedResolution && requestedResolution !== actualResolution) {
                    this.showAutoConnectNotification(
                        this.t('negotiatedResolution', { from: requestedResolution, to: actualResolution }),
                        'error'
                    );
                }
            }

            if (actualFrameRate && this.fpsSelect.value !== actualFrameRate.toString()) {
                let fpsOpt = this.fpsSelect.querySelector(`option[value="${actualFrameRate}"]`);
                if (!fpsOpt) {
                    fpsOpt = document.createElement('option');
                    fpsOpt.value = actualFrameRate.toString();
                    fpsOpt.textContent = `${actualFrameRate} fps`;
                    this.fpsSelect.insertBefore(fpsOpt, this.fpsSelect.options[1] || null);
                }
                this.fpsSelect.value = actualFrameRate.toString();
            }

            this.saveVideoPreferences();
            this.lockedVideoSelection = {
                deviceId: this.videoDevicesSelect.value,
                resolution: this.resolutionSelect.value,
                fps: this.fpsSelect.value
            };

            this.videoElement.srcObject = stream;
            this.currentStream = stream;
            this.videoConnected = true;
            this.updateVideoStatus();
            this.updateVideoDisplay();
            
            this.startVideoBtn.disabled = true;
            this.stopVideoBtn.disabled = false;
            this.updateCaptureControls();
            this.updateDeviceSelectionLocks();

            console.log(`Video started: ${actualResolution || `${width}x${height}`} @ ${actualFrameRate || fps}fps`);
        } catch (error) {
            console.error('Failed to start video stream:', error);

            const message = error?.message || 'Unknown error';

            if (allowFallback) {
                const nextResOption = this.getNextResolutionOption(resolution);
                if (nextResOption) {
                    const fallbackRes = nextResOption.value;
                    this.showAutoConnectNotification(
                        this.t('fallbackResolution', { from: resolution, to: fallbackRes, error: message }),
                        'error'
                    );
                    this.resolutionSelect.value = fallbackRes;
                    await this.buildFPS();
                    if (this.fpsSelect.value) {
                        return this.startVideo(false);
                    }
                }
            }

            alert(`${this.t('failedStartVideo')}: ${message}`);
        }
    }

    getNextResolutionOption(currentValue) {
        const options = Array.from(this.resolutionSelect?.options || []);
        const startIndex = options.findIndex(opt => opt.value === currentValue);
        const fromIndex = startIndex >= 0 ? startIndex + 1 : 1;
        for (let i = fromIndex; i < options.length; i++) {
            if (options[i].value) return options[i];
        }
        return null;
    }

    async stopVideo() {
        if (this.isRecording) {
            this.stopVideoRecording();
        }
        if (this.isRecordingGif) {
            await this.stopGifRecording();
        }

        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
        }
        
        this.videoElement.srcObject = null;
        this.videoConnected = false;
        this.updateVideoStatus();
        this.updateVideoDisplay();
        this.updateActualCaptureInfo(null, null);
        
        this.startVideoBtn.disabled = false;
        this.stopVideoBtn.disabled = true;
        this.updateCaptureControls();
        this.updateDeviceSelectionLocks();

        if (this.mouseCaptured) {
            this.releaseMouseCapture();
        }
    }

    restoreLockedVideoSelection() {
        if (!this.lockedVideoSelection) return;
        this.videoDevicesSelect.value = this.lockedVideoSelection.deviceId || this.videoDevicesSelect.value;
        this.resolutionSelect.value = this.lockedVideoSelection.resolution || this.resolutionSelect.value;
        this.fpsSelect.value = this.lockedVideoSelection.fps || this.fpsSelect.value;
    }

    async captureScreenshot() {
        if (!this.videoConnected || !this.videoElement.videoWidth || !this.videoElement.videoHeight) {
            alert(this.t('captureNeedVideo'));
            return;
        }

        try {
            const canvas = document.createElement('canvas');
            canvas.width = this.videoElement.videoWidth;
            canvas.height = this.videoElement.videoHeight;
            const context = canvas.getContext('2d');
            this.drawCaptureFrame(context, canvas.width, canvas.height);

            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('Could not encode PNG');

            const result = await window.electronAPI.saveCaptureFile({
                defaultName: `osrbot-${this.language === 'zh' ? '截图' : 'screenshot'}-${this.getCaptureTimestamp()}.png`,
                filters: [{ name: this.t('pngFilter'), extensions: ['png'] }],
                data: await blob.arrayBuffer()
            });

            if (result?.success) {
                this.showAutoConnectNotification(`${this.t('screenshotSaved')}: ${result.filePath}`, 'success');
            } else if (!result?.canceled) {
                this.showAutoConnectNotification(`${this.t('screenshotFailed')}: ${result?.error || 'unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Screenshot failed:', error);
            this.showAutoConnectNotification(`${this.t('screenshotFailed')}: ${error.message}`, 'error');
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopVideoRecording();
        } else {
            this.startVideoRecording();
        }
    }

    startVideoRecording() {
        if (!this.videoConnected || !this.videoElement.srcObject) {
            alert(this.t('recordNeedVideo'));
            return;
        }

        const streamFactory = this.videoElement.captureStream || this.videoElement.mozCaptureStream;
        if (!streamFactory) {
            this.showAutoConnectNotification(this.t('unsupportedRecording'), 'error');
            return;
        }

        try {
            const stream = this.createWatermarkedRecordingStream(streamFactory);
            const mimeType = this.getSupportedRecordingMimeType();
            this.recordedChunks = [];
            const options = mimeType ? { mimeType, videoBitsPerSecond: 2500000 } : { videoBitsPerSecond: 2500000 };
            this.mediaRecorder = new MediaRecorder(stream, options);

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                this.cleanupRecordingCanvas();
                this.saveRecording();
            };
            this.mediaRecorder.start(1000);
            this.isRecording = true;
            this.updateCaptureControls();
            this.showAutoConnectNotification(this.t('recordingStarted'), 'info');
        } catch (error) {
            console.error('Recording failed to start:', error);
            this.showAutoConnectNotification(`${this.t('recordingFailed')}: ${error.message}`, 'error');
            this.cleanupRecordingCanvas();
        }
    }

    createWatermarkedRecordingStream(streamFactory) {
        if (this.videoElement.captureStream && HTMLCanvasElement.prototype.captureStream) {
            const canvas = document.createElement('canvas');
            canvas.width = this.videoElement.videoWidth || 1280;
            canvas.height = this.videoElement.videoHeight || 720;
            const context = canvas.getContext('2d');
            this.recordingCanvas = canvas;
            this.recordingContext = context;

            const draw = () => {
                if (!this.recordingCanvas) return;
                this.drawCaptureFrame(context, canvas.width, canvas.height);
                this.recordingAnimationId = requestAnimationFrame(draw);
            };

            draw();
            const fps = Number.parseInt(this.fpsSelect?.value || '30', 10);
            this.recordingStream = canvas.captureStream(Number.isFinite(fps) ? Math.min(Math.max(fps, 10), 60) : 30);
            return this.recordingStream;
        }

        return streamFactory.call(this.videoElement);
    }

    cleanupRecordingCanvas() {
        if (this.recordingAnimationId) {
            cancelAnimationFrame(this.recordingAnimationId);
            this.recordingAnimationId = null;
        }
        if (this.recordingStream) {
            this.recordingStream.getTracks().forEach(track => track.stop());
            this.recordingStream = null;
        }
        this.recordingCanvas = null;
        this.recordingContext = null;
    }

    stopVideoRecording() {
        if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
            this.isRecording = false;
            this.updateCaptureControls();
            return;
        }

        this.mediaRecorder.stop();
        this.isRecording = false;
        this.updateCaptureControls();
        this.updateDeviceSelectionLocks();
    }

    updateActualCaptureInfo(resolution, fps) {
        if (!this.actualCaptureInfo) return;

        if (!resolution) {
            this.actualCaptureInfo.textContent = this.t('actualCaptureDisconnected');
            this.actualCaptureInfo.classList.remove('active');
            return;
        }

        this.actualCaptureInfo.textContent = fps
            ? this.t('actualCaptureInfo', { resolution, fps })
            : this.t('actualCaptureInfoNoFps', { resolution });
        this.actualCaptureInfo.classList.add('active');
    }

    async saveRecording() {
        try {
            if (this.recordedChunks.length === 0) {
                this.showAutoConnectNotification(this.t('noRecordingData'), 'error');
                return;
            }

            const type = this.mediaRecorder?.mimeType || 'video/webm';
            const blob = new Blob(this.recordedChunks, { type });
            const result = await window.electronAPI.saveCaptureFile({
                defaultName: `osrbot-${this.language === 'zh' ? '录屏' : 'recording'}-${this.getCaptureTimestamp()}.webm`,
                filters: [{ name: this.t('webmFilter'), extensions: ['webm'] }],
                data: await blob.arrayBuffer()
            });

            this.recordedChunks = [];
            this.mediaRecorder = null;

            if (result?.success) {
                this.showAutoConnectNotification(`${this.t('recordingSaved')}: ${result.filePath}`, 'success');
            } else if (!result?.canceled) {
                this.showAutoConnectNotification(`${this.t('recordingFailed')}: ${result?.error || 'unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Recording save failed:', error);
            this.showAutoConnectNotification(`${this.t('recordingFailed')}: ${error.message}`, 'error');
        }
    }

    getSupportedRecordingMimeType() {
        const types = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm'
        ];

        return types.find(type => MediaRecorder.isTypeSupported(type)) || '';
    }

    getCaptureTimestamp() {
        return new Date().toISOString().replace(/[:.]/g, '-');
    }

    toggleGifRecording() {
        if (this.isRecordingGif) {
            this.stopGifRecording();
        } else {
            this.startGifRecording();
        }
    }

    startGifRecording() {
        if (!this.videoConnected || !this.videoElement.videoWidth || !this.videoElement.videoHeight) {
            alert(this.t('gifNeedVideo'));
            return;
        }

        this.gifFrames = [];
        this.isRecordingGif = true;
        this.updateCaptureControls();

        const maxWidth = 640;
        const scale = Math.min(1, maxWidth / this.videoElement.videoWidth);
        const width = Math.max(2, Math.round(this.videoElement.videoWidth * scale));
        const height = Math.max(2, Math.round(this.videoElement.videoHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d', { willReadFrequently: true });

        this.gifTimer = setInterval(() => {
            if (!this.isRecordingGif || this.gifFrames.length >= 80) {
                this.stopGifRecording();
                return;
            }

            this.drawCaptureFrame(context, width, height);
            const image = context.getImageData(0, 0, width, height);
            this.gifFrames.push({
                width,
                height,
                delayCs: 12,
                pixels: this.quantizeGifFrame(image.data)
            });
        }, 120);

        this.showAutoConnectNotification(this.t('gifRecordingStarted'), 'info');
    }

    async stopGifRecording() {
        if (this.gifTimer) {
            clearInterval(this.gifTimer);
            this.gifTimer = null;
        }

        this.isRecordingGif = false;
        this.updateCaptureControls();

        if (this.gifFrames.length === 0) {
            this.showAutoConnectNotification(this.t('noGifData'), 'error');
            return;
        }

        try {
            const gif = this.encodeGif(this.gifFrames);
            const result = await window.electronAPI.saveCaptureFile({
                defaultName: `osrbot-${this.language === 'zh' ? '动图' : 'gif'}-${this.getCaptureTimestamp()}.gif`,
                filters: [{ name: this.t('gifFilter'), extensions: ['gif'] }],
                data: gif.buffer
            });

            this.gifFrames = [];

            if (result?.success) {
                this.showAutoConnectNotification(`${this.t('gifSaved')}: ${result.filePath}`, 'success');
            } else if (!result?.canceled) {
                this.showAutoConnectNotification(`${this.t('gifFailed')}: ${result?.error || 'unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('GIF save failed:', error);
            this.showAutoConnectNotification(`${this.t('gifFailed')}: ${error.message}`, 'error');
        }
    }

    quantizeGifFrame(data) {
        const pixels = new Uint8Array(data.length / 4);
        for (let i = 0, p = 0; i < data.length; i += 4, p++) {
            const r = Math.round(data[i] / 51);
            const g = Math.round(data[i + 1] / 51);
            const b = Math.round(data[i + 2] / 51);
            pixels[p] = r * 36 + g * 6 + b;
        }
        return pixels;
    }

    drawCaptureFrame(context, width, height) {
        context.drawImage(this.videoElement, 0, 0, width, height);
        this.drawCaptureWatermark(context, width, height);
        this.drawProvenancePixels(context, width, height);
    }

    drawCaptureWatermark(context, width, height) {
        const scale = Math.max(0.65, Math.min(1.45, width / 1920));
        const padding = Math.round(18 * scale);
        const titleFont = Math.max(13, Math.round(18 * scale));
        const title = this.PROVENANCE.product;

        context.save();
        context.textBaseline = 'top';
        context.font = `700 ${titleFont}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
        const titleWidth = context.measureText(title).width;

        const boxWidth = Math.ceil(titleWidth + padding * 2);
        const boxHeight = Math.ceil(titleFont + padding * 1.55);
        const x = Math.max(padding, width - boxWidth - padding);
        const y = Math.max(padding, height - boxHeight - padding);
        const radius = Math.round(9 * scale);

        context.globalAlpha = 0.72;
        context.fillStyle = 'rgba(6, 12, 18, 0.78)';
        this.roundRect(context, x, y, boxWidth, boxHeight, radius);
        context.fill();

        context.globalAlpha = 0.95;
        context.fillStyle = '#ffffff';
        context.font = `700 ${titleFont}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
        context.fillText(title, x + padding, y + Math.round(padding * 0.75));
        context.restore();
    }

    drawProvenancePixels(context, width, height) {
        const marker = Array.from(this.PROVENANCE.marker, (char) => char.charCodeAt(0));
        const size = Math.min(marker.length, Math.max(0, Math.floor(width / 10)));
        if (height < 4 || width < marker.length + 2) return;

        const image = context.getImageData(1, height - 2, marker.length, 1);
        for (let i = 0; i < size; i++) {
            const offset = i * 4;
            image.data[offset] = marker[i];
            image.data[offset + 1] = 0x2a;
            image.data[offset + 2] = 0x7d;
            image.data[offset + 3] = 0xff;
        }
        context.putImageData(image, 1, height - 2);
    }

    roundRect(context, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        context.beginPath();
        context.moveTo(x + r, y);
        context.arcTo(x + width, y, x + width, y + height, r);
        context.arcTo(x + width, y + height, x, y + height, r);
        context.arcTo(x, y + height, x, y, r);
        context.arcTo(x, y, x + width, y, r);
        context.closePath();
    }

    encodeGif(frames) {
        const width = frames[0].width;
        const height = frames[0].height;
        const bytes = [];
        const writeString = (value) => value.split('').forEach(char => bytes.push(char.charCodeAt(0)));
        const writeShort = (value) => {
            bytes.push(value & 0xff, (value >> 8) & 0xff);
        };

        writeString('GIF89a');
        writeShort(width);
        writeShort(height);
        bytes.push(0xf7, 0, 0);

        for (let r = 0; r < 6; r++) {
            for (let g = 0; g < 6; g++) {
                for (let b = 0; b < 6; b++) {
                    bytes.push(r * 51, g * 51, b * 51);
                }
            }
        }
        while ((bytes.length - 13) < 768) bytes.push(0, 0, 0);

        writeString('!\xff\x0bNETSCAPE2.0\x03\x01');
        writeShort(0);
        bytes.push(0);

        frames.forEach(frame => {
            writeString('!\xf9\x04');
            bytes.push(0x04);
            writeShort(frame.delayCs);
            bytes.push(0, 0);
            bytes.push(0x2c);
            writeShort(0);
            writeShort(0);
            writeShort(width);
            writeShort(height);
            bytes.push(0);
            bytes.push(8);
            this.writeGifImageData(bytes, frame.pixels);
        });

        bytes.push(0x3b);
        return new Uint8Array(bytes);
    }

    writeGifImageData(bytes, pixels) {
        const clearCode = 256;
        const endCode = 257;
        let codeSize = 9;
        let nextCode = 258;
        let bitBuffer = 0;
        let bitLength = 0;
        const block = [];

        const flushBlock = () => {
            if (block.length > 0) {
                bytes.push(block.length, ...block);
                block.length = 0;
            }
        };
        const writeByte = (value) => {
            block.push(value & 0xff);
            if (block.length === 255) flushBlock();
        };
        const writeCode = (code) => {
            bitBuffer |= code << bitLength;
            bitLength += codeSize;
            while (bitLength >= 8) {
                writeByte(bitBuffer & 0xff);
                bitBuffer >>= 8;
                bitLength -= 8;
            }
        };

        writeCode(clearCode);
        pixels.forEach(pixel => {
            writeCode(pixel);
            nextCode++;
            if (nextCode === (1 << codeSize) && codeSize < 12) {
                codeSize++;
            }
            if (nextCode >= 4095) {
                writeCode(clearCode);
                codeSize = 9;
                nextCode = 258;
            }
        });
        writeCode(endCode);

        if (bitLength > 0) writeByte(bitBuffer & 0xff);
        flushBlock();
        bytes.push(0);
    }

    async switchRemoteDisplay() {
        if (!this.hidConnected) {
            alert(this.t('connectHIDFirst'));
            return;
        }

        try {
            await window.electronAPI.sendKeyboardEvent({ type: 'keydown', key: 'Meta', code: 'MetaLeft' });
            await new Promise(resolve => setTimeout(resolve, 20));
            await window.electronAPI.sendKeyboardEvent({ type: 'keydown', key: 'p', code: 'KeyP' });
            await new Promise(resolve => setTimeout(resolve, 50));
            await window.electronAPI.sendKeyboardEvent({ type: 'keyup', key: 'p', code: 'KeyP' });
            await window.electronAPI.sendKeyboardEvent({ type: 'keyup', key: 'Meta', code: 'MetaLeft' });
            this.showAutoConnectNotification(this.t('switchDisplaySent'), 'success');
        } catch (error) {
            console.error('Switch display failed:', error);
            await window.electronAPI.sendKeyboardEvent({ type: 'reset' });
        }
    }

    async loadHIDDevices() {
        try {
            const devices = await window.electronAPI.getHIDDevices();
            this.hidDevicesSelect.innerHTML = `<option value="">${this.t('selectHIDOption')}</option>`;
            this.populateHIDOptions(devices);
            this.updateHIDStatus();

            if (devices.length === 0 && !this.hidConnected) {
                const enumerationError = await this.getHIDEnumerationError();
                const errorHint = enumerationError ? `\n\nHID enumeration error: ${enumerationError}` : '';
                this.showHIDMessage(`${this.t('noCompatibleHID')}${errorHint}`, enumerationError ? 'error' : 'info');
            }
        } catch (error) {
            console.error('Error loading HID devices:', error);
        }
    }

    populateHIDOptions(devices, diagnostic = false) {
        const orderedDevices = diagnostic ? this.sortHIDDevicesForDisplay(devices) : devices;
        this.hidDeviceByPath = new Map();
        orderedDevices.forEach((device, index) => {
            const vendorId = this.normalizeNumber(device.vendorId);
            const productId = this.normalizeNumber(device.productId);
            const usagePage = this.normalizeNumber(device.usagePage);
            const option = document.createElement('option');
            option.value = device.path;

            const vidPid = `VID:0x${(vendorId || 0).toString(16).padStart(4, '0')} PID:0x${(productId || 0).toString(16).padStart(4, '0')}`;
            const usage = `UP:0x${(usagePage || 0).toString(16)}`;
            const iface = device.interface !== undefined ? `IF:${device.interface}` : '';
            const name = device.product || device.manufacturer || 'Unknown HID';
            const pathText = String(device.path || '');
            const compatibleTag = this.isCompatibleHIDDevice(device) ? 'OSRBOT' : 'HID';
            const compatible = this.isCompatibleHIDDevice(device);
            this.hidDeviceByPath.set(device.path, device);

            option.textContent = diagnostic
                ? `${index + 1}. ${compatibleTag} - ${name} (${vidPid} ${usage} ${iface})`
                : `${name} (${vidPid})`;
            option.title = this.formatHIDDiagnosticLine(device, index);
            option.disabled = !compatible;
            this.hidDevicesSelect.appendChild(option);
        });
    }

    getSelectedHIDDevice() {
        const path = this.hidDevicesSelect.value;
        return this.hidDeviceByPath?.get(path) || null;
    }

    sortHIDDevicesForDisplay(devices) {
        return [...devices].sort((a, b) => {
            const aCompatible = this.isCompatibleHIDDevice(a) ? 1 : 0;
            const bCompatible = this.isCompatibleHIDDevice(b) ? 1 : 0;
            if (aCompatible !== bCompatible) return bCompatible - aCompatible;

            const aName = `${a.product || ''} ${a.manufacturer || ''}`.trim();
            const bName = `${b.product || ''} ${b.manufacturer || ''}`.trim();
            return aName.localeCompare(bName);
        });
    }

    isCompatibleHIDDevice(device) {
        const vendorId = this.normalizeNumber(device.vendorId);
        const productId = this.normalizeNumber(device.productId);
        return this.COMPATIBLE_DEVICES.some(config =>
            config.vendorId === vendorId && config.productId === productId
        );
    }

    formatHIDDiagnosticLine(device, index) {
        const vendorId = this.normalizeNumber(device.vendorId);
        const productId = this.normalizeNumber(device.productId);
        const usagePage = this.normalizeNumber(device.usagePage);
        const name = device.product || device.manufacturer || 'Unknown HID';
        const iface = device.interface !== undefined ? `IF:${device.interface}` : 'IF:n/a';
        const pathText = String(device.path || '');
        return `${index + 1}. ${name} VID:0x${(vendorId || 0).toString(16).padStart(4, '0')} PID:0x${(productId || 0).toString(16).padStart(4, '0')} UP:0x${(usagePage || 0).toString(16)} ${iface}\n   ${pathText}`;
    }

    buildHIDDiagnosticSummary(devices) {
        const orderedDevices = this.sortHIDDevicesForDisplay(devices);
        const osrbotDevices = orderedDevices.filter(device => this.isCompatibleHIDDevice(device));
        const lines = [
            `${orderedDevices.length} HID device(s).`,
            `${osrbotDevices.length} OSRBOT candidate(s).`
        ];

        if (osrbotDevices.length > 0) {
            lines.push('', 'OSRBOT:');
            osrbotDevices.forEach((device, index) => {
                lines.push(this.formatHIDDiagnosticLine(device, index));
            });
        }

        return lines.join('\n');
    }

    async loadAllHIDDevicesForDiagnostics() {
        if (this.hidConnected) {
            this.showHIDMessage(this.t('disconnectHIDBeforeChanging'), 'info');
            return;
        }

        try {
            const devices = await window.electronAPI.getAllHIDDevices();
            this.hidDevicesSelect.innerHTML = `<option value="">${this.t('selectHIDOption')}</option>`;
            this.populateHIDOptions(devices, true);
            const enumerationError = await this.getHIDEnumerationError();
            const errorHint = enumerationError ? `\n\nHID enumeration error: ${enumerationError}` : '';
            this.showHIDMessage(`${this.t('hidDiagnosticsLoaded')}\n\n${this.buildHIDDiagnosticSummary(devices)}${errorHint}`, enumerationError ? 'error' : 'info');
        } catch (error) {
            console.error('Error loading all HID devices:', error);
            this.showHIDMessage(this.t('refreshHIDError'), 'error');
        }
    }

    async getHIDEnumerationError() {
        if (!window.electronAPI.getHIDEnumerationError) return '';
        try {
            return await window.electronAPI.getHIDEnumerationError();
        } catch (error) {
            console.error('Error reading HID enumeration error:', error);
            return '';
        }
    }

    normalizeNumber(value) {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            return Number.parseInt(value, value.startsWith('0x') || value.startsWith('0X') ? 16 : 10);
        }
        return 0;
    }

    async connectHID() {
        const devicePath = this.hidDevicesSelect.value;
        if (!devicePath) {
            this.showHIDMessage(this.t('selectHIDDevice'), 'info');
            return;
        }

        const selected = this.getSelectedHIDDevice();
        if (selected && !this.isCompatibleHIDDevice(selected)) {
            this.showHIDMessage(this.t('unsupportedHIDDevice'), 'error');
            return;
        }

        try {
            this.showHIDMessage('', 'info');
            const result = await window.electronAPI.connectHIDDevice(devicePath);
            if (result.success) {
                this.hidConnected = true;
                this.manualHIDDisconnect = false; // Clear manual disconnect flag on successful connection
                this.updateHIDStatus();
                this.showHIDMessage('', 'info');
                
                // Stop monitoring when successfully connected
                this.stopHIDMonitoring();
            } else {
                const permissionHint = result.canFixPermissions ? `\n\n${this.t('linuxHIDPermissionHint')}` : '';
                this.showHIDMessage(`${this.t('connectHIDFailed')}: ${result.error}${permissionHint}`, 'error', {
                    showPermissionFix: !!result.canFixPermissions
                });
            }
        } catch (error) {
            console.error('Error connecting HID:', error);
            this.showHIDMessage(this.t('connectHIDError'), 'error');
        }
    }

    showHIDMessage(message, type = 'info', options = {}) {
        if (!this.hidMessage) return;

        this.hidMessage.textContent = message || '';
        this.hidMessage.className = `hid-message ${message ? 'visible' : ''} ${type}`;

        if (this.fixHIDPermissionsBtn) {
            this.fixHIDPermissionsBtn.style.display = options.showPermissionFix ? 'block' : 'none';
            this.fixHIDPermissionsBtn.disabled = false;
            this.fixHIDPermissionsBtn.textContent = this.t('fixLinuxPermissions');
        }
    }

    async installLinuxHIDPermissions() {
        if (!window.electronAPI.installLinuxHIDPermissions || !this.fixHIDPermissionsBtn) {
            return;
        }

        this.fixHIDPermissionsBtn.disabled = true;
        this.fixHIDPermissionsBtn.textContent = this.t('fixingLinuxPermissions');
        this.showHIDMessage(this.t('fixingLinuxPermissions'), 'info', { showPermissionFix: true });

        try {
            const result = await window.electronAPI.installLinuxHIDPermissions();
            if (result.success) {
                this.showHIDMessage(this.t('linuxPermissionsFixed'), 'success');
                return;
            }

            const manual = result.manualCommand ? `\n\n${result.manualCommand}` : '';
            this.showHIDMessage(`${this.t('linuxPermissionsManual')}\n${result.error || ''}${manual}`, 'error', {
                showPermissionFix: true
            });
        } catch (error) {
            this.showHIDMessage(`${this.t('linuxPermissionsManual')}\n${error.message}`, 'error', {
                showPermissionFix: true
            });
        } finally {
            this.fixHIDPermissionsBtn.disabled = false;
            this.fixHIDPermissionsBtn.textContent = this.t('fixLinuxPermissions');
        }
    }

    async disconnectHID() {
        try {
            this.manualHIDDisconnect = true; // Mark as manual disconnect
            await window.electronAPI.disconnectHIDDevice();
            this.hidConnected = false;
            this.updateHIDStatus();
            
            if (this.mouseCaptured) {
                await this.releaseMouseCapture();
            }
            
            // Don't restart monitoring for manual disconnects to prevent auto-reconnection
            this.stopHIDMonitoring();
            console.log('HID manually disconnected - auto-reconnection disabled');
        } catch (error) {
            console.error('Error disconnecting HID:', error);
        }
    }

    async refreshHID() {
        try {
            // Full disconnect first
            if (this.hidConnected) {
                console.log('Refreshing HID: Disconnecting current device...');
                await window.electronAPI.disconnectHIDDevice();
                this.hidConnected = false;
                
                if (this.mouseCaptured) {
                    await this.releaseMouseCapture();
                }
            }
            
            // Stop any monitoring
            this.stopHIDMonitoring();
            
            // Clear flags and reset state
            this.manualHIDDisconnect = false;
            this.updateHIDStatus();
            
            // Refresh device list
            console.log('Refreshing HID: Loading device list...');
            await this.loadHIDDevices();
            console.log('Refreshing HID: Device list refreshed. Waiting for manual selection.');
            
            // Force UI update to ensure button states are correct
            this.updateHIDStatus();
        } catch (error) {
            console.error('Error refreshing HID:', error);
            alert(this.t('refreshHIDError'));
        }
    }

    async resetKeys() {
        if (this.hidConnected) {
            try {
                await window.electronAPI.sendKeyboardEvent({ type: 'reset' });
                console.log('Manual keyboard reset triggered');
            } catch (error) {
                console.error('Error resetting keyboard:', error);
            }
        } else {
            alert(this.t('connectHIDFirst'));
        }
    }

    async resetDevices() {
        if (this.hidConnected) {
            try {
                await window.electronAPI.sendMouseEvent({ type: 'reset' });
                await window.electronAPI.sendKeyboardEvent({ type: 'reset' });
            } catch (error) {
                console.error('Error resetting devices:', error);
            }
        }
    }

    async openPasteCommandModal() {
        if (!this.hidConnected) {
            alert(this.t('pasteNeedHID'));
            return;
        }

        const text = await window.electronAPI.readClipboardText();
        if (!text) {
            alert(this.t('pasteEmpty'));
            return;
        }

        const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        if (normalized.length > this.pasteMaxLength) {
            alert(this.t('pasteTooLong', { max: this.pasteMaxLength }));
            return;
        }
        if (!this.isSupportedPasteText(normalized)) {
            alert(this.t('pasteUnsupported'));
            return;
        }

        this.pastePreview.value = normalized;
        this.pasteEnterToggle.checked = false;
        this.pasteSpeedSelect.value = '45';
        this.pasteAbortRequested = false;
        this.pasteSending = false;
        this.updatePasteLimitInfo();
        this.updatePasteSendingState(false);
        this.pasteModal.style.display = 'flex';
        this.pasteSuspendedControlMode = this.mouseCaptured && this.nativeInputAvailable;
        if (this.pasteSuspendedControlMode) {
            await window.electronAPI.setControlMode(false);
            this.nativeInputAvailable = false;
        }
        this.pastePreview.focus();
    }

    async hidePasteCommandModal() {
        if (this.pasteSending) {
            this.stopPasteCommand();
            return;
        }
        this.pasteModal.style.display = 'none';
        if (this.pasteSuspendedControlMode && this.mouseCaptured) {
            try {
                const controlMode = await window.electronAPI.setControlMode(true);
                this.nativeInputAvailable = !!controlMode?.nativeInputAvailable;
            } catch (error) {
                console.error('Error restoring control mode after paste modal:', error);
                this.nativeInputAvailable = false;
            }
        }
        this.pasteSuspendedControlMode = false;
    }

    async confirmPasteCommand() {
        const text = this.pastePreview.value || '';
        if (!text.length) {
            alert(this.t('pasteEmpty'));
            return;
        }
        if (text.length > this.pasteMaxLength) {
            alert(this.t('pasteTooLong', { max: this.pasteMaxLength }));
            return;
        }
        if (!this.isSupportedPasteText(text)) {
            alert(this.t('pasteUnsupported'));
            return;
        }

        this.pasteAbortRequested = false;
        this.updatePasteSendingState(true);
        try {
            await this.typeAsciiTextToRemote(text, {
                delayMs: Number(this.pasteSpeedSelect.value || 45),
                pressEnter: this.pasteEnterToggle.checked
            });
            this.updatePasteSendingState(false);
            await this.hidePasteCommandModal();
            this.showAutoConnectNotification(this.pasteAbortRequested ? this.t('pasteStopped') : this.t('pasteDone'), this.pasteAbortRequested ? 'error' : 'success');
        } catch (error) {
            console.error('Paste command failed:', error);
            this.updatePasteSendingState(false);
            this.showAutoConnectNotification(error.message || this.t('pasteStopped'), 'error');
        } finally {
            this.updatePasteSendingState(false);
        }
    }

    stopPasteCommand() {
        this.pasteAbortRequested = true;
        this.stopPasteBtn.disabled = true;
    }

    updatePasteSendingState(isSending) {
        this.pasteSending = isSending;
        this.confirmPasteBtn.disabled = isSending || !this.isPasteWithinLimit();
        this.cancelPasteBtn.disabled = isSending;
        this.stopPasteBtn.style.display = isSending ? '' : 'none';
        this.stopPasteBtn.disabled = !isSending;
        this.pastePreview.disabled = isSending;
        this.pasteEnterToggle.disabled = isSending;
        this.pasteSpeedSelect.disabled = isSending;
    }

    updatePasteLimitInfo() {
        if (!this.pasteLimitInfo) return;
        const length = (this.pastePreview.value || '').length;
        this.pasteLimitInfo.textContent = `${length} / ${this.pasteMaxLength}`;
        this.pasteLimitInfo.classList.toggle('error', length > this.pasteMaxLength);
        if (!this.pasteSending) {
            this.confirmPasteBtn.disabled = !this.isPasteWithinLimit();
        }
    }

    isPasteWithinLimit() {
        const length = (this.pastePreview?.value || '').length;
        return length > 0 && length <= this.pasteMaxLength;
    }

    isSupportedPasteText(text) {
        return /^[\x09\x0A\x20-\x7E]*$/.test(text);
    }

    async typeAsciiTextToRemote(text, options = {}) {
        const delayMs = Math.max(10, Math.min(150, options.delayMs || 45));
        const sendEnter = !!options.pressEnter;

        for (const ch of text) {
            if (this.pasteAbortRequested) break;
            await this.sendAsciiCharacter(ch, delayMs);
        }

        if (sendEnter && !this.pasteAbortRequested) {
            await this.sendKeyStroke({ key: 'Enter', code: 'Enter' }, delayMs);
        }
        await window.electronAPI.sendKeyboardEvent({ type: 'reset' });
    }

    async sendAsciiCharacter(ch, delayMs) {
        if (ch === '\n') {
            await this.sendKeyStroke({ key: 'Enter', code: 'Enter' }, delayMs);
            return;
        }
        if (ch === '\t') {
            await this.sendKeyStroke({ key: 'Tab', code: 'Tab' }, delayMs);
            return;
        }

        const mapped = this.mapAsciiCharacterToKey(ch);
        if (!mapped) {
            throw new Error(`Unsupported paste character: ${ch}`);
        }
        await this.sendKeyStroke(mapped, delayMs);
    }

    async sendKeyStroke({ key, code, shiftKey = false }, delayMs) {
        if (shiftKey) {
            await window.electronAPI.sendKeyboardEvent({ type: 'keydown', key: 'Shift', code: 'ShiftLeft' });
            await this.delay(delayMs);
        }
        await window.electronAPI.sendKeyboardEvent({ type: 'keydown', key, code });
        await this.delay(delayMs);
        await window.electronAPI.sendKeyboardEvent({ type: 'keyup', key, code });
        if (shiftKey) {
            await this.delay(delayMs);
            await window.electronAPI.sendKeyboardEvent({ type: 'keyup', key: 'Shift', code: 'ShiftLeft' });
        }
        await this.delay(delayMs);
    }

    mapAsciiCharacterToKey(ch) {
        if (ch >= 'a' && ch <= 'z') {
            return { key: ch, code: `Key${ch.toUpperCase()}` };
        }
        if (ch >= 'A' && ch <= 'Z') {
            return { key: ch.toLowerCase(), code: `Key${ch}`, shiftKey: true };
        }
        if (ch >= '0' && ch <= '9') {
            return { key: ch, code: `Digit${ch}` };
        }
        if (ch === ' ') return { key: ' ', code: 'Space' };

        const map = {
            '`': ['Backquote', false], '~': ['Backquote', true],
            '-': ['Minus', false], '_': ['Minus', true],
            '=': ['Equal', false], '+': ['Equal', true],
            '[': ['BracketLeft', false], '{': ['BracketLeft', true],
            ']': ['BracketRight', false], '}': ['BracketRight', true],
            '\\': ['Backslash', false], '|': ['Backslash', true],
            ';': ['Semicolon', false], ':': ['Semicolon', true],
            "'": ['Quote', false], '"': ['Quote', true],
            ',': ['Comma', false], '<': ['Comma', true],
            '.': ['Period', false], '>': ['Period', true],
            '/': ['Slash', false], '?': ['Slash', true],
            '!': ['Digit1', true], '@': ['Digit2', true],
            '#': ['Digit3', true], '$': ['Digit4', true],
            '%': ['Digit5', true], '^': ['Digit6', true],
            '&': ['Digit7', true], '*': ['Digit8', true],
            '(': ['Digit9', true], ')': ['Digit0', true]
        };
        const entry = map[ch];
        if (!entry) return null;
        return { key: ch, code: entry[0], shiftKey: entry[1] };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async toggleMouseCapture() {
        if (!this.hidConnected) {
            alert(this.t('connectHIDFirstMouse'));
            return;
        }

        if (this.mouseCaptured) {
            await this.releaseMouseCapture();
        } else {
            await this.captureMouseKeyboard();
        }
    }


    async releaseMouseCaptureWithKeyReset() {
        // Send key reset to release any stuck modifier keys
        if (this.hidConnected) {
            try {
                await window.electronAPI.sendKeyboardEvent({
                    type: 'reset'
                });
                console.log('Sent keyboard reset to release stuck keys');
            } catch (error) {
                console.error('Error sending keyboard reset:', error);
            }
        }
        
        // Then release mouse capture normally
        await this.releaseMouseCapture();
    }

    async releaseMouseCapture() {
        this.mouseCaptured = false;
        this.mouseCaptureOverlay.style.display = 'none';
        document.body.style.cursor = 'default';
        this.mouseButtonsPressed = 0;
        
        // Unregister ESC key when exiting control mode
        try {
            await window.electronAPI.setControlMode(false);
            this.nativeInputAvailable = false;
        } catch (error) {
            console.error('Error unsetting control mode:', error);
            this.nativeInputAvailable = false;
        }
        
        // Hide control mode notification
        const controlNotification = document.getElementById('controlModeNotification');
        if (controlNotification) {
            controlNotification.style.display = 'none';
        }
        
        // Exit pointer lock if active
        if (document.pointerLockElement) {
            document.exitPointerLock();
        }
        
        // Restore all header and video container styles
        this.applyWorkspaceFullscreen(this.isFullscreen);
        
        console.log('macOS: Header and video container fully restored');
    }

    requiresPointerLockControl() {
        return this.mouseMode === 'relative' || !this.videoConnected;
    }

    async handleMouseMove(event) {
        if (!this.hidConnected) return;

        if (this.requiresPointerLockControl()) {
            const deltaX = event.movementX;
            const deltaY = event.movementY;

            if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
                try {
                    await window.electronAPI.sendMouseEvent({
                        type: 'move',
                        x: deltaX,
                        y: deltaY,
                        buttonsPressed: this.mouseButtonsPressed // Include button state for dragging
                    });
                } catch (error) {
                    console.error('Error sending mouse move:', error);
                }
            }
        } else if (this.mouseMode === 'absolute') {
            const { x, y } = this.getAbsoluteHIDCoordinates(event);

            // Validate coordinates before sending
            if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
                console.error('Invalid coordinates detected:', { x, y });
                return;
            }

            try {
                await window.electronAPI.sendMouseEvent({
                    type: 'abs',
                    x: x,
                    y: y,
                    buttonsPressed: this.mouseButtonsPressed // Include button state for dragging
                });
            } catch (error) {
                console.error('Error sending absolute mouse position:', error);
            }
        }
    }

    async handleMouseClick(event) {
        if (!this.hidConnected || this.mouseMode !== 'absolute') return;

        const { x, y } = this.getAbsoluteHIDCoordinates(event);

        try {
            await window.electronAPI.sendMouseEvent({
                type: 'abs',
                x: x,
                y: y
            });
        } catch (error) {
            console.error('Error sending absolute mouse position:', error);
        }
    }

    async handleMouseEvent(event) {
        if (!this.hidConnected) return;

        const buttonMask = this.getHIDButtonMask(event.button);

        if (event.type === 'mousedown') {
            this.mouseButtonsPressed |= buttonMask;
        } else if (event.type === 'mouseup') {
            this.mouseButtonsPressed &= ~buttonMask;
        }

        try {
            // In relative mode, only send button press/release without position
            // In absolute mode, include the click position
            if (this.mouseMode === 'relative' || !this.videoConnected) {
                // Relative mode: Send only button state, no position
                await window.electronAPI.sendMouseEvent({
                    type: event.type === 'mousedown' ? 'mousedown' : 'mouseup',
                    button: event.button,
                    buttonsPressed: this.mouseButtonsPressed
                    // No x, y coordinates in relative mode
                });
            } else {
                const { x, y } = this.getAbsoluteHIDCoordinates(event);

                await window.electronAPI.sendMouseEvent({
                    type: event.type === 'mousedown' ? 'mousedown' : 'mouseup',
                    button: event.button,
                    buttonsPressed: this.mouseButtonsPressed,
                    x: x,  // Include current position in absolute mode
                    y: y
                });
            }
        } catch (error) {
            console.error('Error sending mouse event:', error);
        }

        event.preventDefault();
    }

    async handleMouseWheel(event) {
        if (!this.hidConnected) return;

        try {
            // Apply scroll direction preference
            const scrollMultiplier = this.reverseScroll ? -1 : 1;

            if (this.mouseMode === 'absolute' && this.videoConnected) {
                const { x, y } = this.getAbsoluteHIDCoordinates(event);

                // Send wheel events for both X and Y scroll
                if (Math.abs(event.deltaY) > 0) {
                    await window.electronAPI.sendMouseEvent({
                        type: 'wheel',
                        delta: event.deltaY * scrollMultiplier,
                        x: x,
                        y: y,
                        buttonsPressed: this.mouseButtonsPressed
                    });
                }
                if (Math.abs(event.deltaX) > 0) {
                    await window.electronAPI.sendMouseEvent({
                        type: 'wheel',
                        delta: event.deltaX * scrollMultiplier,
                        x: x,
                        y: y,
                        buttonsPressed: this.mouseButtonsPressed
                    });
                }
            } else {
                // Relative mode: Send wheel delta without position (use zeros for relative deltas)
                // The HID backend will handle this as a relative mode wheel event
                if (Math.abs(event.deltaY) > 0) {
                    await window.electronAPI.sendMouseEvent({
                        type: 'wheel',
                        delta: event.deltaY * scrollMultiplier,
                        buttonsPressed: this.mouseButtonsPressed
                        // No x, y in relative mode - backend uses lastX/lastY or zeros
                    });
                }
                if (Math.abs(event.deltaX) > 0) {
                    await window.electronAPI.sendMouseEvent({
                        type: 'wheel',
                        delta: event.deltaX * scrollMultiplier,
                        buttonsPressed: this.mouseButtonsPressed
                        // No x, y in relative mode - backend uses lastX/lastY or zeros
                    });
                }
            }
        } catch (error) {
            console.error('Error sending mouse wheel:', error);
        }
    }

    getControlSurfaceRect() {
        if (this.videoConnected && this.videoElement.style.display !== 'none') {
            return this.getVideoContentRect();
        }

        return document.querySelector('.video-container').getBoundingClientRect();
    }

    getVideoContentRect() {
        const rect = this.videoElement.getBoundingClientRect();
        const sourceWidth = this.videoElement.videoWidth || rect.width;
        const sourceHeight = this.videoElement.videoHeight || rect.height;
        if (!sourceWidth || !sourceHeight || !rect.width || !rect.height) {
            return rect;
        }

        if (this.displayMode === 'fill') {
            return rect;
        }

        if (this.displayMode === 'original') {
            return rect;
        }

        const sourceAspect = sourceWidth / sourceHeight;
        const rectAspect = rect.width / rect.height;
        let width = rect.width;
        let height = rect.height;
        let left = rect.left;
        let top = rect.top;

        if (rectAspect > sourceAspect) {
            width = rect.height * sourceAspect;
            left = rect.left + (rect.width - width) / 2;
        } else {
            height = rect.width / sourceAspect;
            top = rect.top + (rect.height - height) / 2;
        }

        return { left, top, width, height, right: left + width, bottom: top + height };
    }

    getAbsoluteHIDCoordinates(event) {
        if (!this.videoConnected || this.videoElement.style.display === 'none') {
            const rect = document.querySelector('.video-container').getBoundingClientRect();
            return this.pointToHID(event.clientX, event.clientY, rect);
        }

        const elementRect = this.videoElement.getBoundingClientRect();
        const sourceWidth = this.videoElement.videoWidth || elementRect.width;
        const sourceHeight = this.videoElement.videoHeight || elementRect.height;

        if (this.displayMode === 'fill' && sourceWidth && sourceHeight) {
            const scale = Math.max(elementRect.width / sourceWidth, elementRect.height / sourceHeight);
            const renderedWidth = sourceWidth * scale;
            const renderedHeight = sourceHeight * scale;
            const offsetX = (elementRect.width - renderedWidth) / 2;
            const offsetY = (elementRect.height - renderedHeight) / 2;
            const nx = (event.clientX - elementRect.left - offsetX) / renderedWidth;
            const ny = (event.clientY - elementRect.top - offsetY) / renderedHeight;
            return {
                x: Math.round(Math.max(0, Math.min(1, nx)) * 0x7FFF),
                y: Math.round(Math.max(0, Math.min(1, ny)) * 0x7FFF)
            };
        }

        return this.pointToHID(event.clientX, event.clientY, this.getControlSurfaceRect());
    }

    pointToHID(clientX, clientY, rect) {
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;
        const clampedX = Math.max(0, Math.min(relativeX, width));
        const clampedY = Math.max(0, Math.min(relativeY, height));

        return {
            x: Math.round((clampedX / width) * 0x7FFF),
            y: Math.round((clampedY / height) * 0x7FFF)
        };
    }

    updateDisplayScaleInfo() {
        if (!this.displayScaleInfo) return;

        if (!this.videoConnected || !this.videoElement.videoWidth || !this.videoElement.videoHeight) {
            this.displayScaleInfo.textContent = this.t('displayScaleDisconnected');
            this.displayScaleInfo.classList.remove('active');
            return;
        }

        const contentRect = this.getVideoContentRect();
        const input = `${this.videoElement.videoWidth}x${this.videoElement.videoHeight}`;
        const view = `${Math.round(contentRect.width)}x${Math.round(contentRect.height)}`;
        const scale = `${Math.round((contentRect.width / this.videoElement.videoWidth) * 100)}%`;
        this.displayScaleInfo.textContent = this.t('displayScaleInfo', { input, view, scale });
        this.displayScaleInfo.classList.add('active');
    }


    updateVideoStatus() {
        this.videoStatus.textContent = this.videoConnected ? this.t('videoConnected') : this.t('videoDisconnected');
        this.videoStatus.setAttribute('data-status', this.videoConnected ? 'connected' : 'disconnected');
        this.updateCaptureControls();
    }

    updateHIDStatus() {
        this.hidStatus.textContent = this.hidConnected ? this.t('hidConnected') : this.t('hidDisconnected');
        this.hidStatus.setAttribute('data-status', this.hidConnected ? 'connected' : 'disconnected');
        
        // Update connect/disconnect button states
        this.connectHIDBtn.disabled = this.hidConnected;
        this.disconnectHIDBtn.disabled = !this.hidConnected;
        this.hidDevicesSelect.disabled = this.hidConnected;
        if (this.showHIDDiagnosticsBtn) {
            this.showHIDDiagnosticsBtn.disabled = this.hidConnected;
        }
        
        // Enable/disable quick control buttons based on HID connection
        this.sendCADBtn.disabled = !this.hidConnected;
        this.switchDisplayBtn.disabled = !this.hidConnected;
        this.pasteCommandBtn.disabled = !this.hidConnected;
        this.fullscreenPasteCommandBtn.disabled = !this.hidConnected;
        this.fullscreenSwitchDisplayBtn.disabled = !this.hidConnected;
    }

    updateDeviceSelectionLocks() {
        const videoLocked = this.videoConnected;
        this.videoDevicesSelect.disabled = videoLocked;
        this.resolutionSelect.disabled = videoLocked;
        this.fpsSelect.disabled = videoLocked;
        this.hidDevicesSelect.disabled = this.hidConnected;
        if (this.showHIDDiagnosticsBtn) {
            this.showHIDDiagnosticsBtn.disabled = this.hidConnected;
        }
    }

    updateVideoDisplay() {
        if (this.videoConnected) {
            this.videoElement.style.display = 'block';
            this.videoPlaceholder.style.display = 'none';
        } else {
            this.videoElement.style.display = 'none';
            this.videoPlaceholder.style.display = 'flex';
            this.videoPlaceholder.innerHTML = `
                <h2>${this.t('inputBridgeReadyTitle')}</h2>
                <p>${this.t('inputBridgeReadyBody')}</p>
                <p class="video-placeholder-sub">${this.t('inputBridgeReadySub')}</p>
            `;
        }
        this.updateMouseModeDisplay();
        this.updateCaptureControls();
        this.updateDisplayScaleInfo();
    }

    updateCaptureControls() {
        const canCapture = this.videoConnected && !!this.videoElement.srcObject;
        this.captureScreenshotBtn.disabled = !canCapture;
        this.fullscreenScreenshotBtn.disabled = !canCapture;
        this.toggleRecordingBtn.disabled = !canCapture && !this.isRecording;
        this.fullscreenRecordBtn.disabled = !canCapture && !this.isRecording;
        this.recordGifBtn.disabled = !canCapture && !this.isRecordingGif;
        this.fullscreenGifBtn.disabled = !canCapture && !this.isRecordingGif;

        const label = this.isRecording ? this.t('btnRecordStop') : this.t('btnRecord');
        const compactLabel = this.isRecording ? (this.language === 'zh' ? '停止' : 'Stop') : this.t('btnRecord');
        const gifLabel = this.isRecordingGif ? this.t('btnRecordStop') : this.t('btnGif');
        this.toggleRecordingBtn.textContent = label;
        this.fullscreenRecordBtn.textContent = compactLabel;
        this.recordGifBtn.textContent = gifLabel;
        this.fullscreenGifBtn.textContent = this.isRecordingGif ? (this.language === 'zh' ? '停止' : 'Stop') : 'GIF';
        this.updateFullscreenModeButtons();
    }

    cycleDisplayMode() {
        const modes = ['fit', 'fill', 'original'];
        const index = modes.indexOf(this.displayMode);
        this.setDisplayMode(modes[(index + 1) % modes.length]);
    }

    cycleTargetMode() {
        const modes = ['desktop', 'android'];
        const index = modes.indexOf(this.targetMode);
        this.setTargetMode(modes[(index + 1) % modes.length]);
    }

    updateTargetModeDisplay() {
        if (this.targetModeSelect) {
            this.targetModeSelect.value = this.targetMode;
        }

        const key = `targetModeDesc${this.capitalizeMode(this.targetMode)}`;
        if (this.targetModeDescription) {
            this.targetModeDescription.textContent = this.t(key);
        }

        if (this.mouseModeToggle) {
            this.mouseModeToggle.disabled = true;
        }
    }

    updateDisplayModeDisplay() {
        if (this.displayModeSelect) {
            this.displayModeSelect.value = this.displayMode;
        }

        const key = `displayModeDesc${this.capitalizeMode(this.displayMode)}`;
        if (this.displayModeDescription) {
            this.displayModeDescription.textContent = this.t(key);
        }

        this.updateDisplayScaleInfo();
    }

    updateFullscreenModeButtons() {
        if (this.fullscreenDisplayModeBtn) {
            const key = `displayMode${this.capitalizeMode(this.displayMode)}`;
            this.fullscreenDisplayModeBtn.textContent = `✓ ${this.t(key)}`;
        }
        if (this.fullscreenTargetModeBtn) {
            const key = `targetMode${this.capitalizeMode(this.targetMode)}`;
            this.fullscreenTargetModeBtn.textContent = `✓ ${this.t(key)}`;
        }
    }

    toggleMouseMode() {
        this.applyTargetModeDefaults();
        this.updateMouseModeDisplay();
        this.saveSettings();
    }

    updateMouseModeDisplay() {
        this.applyTargetModeDefaults();
        if (this.mouseMode === 'absolute') {
            this.mouseModeLabel.textContent = this.t('mouseModeAbsolute');
            this.mouseModeDescription.textContent = this.t('targetModeDescDesktop');
            this.mouseModeToggle.checked = false;
        } else {
            this.mouseModeLabel.textContent = this.t('mouseModeRelative');
            this.mouseModeDescription.textContent = this.t('targetModeDescAndroid');
            this.mouseModeToggle.checked = true;
        }
        this.updateTargetModeDisplay();
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
        this.infoPanel.classList.toggle('visible', this.sidebarVisible);
        this.sidebarToggleBtn.classList.toggle('active', this.sidebarVisible);
        this.sidebarToggleBtn.textContent = this.sidebarVisible
            ? (this.language === 'zh' ? '隐藏设置' : 'Hide Settings')
            : this.t('settings');
    }

    handleHeaderAutoHide(event) {
        // Don't auto-show header when mouse is captured
        if (this.mouseCaptured) return;
        
        // Only auto-hide in fullscreen mode
        if (this.isFullscreen) {
            this.showHeader();
            clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => this.hideHeader(), 2000);
        } else {
            // Always show header when not in fullscreen
            this.showHeader();
            clearTimeout(this.hideTimer);
        }
    }

    handleFullscreenToolsAutoHide(event) {
        if (!document.body.classList.contains('workspace-fullscreen')) return;
        if (this.fullscreenTools?.classList.contains('visible')) {
            this.scheduleHideFullscreenTools();
        }
    }

    showFullscreenTools(manual = false) {
        if (!this.fullscreenTools) return;
        if (manual) {
            this.toolsManuallyHidden = false;
        }
        this.fullscreenTools.classList.add('visible');
        this.fullscreenToolsHint?.classList.add('hidden');
        clearTimeout(this.fullscreenToolsTimer);
    }

    scheduleHideFullscreenTools(delay = 900) {
        clearTimeout(this.fullscreenToolsTimer);
        this.fullscreenToolsTimer = setTimeout(() => this.hideFullscreenTools(), delay);
    }

    hideFullscreenTools(manual = false) {
        if (manual) {
            this.toolsManuallyHidden = true;
        }
        this.fullscreenTools?.classList.remove('visible');
        this.fullscreenToolsHint?.classList.remove('hidden');
    }

    showFullscreenGuide() {
        if (!this.fullscreenGuide) return;
        if (this.fullscreenGuideShown) {
            this.fullscreenToolsHint.textContent = this.t('fullscreenToolsHint');
            return;
        }
        this.fullscreenGuideShown = true;
        this.fullscreenGuide.querySelector('span').textContent = this.t('fullscreenGuide');
        this.fullscreenGuide.querySelector('strong').textContent = this.t('fullscreenGuideTitle');
        this.fullscreenToolsHint.textContent = this.t('fullscreenToolsHint');
        this.fullscreenGuide.classList.add('visible');
        setTimeout(() => {
            this.fullscreenGuide?.classList.remove('visible');
        }, 3000);
    }

    handleFullscreenChange() {
        // Detect fullscreen state from DOM
        this.isFullscreen = !!document.fullscreenElement;
        
        if (this.isFullscreen) {
            this.showHeader();
            clearTimeout(this.hideTimer);
            this.hideTimer = setTimeout(() => this.hideHeader(), 2000);
        } else {
            clearTimeout(this.hideTimer);
            this.showHeader();
        }
    }

    showHeader() {
        if (!this.headerVisible) {
            this.header.classList.remove('hidden');
            this.headerVisible = true;
        }
    }

    hideHeader() {
        if (this.headerVisible) {
            this.header.classList.add('hidden');
            this.headerVisible = false;
        }
    }

    async captureMouseKeyboard() {
        this.mouseCaptured = true;
        
        // Register ESC key for control mode
        try {
            const controlMode = await window.electronAPI.setControlMode(true);
            this.nativeInputAvailable = !!controlMode?.nativeInputAvailable;
        } catch (error) {
            console.error('Error setting control mode:', error);
            this.nativeInputAvailable = false;
        }
        
        this.applyWorkspaceFullscreen(this.isFullscreen || this.requiresPointerLockControl());
        
        console.log('Control mode enabled');
        
        // Show control mode notification
        this.showControlModeNotification();
        
        if (this.requiresPointerLockControl()) {
            // Relative mode: hide cursor and request pointer lock
            document.body.style.cursor = 'none';
            
            // Request pointer lock for relative mode
            console.log('Requesting pointer lock for relative/input-bridge mode');
            this.getPointerLockTarget().requestPointerLock().then(() => {
                console.log('Pointer lock request succeeded');
            }).catch(error => {
                console.error('Pointer lock request failed:', error);
            });
        } else {
            // Absolute mode: keep cursor visible
            document.body.style.cursor = 'default';
        }
    }

    getPointerLockTarget() {
        return this.videoConnected ? this.videoElement : document.querySelector('.video-container');
    }

    toggleScrollDirection() {
        this.reverseScroll = this.scrollReverseToggle.checked;
        this.updateScrollDirectionDisplay();
        this.saveSettings();
    }

    updateScrollDirectionDisplay() {
        if (this.reverseScroll) {
            this.scrollDirectionLabel.textContent = this.t('scrollTraditional');
            this.scrollDirectionDescription.textContent = this.t('scrollDescTraditional');
            this.scrollReverseToggle.checked = true;
        } else {
            this.scrollDirectionLabel.textContent = this.t('scrollNatural');
            this.scrollDirectionDescription.textContent = this.t('scrollDescNatural');
            this.scrollReverseToggle.checked = false;
        }
    }

    getHIDButtonMask(domButton) {
        // Convert DOM button index to HID button mask
        const buttonMap = {
            0: 1,  // Left button
            1: 4,  // Middle button  
            2: 2,  // Right button
            3: 8,  // Back button
            4: 16  // Forward button
        };
        return buttonMap[domButton] || 1;
    }

    async sendCtrlAltDelete() {
        if (!this.hidConnected) {
            alert(this.t('connectHIDFirst'));
            return;
        }

        try {
            console.log('Sending Ctrl+Alt+Delete');
            
            // Send the key combination in steps to avoid conflicts
            // First press modifiers
            await window.electronAPI.sendKeyboardEvent({
                type: 'keydown',
                key: 'Control',
                code: 'ControlLeft',
                ctrlKey: true,
                altKey: false,
                metaKey: false,
                shiftKey: false
            });
            
            await new Promise(resolve => setTimeout(resolve, 10));
            
            await window.electronAPI.sendKeyboardEvent({
                type: 'keydown',
                key: 'Alt',
                code: 'AltLeft',
                ctrlKey: true,
                altKey: true,
                metaKey: false,
                shiftKey: false
            });
            
            await new Promise(resolve => setTimeout(resolve, 10));
            
            // Then press Delete
            await window.electronAPI.sendKeyboardEvent({
                type: 'keydown',
                key: 'Delete',
                code: 'Delete',
                ctrlKey: true,
                altKey: true,
                metaKey: false,
                shiftKey: false
            });
            
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // Release in reverse order
            await window.electronAPI.sendKeyboardEvent({
                type: 'keyup',
                key: 'Delete',
                code: 'Delete',
                ctrlKey: true,
                altKey: true,
                metaKey: false,
                shiftKey: false
            });
            
            await new Promise(resolve => setTimeout(resolve, 10));
            
            await window.electronAPI.sendKeyboardEvent({
                type: 'keyup',
                key: 'Alt',
                code: 'AltLeft',
                ctrlKey: true,
                altKey: false,
                metaKey: false,
                shiftKey: false
            });
            
            await new Promise(resolve => setTimeout(resolve, 10));
            
            await window.electronAPI.sendKeyboardEvent({
                type: 'keyup',
                key: 'Control',
                code: 'ControlLeft',
                ctrlKey: false,
                altKey: false,
                metaKey: false,
                shiftKey: false
            });
            
            console.log('Ctrl+Alt+Delete sequence completed');
            
        } catch (error) {
            console.error('Error sending Ctrl+Alt+Delete:', error);
            // Try to reset keyboard state on error
            try {
                await window.electronAPI.sendKeyboardEvent({ type: 'reset' });
            } catch (resetError) {
                console.error('Error resetting keyboard after CAD failure:', resetError);
            }
        }
    }

    isLocalControlEvent(event) {
        const target = event.target;
        if (!(target instanceof Element)) return false;

        return !!target.closest(
            '.fullscreen-tools, .header, .info-panel, .quit-key-modal'
        );
    }

    getDisplayKeyFromCode(code, fallbackKey) {
        // Convert event.code to a readable display key name
        // This helps avoid showing modified characters like 'œ' for Alt+Q
        const codeToDisplayKey = {
            // Letter keys
            'KeyA': 'A', 'KeyB': 'B', 'KeyC': 'C', 'KeyD': 'D', 'KeyE': 'E', 'KeyF': 'F',
            'KeyG': 'G', 'KeyH': 'H', 'KeyI': 'I', 'KeyJ': 'J', 'KeyK': 'K', 'KeyL': 'L',
            'KeyM': 'M', 'KeyN': 'N', 'KeyO': 'O', 'KeyP': 'P', 'KeyQ': 'Q', 'KeyR': 'R',
            'KeyS': 'S', 'KeyT': 'T', 'KeyU': 'U', 'KeyV': 'V', 'KeyW': 'W', 'KeyX': 'X',
            'KeyY': 'Y', 'KeyZ': 'Z',
            
            // Number keys
            'Digit0': '0', 'Digit1': '1', 'Digit2': '2', 'Digit3': '3', 'Digit4': '4',
            'Digit5': '5', 'Digit6': '6', 'Digit7': '7', 'Digit8': '8', 'Digit9': '9',
            
            // Function keys
            'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4', 'F5': 'F5', 'F6': 'F6',
            'F7': 'F7', 'F8': 'F8', 'F9': 'F9', 'F10': 'F10', 'F11': 'F11', 'F12': 'F12',
            
            // Special keys
            'Space': 'Space',
            'Enter': 'Enter',
            'Tab': 'Tab',
            'Escape': 'Escape',
            'Backspace': 'Backspace',
            'Delete': 'Delete',
            'Insert': 'Insert',
            'Home': 'Home',
            'End': 'End',
            'PageUp': 'PageUp',
            'PageDown': 'PageDown',
            'ArrowLeft': 'ArrowLeft',
            'ArrowRight': 'ArrowRight',
            'ArrowUp': 'ArrowUp',
            'ArrowDown': 'ArrowDown',
            
            // Modifier keys (preserving left/right distinction)
            'ShiftLeft': 'Left Shift',
            'ShiftRight': 'Right Shift',
            'ControlLeft': 'Left Ctrl',
            'ControlRight': 'Right Ctrl',
            'AltLeft': 'Left Alt',
            'AltRight': 'Right Alt',
            'MetaLeft': 'Left Meta',
            'MetaRight': 'Right Meta'
        };
        
        // Return the mapped display key or fallback to the original key
        return codeToDisplayKey[code] || fallbackKey;
    }

    startHIDMonitoring() {
        // Check for new HID devices every 3 seconds
        this.hidMonitorInterval = setInterval(async () => {
            if (!this.hidConnected && !this.manualHIDDisconnect) {
                await this.loadHIDDevices();
            }
        }, 3000);
        
        console.log('HID device monitoring started - checking every 3 seconds');
    }

    stopHIDMonitoring() {
        if (this.hidMonitorInterval) {
            clearInterval(this.hidMonitorInterval);
            this.hidMonitorInterval = null;
            console.log('HID device monitoring stopped');
        }
    }

    showAutoConnectNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('autoConnectNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'autoConnectNotification';
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background-color: #007acc;
                color: white;
                padding: 12px 16px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10001;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                max-width: 300px;
                word-wrap: break-word;
            `;
            document.body.appendChild(notification);
        }

        // Update styling based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        } else {
            notification.style.backgroundColor = '#007acc';
        }

        notification.textContent = message;
        notification.style.display = 'block';
        notification.style.opacity = '1';

        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 4000);
    }

    showControlModeNotification() {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('controlModeNotification');
        if (!notification) {
            // Add animation styles to document head if not already present
            if (!document.getElementById('controlModeNotificationStyles')) {
                const style = document.createElement('style');
                style.id = 'controlModeNotificationStyles';
                style.textContent = `
                    @keyframes slideUpFadeIn {
                        0% {
                            transform: translateX(-50%) translateY(20px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(-50%) translateY(0);
                            opacity: 1;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            notification = document.createElement('div');
            notification.id = 'controlModeNotification';
            notification.style.cssText = `
                position: fixed;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.95);
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                font-size: 18px;
                font-weight: 600;
                z-index: 10002;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(12px);
                transition: all 0.3s ease;
                max-width: 400px;
                word-wrap: break-word;
                text-align: center;
                animation: slideUpFadeIn 0.4s ease-out;
            `;
            document.body.appendChild(notification);
        }

        // Get current quit key combination
        const overlayHint = this.getControlOverlayHint().replaceAll('<kbd>', '<kbd style="background-color: rgba(255, 255, 255, 0.25); border: 2px solid rgba(255, 255, 255, 0.4); border-radius: 6px; padding: 4px 10px; font-size: 14px; font-family: inherit; font-weight: 600; margin: 0 2px;">');
        notification.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 20px;">${this.t('overlayActive')}</div>
            <div style="margin-bottom: 8px; font-size: 16px;">${overlayHint}</div>
            <div style="margin-bottom: 8px; font-size: 12px; color: #c9d7e8;">${this.t(`targetMode${this.capitalizeMode(this.targetMode)}`)} / ${this.t(`displayMode${this.capitalizeMode(this.displayMode)}`)}</div>
            <div style="font-size: 12px; color: #74d99f; opacity: 0.9;">${this.t('forwardingActive')}</div>
        `;

        notification.style.display = 'block';
        notification.style.opacity = '1';

        // Auto-hide after 4 seconds
        setTimeout(() => {
            if (notification && this.mouseCaptured) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification && notification.parentNode) {
                        notification.style.display = 'none';
                    }
                }, 300);
            }
        }, 4000);
    }

    async toggleFullscreen() {
        try {
            const isFullscreen = await window.electronAPI.toggleFullscreen();
            console.log('Fullscreen toggled:', isFullscreen);
            
            // Store fullscreen state for header auto-hide logic
            this.isFullscreen = isFullscreen;
            this.applyWorkspaceFullscreen(isFullscreen || this.mouseCaptured);
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    }

    applyWorkspaceFullscreen(enabled) {
        const videoContainer = document.querySelector('.video-container');
        const mainContent = document.querySelector('.main-content');
        const wasWorkspaceFullscreen = document.body.classList.contains('workspace-fullscreen');

        clearTimeout(this.hideTimer);

        if (enabled) {
            document.body.classList.add('workspace-fullscreen');
            this.header.style.display = 'none';
            this.header.style.position = 'absolute';
            this.header.style.top = '-200px';
            this.header.style.pointerEvents = 'none';
            this.header.classList.add('hidden');
            this.headerVisible = false;

            if (mainContent) {
                mainContent.style.marginLeft = '0';
            }

            videoContainer.style.position = 'fixed';
            videoContainer.style.top = '0';
            videoContainer.style.left = '0';
            videoContainer.style.width = '100vw';
            videoContainer.style.height = '100vh';
            videoContainer.style.zIndex = '9999';
            if (!wasWorkspaceFullscreen) {
                this.toolsManuallyHidden = false;
                this.showFullscreenGuide();
            }
            return;
        }

        document.body.classList.remove('workspace-fullscreen');
        this.hideFullscreenTools(false);
        this.toolsManuallyHidden = false;
        this.fullscreenGuide?.classList.remove('visible');
        this.header.style.display = '';
        this.header.style.position = '';
        this.header.style.top = '';
        this.header.style.pointerEvents = '';
        this.header.classList.remove('hidden');
        this.headerVisible = true;

        if (mainContent) {
            mainContent.style.marginLeft = '';
        }

        videoContainer.style.position = '';
        videoContainer.style.top = '';
        videoContainer.style.left = '';
        videoContainer.style.width = '';
        videoContainer.style.height = '';
        videoContainer.style.zIndex = '';
    }

    // Quit Key Functions
    isQuitKeyCombo(event) {
        const modifiersMatch = event.ctrlKey === this.quitKeyCombo.ctrlKey &&
                              event.altKey === this.quitKeyCombo.altKey &&
                              event.shiftKey === this.quitKeyCombo.shiftKey &&
                              event.metaKey === this.quitKeyCombo.metaKey;
        
        // If there's a specific key required, check it using the stored code for accuracy
        if (this.quitKeyCombo.key) {
            // Use event.code for comparison if available, otherwise fall back to event.key
            if (this.quitKeyCombo.code) {
                // Handle the ShiftRight bug in Keyboard Lock API where event.code is empty
                // This is a known issue where ShiftRight reports event.code as '' but event.key as 'Shift'
                let actualEventCode = event.code;
                if (event.code === '' && event.key === 'Shift') {
                    actualEventCode = 'ShiftRight'; // Assume right shift when code is empty but key is Shift
                }
                
                return modifiersMatch && actualEventCode === this.quitKeyCombo.code;
            } else {
                // Legacy support for old saved settings without code
                return modifiersMatch && event.key === this.quitKeyCombo.key;
            }
        }
        
        // For modifier-only combinations, ensure no other keys are pressed
        return modifiersMatch && !event.key.match(/^[a-zA-Z0-9]$/);
    }

    updateQuitKeyDisplay() {
        this.quitKeyDisplay.textContent = 'Shift+Esc';
        
        // Update the control mode notification
        this.updateControlModeNotification();
    }

    updateControlModeNotification() {
        // Update the overlay message with current quit key combination
        // Update the overlay in the mouse capture overlay
        const overlayInfo = this.mouseCaptureOverlay.querySelector('.mouse-capture-info');
        if (overlayInfo) {
            overlayInfo.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 6px;">${this.t('overlayActive')}</div>
                <div style="margin-bottom: 4px;">${this.getControlOverlayHint()}</div>
                <div style="font-size: 11px; opacity: 0.8; margin-bottom: 4px;">${this.t(`targetMode${this.capitalizeMode(this.targetMode)}`)} / ${this.t(`displayMode${this.capitalizeMode(this.displayMode)}`)}</div>
                <div style="font-size: 11px; opacity: 0.7;">${this.t('forwardingActive')}</div>
            `;
        }
    }

    showQuitKeyModal() {
        this.quitKeyModal.style.display = 'flex';
        this.tempQuitKeyCombo = null;
        this.capturedKeys.textContent = 'Press keys...';
        this.confirmQuitKeyBtn.disabled = true;
        this.keyCaptureArea.classList.add('capturing');
        
        // Add key capture listener
        this.quitKeyModalKeyHandler = (e) => this.handleQuitKeyCapture(e);
        document.addEventListener('keydown', this.quitKeyModalKeyHandler);
        document.addEventListener('keyup', this.quitKeyModalKeyHandler);
    }

    hideQuitKeyModal() {
        this.quitKeyModal.style.display = 'none';
        this.keyCaptureArea.classList.remove('capturing');
        
        // Remove key capture listener
        if (this.quitKeyModalKeyHandler) {
            document.removeEventListener('keydown', this.quitKeyModalKeyHandler);
            document.removeEventListener('keyup', this.quitKeyModalKeyHandler);
            this.quitKeyModalKeyHandler = null;
        }
    }

    handleQuitKeyCapture(event) {
        if (event.type === 'keydown') {
            event.preventDefault();
            
            // Check if it's a modifier-only key press
            const isModifierOnly = ['Control', 'Alt', 'Shift', 'Meta'].includes(event.key);
            
            // Handle the ShiftRight bug in Keyboard Lock API where event.code is empty
            // This is a known issue where ShiftRight reports event.code as '' but event.key as 'Shift'
            let actualCode = event.code;
            if (event.code === '' && event.key === 'Shift') {
                actualCode = 'ShiftRight'; // Assume right shift when code is empty but key is Shift
            }
            
            // Use event.code to get the physical key instead of event.key for better display
            // event.code represents the physical key (e.g., 'KeyQ') while event.key represents the character ('œ' when Alt+Q)
            let displayKey = null;
            if (!isModifierOnly) {
                // Convert event.code to a readable key name
                displayKey = this.getDisplayKeyFromCode(actualCode, event.key);
            }
            
            // Capture the key combination
            this.tempQuitKeyCombo = {
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                metaKey: event.metaKey,
                key: displayKey,
                code: actualCode // Store the corrected code for accurate key detection
            };
            
            // Display the captured combination
            const parts = [];
            if (event.ctrlKey) parts.push('Ctrl');
            if (event.altKey) parts.push('Alt');
            if (event.shiftKey) parts.push('Shift');
            if (event.metaKey) parts.push('Meta');
            if (displayKey) parts.push(displayKey.toUpperCase());
            
            this.capturedKeys.textContent = parts.join(' + ') || 'None';
            
            // Enable confirm button if we have at least one modifier or a regular key
            this.confirmQuitKeyBtn.disabled = parts.length === 0;
        }
    }

    confirmQuitKeyChange() {
        if (this.tempQuitKeyCombo) {
            this.quitKeyCombo = this.tempQuitKeyCombo;
            this.updateQuitKeyDisplay();
            this.saveSettings();
            this.hideQuitKeyModal();
        }
    }

    resetQuitKeyToDefault() {
        this.quitKeyCombo = { ctrlKey: false, altKey: false, shiftKey: true, metaKey: false, key: 'Escape', code: 'Escape' };
        this.updateQuitKeyDisplay();
        this.saveSettings();
        this.hideQuitKeyModal();
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KVMClient();
});
