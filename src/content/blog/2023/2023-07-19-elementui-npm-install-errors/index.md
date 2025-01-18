---
title: "ElementUI npm install errors"
description: 'An overview of the latest innovations in technology'
pubDate: '2023-07-19'
---

 Why: node-sass@4 isn't compatable with NodeV16, so I changed node-sass to V6, then I run nr dev:play, ERROR:node-sass...

  

I found this blog:https://blog.csdn.net/qq\_42389120/article/details/126544241, It says that we should use node v14...

  

After one-day's searching and trying, I tested all solutions in the Internet, no solutions worked, but I known that node-sass caused my problem , then I try to downgrade my Node version to V11(based on [node-sass README](https://github.com/sass/node-sass)) instead of upgrade node-sass(@4.11.0) to a higher one.

[![](https://blogger.googleusercontent.com/img/a/AVvXsEhwk1rtrXeecI3Sd8Yg6zD7cVr9adSwXHe9Phj-HW_ugyYpaBwTyvAJk4yhUdWk99JX4saF9_dh9QWULoK6c4o7UXZPMHHX-4KJ3rtHAkSX0twdI-V4MrXIRVmcFnyc019S35ABdgEFVGEOT7c9zqnZ0Rjt5HrJAUHNAeKhlvi0tKYHPR3v2XdLqp6D9rY=w648-h118)](https://blogger.googleusercontent.com/img/a/AVvXsEhwk1rtrXeecI3Sd8Yg6zD7cVr9adSwXHe9Phj-HW_ugyYpaBwTyvAJk4yhUdWk99JX4saF9_dh9QWULoK6c4o7UXZPMHHX-4KJ3rtHAkSX0twdI-V4MrXIRVmcFnyc019S35ABdgEFVGEOT7c9zqnZ0Rjt5HrJAUHNAeKhlvi0tKYHPR3v2XdLqp6D9rY)

  
  

**Follow authors' package versions!!!**
