<template>
  <div class="security-code" ref="sc_box">
    <Security-code @commitValue="commitValue" @scrollFunc="scrollFunc" class="sc_box" v-model="code" />
  </div>
</template>
<script>
import SecurityCode from '@/components/securityCode/security-code'
export default {
  name: 'securityCode',
  data () {
    return {
      code: ''
    }
  },
  methods: {
    commitValue (type) {
      if (type) {
        console.log('输入完毕')
      }
    },
    scrollFunc () {
      // 使移动端输入框弹上去
      this.$refs.sc_box.scrollIntoViewIfNeeded(true)
      this.$refs.sc_box.scrollIntoView()
    }
  },
  components: {
    SecurityCode
  }
}
</script>
