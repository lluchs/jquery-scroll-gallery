# Scroller

class Scroller
  constructor: (@e, @opt) ->
    @img = @e.children 'img'
    @active = 0
    # set standard options
    @opt ?= {}
    @opt.width ?= @img.width()
    @opt.height ?= @img.height()
    @opt.smaller ?= 0.8
    @opt.opacity ?= 0.5
    @opt.duration ?= 600
    @opt.easing ?= 'swing'
    @opt.scrollTo ?= ->

    padding = @opt.width * (1 - @opt.smaller) / 2
    wdt = @opt.width * @opt.smaller
    hgt = @opt.height * @opt.smaller
    @style =
      upper: { top: 0, left: padding * @opt.smaller, width: wdt * @opt.smaller, height: hgt * @opt.smaller, opacity: 0, zIndex: 1 }
      up:    { top: 0, left: padding, width: wdt, height: hgt, opacity: @opt.opacity, zIndex: 5 }
      mid:   { top: @opt.height / 2, left: 0, width: @opt.width, height: @opt.height, opacity: 1, zIndex: 10 }
      low:   { top: @opt.height, left: padding, width: wdt, height: hgt, opacity: @opt.opacity, zIndex: 5 }
      lower: { top: @opt.height, left: padding * @opt.smaller, width: wdt * @opt.smaller, height: hgt * @opt.smaller, opacity: 0, zIndex: 1 }

    @e.css position: 'relative', width: @opt.width, height: @opt.height * 2
    @img.hide().css position: 'absolute'

    @img.eq(0).show().css @style.mid
    @img.eq(1).show().css @style.low
    @bindClick()

  down: ->
    return false if @active is @img.length - 1
    @adjustZ
      upper : @getImg(@active - 1).animate @style.upper, @opt.duration, @opt.easing, -> $(@).hide()
      up    : @getImg(@active).animate @style.up, @opt.duration, @opt.easing
      mid   : @getImg(@active + 1).animate @style.mid, @opt.duration, @opt.easing
      low   : @getImg(@active + 2).css(@style.lower).show().animate @style.low, @opt.duration, @opt.easing
    @active++
    @opt.scrollTo @active
    setTimeout (=> @bindClick()), @opt.duration
    true

  up: ->
    return false if @active is 0
    @adjustZ
      up    : @getImg(@active - 2).css(@style.upper).show().animate @style.up, @opt.duration, @opt.easing
      mid   : @getImg(@active - 1).animate @style.mid, @opt.duration, @opt.easing
      low   : @getImg(@active).animate @style.low, @opt.duration, @opt.easing
      lower : @getImg(@active + 1).animate @style.lower, @opt.duration, @opt.easing, -> $(@).hide()
    @active--
    @opt.scrollTo @active
    setTimeout (=> @bindClick()), @opt.duration
    true

  getImg: (n) ->
    if n < 0 or n >= @img.length
      jQuery()
    else
      @img.eq n

  adjustZ: (img) ->
    setTimeout =>
      img[pos]?.css(zIndex: @style[pos].zIndex) for pos in 'upper up mid low lower'.split ' '
      return
    , @opt.duration / 2

  bindClick: ->
    @img.unbind 'click'
    @getImg(@active - 1).click => @up()
    @getImg(@active + 1).click => @down()
    true

jQuery.fn.scroller = (opt) ->
  new Scroller this, opt
