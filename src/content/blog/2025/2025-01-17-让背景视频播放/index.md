---
title: '让背景视频播放 Let the background'
description: 'An overview of the latest innovations in technology'
pubDate: '2025-01-17'
heroImage: '/blog-placeholder-3.jpg'
---

Chrome为了节省性能，假如正在播放中的视频被另外一个窗口挡住了（例如adam窗口会挡住bilibili视频页），视频会变黑。需要关闭chrome的窗口遮蔽效果。操作如下：

In order to save performance, if the video being played is blocked by another window (for example, the Adam window blocks the bilibili video page), the video will turn black. You need to turn off the window shielding effect of Chrome. The operation is as follows:

# Option 3 from this [link](https://www.reddit.com/r/chrome/comments/rxoduk/the_option_calculate_window_occlusion_on_windows/).

This will require editing registry

- Open Registry Editor

- Navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome`
    - if there are keys (folders) missing, just create a new key

- Under `Chrome` key add new DWORD with name `NativeWindowOcclusionEnabled` and value `0`

- Create a second one with name `WindowOcclusionEnabled` and value `0`

Or copy the following into a new Notepad document, save with a `.reg` extension and run

```
Windows Registry Editor Version 5.00[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome]"NativeWindowOcclusionEnabled"=dword:00000000"WindowOcclusionEnabled"=dword:00000000
```
