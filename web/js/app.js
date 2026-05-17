// OSRBOT Console v1.0 — 纯键鼠共享器（无采集卡）
const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    // ─── 状态 ───
    const backendConnected = ref(false);
    const connected = ref(false);
    const deviceOnline = ref(false);
    const scanning = ref(false);
    const keyCaptureActive = ref(false);
    const activeDialog = ref('');
    const statusMsg = ref('');
    const statusClass = ref('info');
    const statusIcon = ref('fa-circle-info');
    const targetPort = ref(0);
    const pasteText = ref('');
    const lanURL = ref('');

    // 鼠标（无画面，用屏幕坐标映射到 0-32767 绝对坐标）
    const MOUSE_MAX = 0x7FFF;
    const mouseDisplayX = ref(0);
    const mouseDisplayY = ref(0);
    let absX = MOUSE_MAX / 2, absY = MOUSE_MAX / 2;
    let mouseButtons = 0;
    let mouseDirty = false;
    let mouseTimer = null;
    let controlAreaWidth = 1920;
    let controlAreaHeight = 1080;

    // 键盘
    let activeModifiers = 0;
    let activeKeys = [];
    let lastKeyCode = 0;

    // WebSocket
    let ws = null;
    const WS_URL = `ws://${location.host}/ws`;

    // ─── 工具 ───
    function setStatus(msg, cls = 'info') {
      statusMsg.value = msg;
      statusClass.value = cls;
      const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-circle-info' };
      statusIcon.value = icons[cls] || 'fa-circle-info';
    }

    function cleanup() {
      if (mouseTimer) { clearInterval(mouseTimer); mouseTimer = null; }
      if (ws) { if (ws.readyState <= 1) ws.close(); ws = null; }
    }

    // ─── 连接后端 ───
    async function connectBackend() {
      scanning.value = true;
      setStatus('正在连接 OSRBOT 后端...', 'info');

      try {
        const res = await fetch('/api/devices');
        if (!res.ok) throw new Error('后端无响应');
        const devices = await res.json();
        if (devices.length === 0) {
          setStatus('未检测到 OSRBOT 设备', 'error');
          scanning.value = false;
          return;
        }

        ws = new WebSocket(WS_URL);
        await new Promise((resolve, reject) => {
          ws.onopen = resolve;
          ws.onerror = () => reject(new Error('WebSocket 连接失败'));
          setTimeout(() => reject(new Error('连接超时')), 5000);
        });
        ws.onmessage = handleWSMessage;
        ws.onclose = () => { deviceOnline.value = false; };

        backendConnected.value = true;
        scanning.value = false;
        ws.send(JSON.stringify({ type: 'open_device', payload: {} }));

        // 获取局域网地址
        try {
          const infoRes = await fetch('/api/info');
          const info = await infoRes.json();
          lanURL.value = info.lanURL || '';
        } catch (e) { /* ignore */ }

        // 更新控制区域尺寸
        updateControlAreaSize();

      } catch (e) {
        setStatus('连接失败: ' + e.message, 'error');
        scanning.value = false;
      }
    }

    function updateControlAreaSize() {
      const el = document.querySelector('.control-area');
      if (el) {
        controlAreaWidth = el.clientWidth || 1920;
        controlAreaHeight = el.clientHeight || 1080;
      }
    }

    // ─── WebSocket ───
    function handleWSMessage(event) {
      try {
        const msg = JSON.parse(event.data);
        const p = msg.payload || {};
        switch (msg.type) {
          case 'connected':
            setStatus('已连接 OSRBOT 后端', 'success');
            break;
          case 'device_status':
            if (p.status === 'connected') {
              deviceOnline.value = true;
              connected.value = true;
              setStatus('OSRBOT 设备就绪', 'success');
              startMouseLoop();
            } else if (p.status === 'error') {
              setStatus('设备错误: ' + (p.error || '未知'), 'error');
            }
            break;
          case 'usb_status':
            targetPort.value = p.target;
            break;
        }
      } catch (e) { /* ignore */ }
    }

    // ─── 鼠标循环 ───
    function startMouseLoop() {
      if (mouseTimer) clearInterval(mouseTimer);
      mouseTimer = setInterval(() => {
        if (mouseDirty && deviceOnline.value && keyCaptureActive.value && ws?.readyState === 1) {
          ws.send(JSON.stringify({ type: 'mouse', payload: { buttons: mouseButtons, x: absX, y: absY, wheel: 0 } }));
          mouseDirty = false;
        }
      }, 30);
    }

    // ─── 鼠标事件 ───
    function onMouseMove(evt) {
      if (!keyCaptureActive.value || !deviceOnline.value) return;
      const rect = evt.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(evt.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(evt.clientY - rect.top, rect.height));
      absX = Math.round((x / rect.width) * MOUSE_MAX);
      absY = Math.round((y / rect.height) * MOUSE_MAX);
      mouseDisplayX.value = absX;
      mouseDisplayY.value = absY;
      mouseDirty = true;
    }

    const BTN = { 0: 1, 1: 4, 2: 2 };

    function sendMouse(buttons, x, y, wheel = 0) {
      if (!ws || ws.readyState !== 1) return;
      ws.send(JSON.stringify({ type: 'mouse', payload: { buttons, x, y, wheel } }));
    }

    function onMouseDown(evt) {
      if (!keyCaptureActive.value) return;
      evt.preventDefault();
      const btn = BTN[evt.button] || 0;
      if (btn) { mouseButtons |= btn; sendMouse(mouseButtons, absX, absY); }
    }

    function onMouseUp(evt) {
      if (!keyCaptureActive.value) return;
      evt.preventDefault();
      const btn = BTN[evt.button] || 0;
      if (btn) { mouseButtons &= ~btn; sendMouse(mouseButtons, absX, absY); }
    }

    function onMouseWheel(evt) {
      if (!keyCaptureActive.value || !deviceOnline.value) return;
      const delta = Math.round(evt.deltaY / 40);
      sendMouse(mouseButtons, absX, absY, delta);
    }

    // ─── 键盘 ───
    const MOD = { ShiftLeft:1, ShiftRight:1, ControlLeft:2, ControlRight:2, AltLeft:4, AltRight:4, MetaLeft:8, MetaRight:8 };

    function onKeyDown(evt) {
      if (activeDialog.value) return;

      if (!keyCaptureActive.value) {
        if (evt.key === 'Enter') { activateCapture(); evt.preventDefault(); }
        return;
      }

      if (evt.key === 'Escape' && evt.shiftKey) {
        deactivateCapture(); evt.preventDefault();
        return;
      }

      if (!keyCaptureActive.value) return;
      evt.preventDefault();
      if (evt.repeat) return;

      if (evt.code in MOD) {
        activeModifiers |= MOD[evt.code];
        sendKeyboard();
        return;
      }

      const code = keyToHid(evt.key);
      if (code && !activeKeys.includes(code)) {
        activeKeys.push(code);
        sendKeyboard();
      }
    }

    function onKeyUp(evt) {
      if (!keyCaptureActive.value) return;
      if (evt.code in MOD) {
        activeModifiers &= ~MOD[evt.code];
        sendKeyboard();
        return;
      }
      const code = keyToHid(evt.key);
      if (code) {
        const idx = activeKeys.indexOf(code);
        if (idx !== -1) { activeKeys.splice(idx, 1); sendKeyboard(); }
      }
    }

    function sendKeyboard() {
      if (!ws || ws.readyState !== 1) return;
      ws.send(JSON.stringify({ type: 'keyboard', payload: { modifier: activeModifiers, keyCodes: activeKeys } }));
    }

    function releaseAllKeys() {
      activeModifiers = 0; activeKeys = [];
      sendKeyboard();
    }

    // ─── 激活/释放 ───
    function activateCapture() {
      if (!deviceOnline.value) return;
      keyCaptureActive.value = true;
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      updateControlAreaSize();
    }

    function deactivateCapture() {
      keyCaptureActive.value = false;
      releaseAllKeys();
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    }

    // ─── HID 映射 ───
    const HID = {
      'a':4,'b':5,'c':6,'d':7,'e':8,'f':9,'g':10,'h':11,'i':12,'j':13,
      'k':14,'l':15,'m':16,'n':17,'o':18,'p':19,'q':20,'r':21,'s':22,
      't':23,'u':24,'v':25,'w':26,'x':27,'y':28,'z':29,
      '1':30,'2':31,'3':32,'4':33,'5':34,'6':35,'7':36,'8':37,'9':38,'0':39,
      'Enter':40,'Escape':41,'Backspace':42,'Tab':43,' ':44,
      '-':45,'=':46,'[':47,']':48,'\\':49,'#':50,';':51,"'":52,'`':53,
      ',':54,'.':55,'/':56,'CapsLock':57,
      'F1':58,'F2':59,'F3':60,'F4':61,'F5':62,'F6':63,'F7':64,'F8':65,
      'F9':66,'F10':67,'F11':68,'F12':69,
      'PrintScreen':70,'ScrollLock':71,'Pause':72,'Insert':73,'Home':74,
      'PageUp':75,'Delete':76,'End':77,'PageDown':78,
      'ArrowRight':79,'ArrowLeft':80,'ArrowDown':81,'ArrowUp':82,
    };

    function keyToHid(key) {
      const lower = key.toLowerCase();
      return HID[key] || HID[lower] || 0;
    }

    // ─── USB ───
    function switchUsb(port) {
      if (!ws || ws.readyState !== 1) return;
      ws.send(JSON.stringify({ type: 'usb_switch', payload: { port } }));
      targetPort.value = port;
    }

    // ─── 复位 ───
    function resetDevice() {
      if (!ws || ws.readyState !== 1) return;
      ws.send(JSON.stringify({ type: 'reset_hid', payload: {} }));
      setStatus('设备已复位', 'info');
    }

    // ─── 断开 ───
    function disconnect() {
      releaseAllKeys();
      deactivateCapture();
      cleanup();
      backendConnected.value = false;
      connected.value = false;
      deviceOnline.value = false;
      setStatus('');
    }

    // ─── 粘贴 ───
    function doPaste() {
      if (!pasteText.value || !ws || ws.readyState !== 1) return;
      const chars = pasteText.value.split('');
      let i = 0;
      function next() {
        if (i >= chars.length) { pasteText.value = ''; activeDialog.value = ''; return; }
        const ch = chars[i++];
        const code = keyToHid(ch);
        if (code) {
          const isUpper = ch >= 'A' && ch <= 'Z' || '~!@#$%^&*()_+{}|:"<>?'.includes(ch);
          ws.send(JSON.stringify({ type: 'keyboard', payload: { modifier: isUpper ? 2 : 0, keyCodes: [code] } }));
          setTimeout(() => {
            ws.send(JSON.stringify({ type: 'keyboard', payload: { modifier: 0, keyCodes: [] } }));
            setTimeout(next, 20);
          }, 15);
        } else { setTimeout(next, 5); }
      }
      next();
    }

    // ─── 对话框 ───
    function toggleDialog(name) {
      activeDialog.value = activeDialog.value === name ? '' : name;
    }

    // ─── 生命期 ───
    onMounted(() => {
      window.addEventListener('resize', updateControlAreaSize);
    });

    onUnmounted(() => {
      cleanup();
      deactivateCapture();
      window.removeEventListener('resize', updateControlAreaSize);
    });

    return {
      backendConnected, connected, deviceOnline, scanning,
      keyCaptureActive, activeDialog,
      statusMsg, statusClass, statusIcon,
      targetPort, pasteText, lanURL,
      mouseDisplayX, mouseDisplayY,
      connectBackend,
      onMouseMove, onMouseDown, onMouseUp, onMouseWheel,
      activateCapture, deactivateCapture,
      switchUsb, resetDevice, disconnect, doPaste,
      toggleDialog,
    };
  }
}).mount('#app');
