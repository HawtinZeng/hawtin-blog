---
title: '让背景视频播放 Show the background video'
description: 'An overview of the latest innovations in technology'
pubDate: '2025-01-17'
tags: ['Adam V1.0.0']
---

Chrome为了节省性能，假如正在播放中的视频被另外一个窗口挡住了（例如adam窗口会挡住bilibili视频页），视频会变黑。需要关闭chrome的窗口遮蔽效果。操作如下：

In order to save performance, if the video being played is blocked by another window (for example, the Adam window blocks the bilibili video page), the video will turn black. You need to turn off the window shielding effect of Chrome. The operation is as follows:

# Option 3 from this [link](https://www.reddit.com/r/chrome/comments/rxoduk/the_option_calculate_window_occlusion_on_windows/).

![colussion](image.png)

```
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome]
"NativeWindowOcclusionEnabled"=dword:00000000
"WindowOcclusionEnabled"=dword:00000000
```

