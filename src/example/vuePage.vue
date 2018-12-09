<template>
  <div class="hello">
    <vue-page @getNowCount="getNum" :param = "datas"></vue-page>
  </div>
</template>

<script>
import VuePage from '@/components/vuePage/vuePage'
export default {
  name: 'HelloWorld',
  data () {
    return {
      datas: {
        count: 10
      }
    }
  },
  components: {
    VuePage
  },
  methods: {
    getNum (num) {
      console.log(num)
    }
  }
}
</script>
