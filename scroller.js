(function() {
  var Scroller;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Scroller = (function() {
    function Scroller(e, opt) {
      var hgt, padding, wdt, _base, _base2, _base3, _base4, _base5, _base6, _base7, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      this.e = e;
      this.opt = opt;
      this.img = this.e.children('img');
      this.active = 0;
      if ((_ref = this.opt) == null) {
        this.opt = {};
      }
      if ((_ref2 = (_base = this.opt).width) == null) {
        _base.width = this.img.width();
      }
      if ((_ref3 = (_base2 = this.opt).height) == null) {
        _base2.height = this.img.height();
      }
      if ((_ref4 = (_base3 = this.opt).smaller) == null) {
        _base3.smaller = 0.8;
      }
      if ((_ref5 = (_base4 = this.opt).opacity) == null) {
        _base4.opacity = 0.5;
      }
      if ((_ref6 = (_base5 = this.opt).duration) == null) {
        _base5.duration = 600;
      }
      if ((_ref7 = (_base6 = this.opt).easing) == null) {
        _base6.easing = 'swing';
      }
      if ((_ref8 = (_base7 = this.opt).scrollTo) == null) {
        _base7.scrollTo = function() {};
      }
      padding = this.opt.width * (1 - this.opt.smaller) / 2;
      wdt = this.opt.width * this.opt.smaller;
      hgt = this.opt.height * this.opt.smaller;
      this.style = {
        upper: {
          top: 0,
          left: padding * this.opt.smaller,
          width: wdt * this.opt.smaller,
          height: hgt * this.opt.smaller,
          opacity: 0,
          zIndex: 1
        },
        up: {
          top: 0,
          left: padding,
          width: wdt,
          height: hgt,
          opacity: this.opt.opacity,
          zIndex: 5
        },
        mid: {
          top: this.opt.height / 2,
          left: 0,
          width: this.opt.width,
          height: this.opt.height,
          opacity: 1,
          zIndex: 10
        },
        low: {
          top: this.opt.height,
          left: padding,
          width: wdt,
          height: hgt,
          opacity: this.opt.opacity,
          zIndex: 5
        },
        lower: {
          top: this.opt.height,
          left: padding * this.opt.smaller,
          width: wdt * this.opt.smaller,
          height: hgt * this.opt.smaller,
          opacity: 0,
          zIndex: 1
        }
      };
      this.e.css({
        position: 'relative',
        width: this.opt.width,
        height: this.opt.height * 2
      });
      this.img.hide().css({
        position: 'absolute'
      });
      this.img.eq(0).show().css(this.style.mid);
      this.img.eq(1).show().css(this.style.low);
      this.bindClick();
      this.opt.scrollTo(0);
      this.img.eq(0).trigger('active');
    }
    Scroller.prototype.down = function() {
      if (this.active === this.img.length - 1) {
        return false;
      }
      this.adjustZ({
        upper: this.getImg(this.active - 1).animate(this.style.upper, this.opt.duration, this.opt.easing, function() {
          return $(this).hide();
        }),
        up: this.getImg(this.active).trigger('inactive').animate(this.style.up, this.opt.duration, this.opt.easing),
        mid: this.getImg(this.active + 1).trigger('active').animate(this.style.mid, this.opt.duration, this.opt.easing),
        low: this.getImg(this.active + 2).css(this.style.lower).show().animate(this.style.low, this.opt.duration, this.opt.easing)
      });
      this.active++;
      this.opt.scrollTo(this.active);
      setTimeout((__bind(function() {
        return this.bindClick();
      }, this)), this.opt.duration);
      return true;
    };
    Scroller.prototype.up = function() {
      if (this.active === 0) {
        return false;
      }
      this.adjustZ({
        up: this.getImg(this.active - 2).css(this.style.upper).show().animate(this.style.up, this.opt.duration, this.opt.easing),
        mid: this.getImg(this.active - 1).trigger('active').animate(this.style.mid, this.opt.duration, this.opt.easing),
        low: this.getImg(this.active).trigger('inactive').animate(this.style.low, this.opt.duration, this.opt.easing),
        lower: this.getImg(this.active + 1).animate(this.style.lower, this.opt.duration, this.opt.easing, function() {
          return $(this).hide();
        })
      });
      this.active--;
      this.opt.scrollTo(this.active);
      setTimeout((__bind(function() {
        return this.bindClick();
      }, this)), this.opt.duration);
      return true;
    };
    Scroller.prototype.getImg = function(n) {
      if (n < 0 || n >= this.img.length) {
        return jQuery();
      } else {
        return this.img.eq(n);
      }
    };
    Scroller.prototype.adjustZ = function(img) {
      return setTimeout(__bind(function() {
        var pos, _i, _len, _ref, _ref2;
        _ref = 'upper up mid low lower'.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pos = _ref[_i];
          if ((_ref2 = img[pos]) != null) {
            _ref2.css({
              zIndex: this.style[pos].zIndex
            });
          }
        }
      }, this), this.opt.duration / 2);
    };
    Scroller.prototype.bindClick = function() {
      this.img.unbind('click');
      this.getImg(this.active - 1).click(__bind(function() {
        return this.up();
      }, this));
      this.getImg(this.active + 1).click(__bind(function() {
        return this.down();
      }, this));
      return true;
    };
    return Scroller;
  })();
  jQuery.fn.scroller = function(opt) {
    return new Scroller(this, opt);
  };
}).call(this);
