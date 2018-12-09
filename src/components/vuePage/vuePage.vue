<template>
  <div class="page">
    <a @click="pnBtn('prev')" href="javascript:void(0);" class="a prev">上一页</a>
    <div class="page-box">
      <a href="javascript:void(0);" @click="ClickNum(index+1)" :class="{a: true,on: num == index+1,p: num==index+2||num==index+3||num==index||num==index-1,endHead:index == 0 || index == param.count-1,headPage: num >=4&& index == 0, endPage: index == param.count-1&& num <= param.count-4}" v-for="(item, index) in param.count" :key="index">{{ index+1 }}</a>
    </div>
    <a @click="pnBtn('next')" href="javascript:void(0);" class="a next">下一页</a>
    <div class="tips">共{{ num }} / {{ param.count }}页</div>
  </div>
</template>
<script>
export default {
  name: 'page',
  props: {
    param: Object
  },
  data () {
    return {
      num: 1
    }
  },
  methods: {
    ClickNum (num) {
      this.num = num
      this.$emit('getNowCount', num)
    },
    pnBtn (type) {
      if (type === 'prev') {
        if (this.num === 1) {

        } else {
          this.num--
          this.$emit('getNowCount', this.num)
        }
      } else {
        if (this.num === this.param.count) {

        } else {
          this.num++
          this.$emit('getNowCount', this.num)
        }
      }
    }
  }
}
</script>

<style scoped>
  .page {
    overflow: hidden;
    position: relative;
  }
  .page-box {
    position: relative;
    display: inline-block;
  }
  .a {
    display: none;
    width: 40px;
    height: 40px;
    text-decoration: none;
    line-height: 40px;
    cursor: pointer;
    color: #333;
    border: solid 1px #ddd;
    border-radius: 5px;
    margin-right: 4px;
    text-align: center;
    transition: .2s all;
  }
  .a:hover {
    background: #00a1d6;
    color: #fff;
    border-color: #00a1d6;
    transition: .2s all;
  }
  .prev, .next {
    width: 80px;
    height: 40px;
    display: inline-block;
    cursor: pointer;
    border-radius: 6px;
    color: #333;
    border: 1px solid #ddd;
    margin: 0 10px;
  }
  .p {
    display: inline-block;
  }
  .on {
    background: #00a1d6;
    color: #fff;
    display: inline-block;
    border-color: #00a1d6;
  }
  .endHead {
    display: inline-block;
  }
  .headPage {
    margin-right: 40px;
  }
  .endPage {
    margin-left: 40px;
  }
  .headPage::after {
    content: '...';
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 30px;
    position: absolute;
    top: 0;
    left: 43px;
    z-index: 2;
  }
  .endPage::before {
    content: '...';
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 47px;
  }
  .tips {
    display: inline-block;
  }
</style>
