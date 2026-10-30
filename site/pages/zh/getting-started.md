---
title: "下载与开始"
description: "在主控端安装 OSRBOT Link；被控端无需安装配套软件，须支持 USB 键盘和鼠标输入。"
---

# 下载与开始

在主控端安装 OSRBOT Link；被控端无需安装配套软件，须支持 USB 键盘和鼠标输入。

## OSRBOT Link 软件下载

打开发布页，按主控端的系统与处理器选择对应软件包。

-   <strong>Windows</strong>：选择安装版或便携版。
-   <strong>macOS</strong>：区分 Apple Silicon 与 Intel。
-   <strong>Ubuntu</strong>：选择对应的 DEB 或 AppImage。

[打开软件下载页](https://github.com/osrbot/osrbot-link/releases)

下载不便、找不到对应安装包，或需要设备选型与配套支持时，请联系销售；也可邮件联系 [winter@osrbot.com](mailto:winter@osrbot.com)。

## 按图连接设备 {#connection}

### A · 先接共享器，使用键盘和鼠标

<figure class="wiring-image"><img src="/manual/document-wiring-control.png" alt="先接共享器，使用键盘和鼠标" loading="lazy"><figcaption>必需连接 · 蓝色箭头表示键鼠输入方向</figcaption></figure>

### B · 需要查看画面时，再接采集卡

<figure class="wiring-image"><img src="/manual/document-wiring-video.png" alt="需要查看画面时，再接采集卡" loading="lazy"><figcaption>可选连接 · 深色箭头表示视频回传方向</figcaption></figure>

以 HDMI 采集卡为例。仅使用键鼠共享时，完成 A 即可；需要画面时，再增加 B。

1.  <strong>接好共享器</strong>

    将共享器 USB-A 插头插入主控端，用随附 USB-A 对 USB-A 数据线连接<strong>接口 4</strong>与被控端。需要查看屏幕时，再按图接入采集卡。

2.  <strong>连接键鼠共享</strong>

    打开 OSRBOT Link，在左侧“键鼠共享”中刷新设备列表，选择 OSRBOT HID，点击“连接”。确认状态显示“已连接”。

3.  <strong>开启画面预览 <span class="optional">（使用采集卡时）</span></strong>

    在左侧“视频采集”中选择采集卡，通过“采集参数”选择分辨率与帧率，点击“开始视频”。仅使用键鼠共享时可跳过。

4.  <strong>点击工作区开始控制</strong>

    点击画面或空白工作区，即可使用主控端的键盘和鼠标操作被控端。


<kbd>Shift + Esc</kbd>：<b>退出控制，键鼠回到主控端。</b><br>
同时退出全屏；继续操作被控端时，再次点击工作区。

## 首次使用的系统权限

<dl class="guide-definitions"><div><dt>Windows</dt><dd>视频预览需要摄像头访问权限；配置网络共享时按系统提示授权。</dd></div><div><dt>macOS</dt><dd>允许摄像头访问以使用采集卡；转发系统快捷键另需辅助功能权限。</dd></div><div><dt>Ubuntu</dt><dd>HID 无访问权限时，在“设置 → 输入与快捷键”修复 Linux HID 权限，授权后重新连接。</dd></div></dl>
