---
title: "CSS"
description: 'An overview of the latest innovations in technology'
pubDate: '2023-08-06'
heroImage: '/blog-placeholder-3.jpg'
---

CSS is used to lay out and decorate HTML files, its content is complicated, and I will record all interesting features related CSS in this blog.

#### Display:

**grid/flex/inline/inline-block**

**3 Positioning Schema in css**

- Normal flow
- Float
- Absolute

  

### Understanding float in CSS

- Float will make the item float out of normal flow, make this item have no height(**ITS WIDTH STILL EXISTS**), which will influence the position of the after element.and its container won’t calculate the height of floated element, which results in less height size as we expe
- So, we need the height px of floated element, we should use psudo class to clear float problem.

  

Ref:

[http://www.vanseodesign.com/css/understanding-css-floats/](http://www.vanseodesign.com/css/understanding-css-floats/)

[http://www.w3.org/TR/CSS2/visuren.html#positioning-scheme](http://www.w3.org/TR/CSS2/visuren.html#positioning-scheme)
