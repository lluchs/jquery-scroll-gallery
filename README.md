Scroll-Gallery
==============
A vertically scrolling image gallery. See demo.html.

Usage
-----
```html
<div id=scroller>
    <img src="image1.png">
    <img src="image2.png">
    <img src="image3.png">
    <img src="image4.png">
</div>
```

(defaults are given)

```javascript
var scr = $('#scroller').scroller({
  width: 100,              // dimensions of the active image
  height: 50,              // default: dimensions of the first image
  smaller: 0.8,            // factor for calculating dimensions of the other two visible images
  opacity: 0.5,            // opacity of the two smaller images
  duration: 600,           // duration of the scrolling animation
  easing: 'swing',         // jQuery easing function
  scrollTo: function(n) {} // function called when changing the active image
});

// You can scroll manually
scr.down(); // scrolls to the next image below
scr.up();   // scrolls to the next image above

// You can bind two custom events to the images
$('#scroller img').eq(2).on('active', function() {
  // called when the image becomes active
});
$('#scroller img').eq(2).on('inactive', function() {
  // called when the image becomes inactive, i.e. the user scrolls away from the image
});
```
