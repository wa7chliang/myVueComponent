<!-- time-sheet -->
<template>
  <div class="time-sheet">
    <div class="time-sheet-header oh">
      <div class="fl corner">星期/时间</div>
      <div class="fl time">
        <div class="oh">
          <div class="fl time-title">00:00-12:00</div>
          <div class="fl time-title">12:00-24:00</div>
        </div>
        <ul class="time-num oh">
          <li class="fl time-num-item" v-for="(time, timeI) in time" :key="timeI">{{time}}</li>
        </ul>
      </div>
    </div>
    <div class="box-mask" ref="boxMask"></div>
    <div class="content oh">
      <ul class="week fl">
        <li class="week-item" v-for="(week, weekI) in week" :key="weekI">{{week}}</li>
      </ul>
      <ul class="box fl" ref="box" @mousedown="drag">
        <li
          :class="{ 'active': box.isActive === 1}"
          v-for="(box, boxi) in box"
          :key="boxi"
          :data-row="box.row"
          :data-col="box.col"
          class="box-item"
          ref="boxItem"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeSheet',
  data () {
    return {
      week: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ],
      time: new Array(24).fill().map((v, i) => { return i }),
      box: [],
      firstBoxStatus: true,
      startPoint: {}
    }
  },
  props: {
    value: {
      type: String
    },
    disable: {
      type: Object
    }
  },
  created () {
    this.init()
  },
  watch: {
    value (val) {
      if (val) {
        const weekLength = this.week.length
        const timeLength = this.time.length * 2
        const boxVal = []

        for (let j = 0; j < weekLength; j += 1) {
          for (let i = 0; i < timeLength; i += 1) {
            boxVal.push({
              row: j + 1,
              col: i + 1,
              isActive: 0
            })
          }
        }

        const dataArr = val.split('')

        dataArr.forEach((el, index) => {
          boxVal[index].isActive = el - 0
        })

        this.box = boxVal
      }
    }
  },
  methods: {
    init () {
      const weekLength = this.week.length
      const timeLength = this.time.length * 2
      const boxVal = []
      for (let j = 0; j < weekLength; j += 1) {
        for (let i = 0; i < timeLength; i += 1) {
          boxVal.push({
            row: j + 1,
            col: i + 1,
            isActive: 0
          })
        }
      }
      this.box = boxVal
    },
    drag (e) {
      const evt = e || window.event
      const { row } = evt.target.dataset
      const { col } = evt.target.dataset
      const mask = this.$refs.boxMask
      this.startPoint = this.getClientPosition(evt.target)

      mask.removeAttribute('style')
      mask.style.display = 'block'
      mask.style.top = `${this.startPoint.y}px`
      mask.style.left = `${this.startPoint.y}px`

      if (evt.target.className.indexOf('active') === -1) {
        // 判断点击的首个元素，是否被激活
        this.firstBoxStatus = true
      } else {
        this.firstBoxStatus = false
      }

      if (row && col) {
        // 获取从第几行，第几列开始
        this.startPoint.startRow = row * 1
        this.startPoint.startCol = col * 1
      }

      this.$refs.box.addEventListener('mousemove', this.moveHandler, true)
      this.$refs.box.addEventListener('mouseup', this.upHandler, true)
    },
    moveHandler (e) {
      const evt = e || window.event
      const mask = this.$refs.boxMask
      const curLi = document.elementFromPoint(evt.clientX, evt.clientY) // 获取当前鼠标所在位置的元素
      const curPoint = this.getClientPosition(curLi, !0)

      if (this.startPoint.x) {
        const xSpacing = curPoint.x - this.startPoint.x // X轴的距离
        const ySpacing = curPoint.y - this.startPoint.y // Y轴的距离

        // 以下的数字，根据激活元素的宽高决定
        const maskTop = ySpacing > 0 ? this.startPoint.y : curPoint.y - 35
        const maskLeft = xSpacing > 0 ? this.startPoint.x : curPoint.x - 13
        const maskWidth = xSpacing > 0 ? Math.abs(xSpacing) : Math.abs(xSpacing) + 26
        const maskHeight = ySpacing > 0 ? Math.abs(ySpacing) : Math.abs(ySpacing) + 70

        mask.style.left = `${maskLeft}px`
        mask.style.top = `${maskTop}px`
        mask.style.width = `${maskWidth}px`
        mask.style.height = `${maskHeight}px`
      }
    },
    upHandler (e) {
      const evt = e || window.event
      const { row } = evt.target.dataset
      const { col } = evt.target.dataset
      let endRow = 1
      let endCol = 1

      if (row && col) {
        // 获取结束时的第几行第几列
        endRow = row * 1
        endCol = col * 1
      }

      this.$refs.box.removeEventListener('mousemove', this.moveHandler, true)
      this.$refs.box.removeEventListener('mouseup', this.upHandler, true)

      this.$refs.boxMask.style.display = 'none'

      // 获取 起始 和 结束时 的第几行和第几列
      const minRow = Math.min(this.startPoint.startRow, endRow)
      const maxRow = Math.max(this.startPoint.startRow, endRow)
      const minCol = Math.min(this.startPoint.startCol, endCol)
      const maxCol = Math.max(this.startPoint.startCol, endCol)
      let result = ''

      if (minRow !== maxRow || minCol !== maxCol) {
        // 编辑选择中的元素
        this.box.forEach((item) => {
          const el = item
          if (
            el.row <= maxRow &&
            el.row >= minRow &&
            el.col <= maxCol &&
            el.col >= minCol
          ) {
            if (this.firstBoxStatus) {
              el.isActive = 1
            } else {
              el.isActive = 0
            }
          }
          result = `${result}${el.isActive}`
        })
      }

      this.$emit('input', result)
      this.cleanEvent(e)
    },
    cleanEvent (e) {
      if (e.stopPropagation) {
        e.stopPropagation()
      } else {
        e.cancelBubble = true
      }
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
    },
    getClientPosition (el, flag) {
      // 获取元素的坐标信息 getBoundingClientRect() 为原生 api
      // flag为false 则返回左上角坐标，为 true 则返回右下角坐标
      const elRect = el.getBoundingClientRect()
      return {
        x: elRect.left + (flag ? elRect.width : 0),
        y: elRect.top + (flag ? elRect.height : 0)
      }
    }
  }
}
</script>

<style scoped>
.oh {
  overflow: hidden;
}
.fl {
  float: left;
}
li{
  list-style: none;
}
.time-sheet {
  display: inline-block;
  position: relative;
  margin-top: 10px;
  border: 1px solid #eee;
  background: #fafafa;
  color: #555;
  text-align: center;
  font-size: 15px;
  box-sizing: border-box;
}
.time-sheet-header {
  box-sizing: border-box;
}
.time-sheet-header .corner {
  width: 82px;
  line-height: 70px;
}
.time-sheet-header .time-title {
  height: 35px;
  width: 312px;
  line-height: 34px;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  box-sizing: border-box;
}
.time-sheet-header .time-num-item {
  width: 26px;
  line-height: 35px;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}
.time-sheet .week {
  width: 82px;
  line-height: 35px;
}
.time-sheet .week-item {
  height: 35px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
}
.time-sheet .box {
  position: relative;
  width: 624px;
  height: 100%;
  overflow: hidden;
}
.time-sheet .box-item {
  float: left;
  width: 13px;
  height: 35px;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  background-color: #fff;
  user-select: none;
  box-sizing: border-box;
}
.time-sheet .box .active {
  background-color: #1ba3f4;
}
.time-sheet .box-item:hover {
  background-color: #f2f2f2;
}
.time-sheet .box-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1ba3f4;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}
</style>
