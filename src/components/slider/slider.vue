<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  methods: {
    addClass (el, className) {
      if (this.hasClass(el, className)) {
        return
      }
      let newClass = el.className.split(' ')
      newClass.push(className)
      el.className = newClass.join(' ')
    },
    hasClass (el, className) {
      let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // 判断className前后是否有空白字符
      return reg.test(el.className)
    },
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children // 获取多少个子元素

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth // 获取父容器的width
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        this.addClass(child, 'slider-item') // 给每一个元素增加一个slider-item类
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: true
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next(400)
      }, this.interval)
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20) // 浏览器刷新时间为17毫秒

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  }
}
</script>
<style scoped>
  .slider {
    position: relative;
    min-height: 1px;
    overflow: hidden;
  }
  .slider .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
  .slider .slider-group .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .slider .slider-group .slider-item a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  .slider .slider-group .slider-item img {
    display: block;
    width: 100%;
  }
  .slider .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }
  .slider .dots .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }
  .slider .dots .active {
    width: 20px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
  }
</style>
