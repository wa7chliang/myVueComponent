<template>
  <div class="animation">
    <transition
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave"
      @after-leave="handleAfterLeave">
      <slot v-if="show"></slot>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    handleBeforeEnter: {
      type: Function,
      default: function (el) {}
    },
    handleEnter: {
      type: Function,
      default: function (el, done) {
        done()
      }
    },
    handleAfterEnter: {
      type: Function,
      default: function (el) {}
    },
    handleBeforeLeave: {
      type: Function,
      default: function (el) {}
    },
    handleLeave: {
      type: Function,
      default: function (el, done) {
        done()
      }
    },
    handleAfterLeave: {
      type: Function,
      default: function (el) {}
    }
  }
}
</script>
