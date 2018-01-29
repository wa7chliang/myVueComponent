<template>
  <div class="hello">
    <vue-page @getNowCount="getNum" :param = "datas"></vue-page>
  </div>
</template>

<script>
import VuePage from '@/components/page'
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
    getNum(num) {
      console.log(num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

