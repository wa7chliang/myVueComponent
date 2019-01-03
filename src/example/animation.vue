<template>
  <div class="animation">
    <animation
      :show="show"
      :handleBeforeEnter="handleBeforeEnter"
      :handleEnter="handleEnter"
      :handleBeforeLeave="handleBeforeLeave"
      :handleLeave="handleLeave"
      >
      <div style="font-size: 50px;">hello world</div>
    </animation>
    <button @click="showBtn">点击</button>
  </div>
</template>
<script>
import animation from '@/components/animation/animation'
import Velocity from 'velocity-animate'
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    showBtn () {
      this.show = !this.show
    },
    handleBeforeEnter (el) {
      if (this.show) {
        el.style.opacity = 0
      }
    },
    handleEnter (el, done) {
      Velocity(el, {opacity: 1}, {duration: 2000, complete: done})
    },
    handleBeforeLeave (el) {
      if (!this.show) {
        el.style.opacity = 1
      }
    },
    handleLeave (el, done) {
      Velocity(el, {opacity: 0}, {duration: 2000, complete: done})
    }
  },
  components: {
    animation
  }
}
</script>
