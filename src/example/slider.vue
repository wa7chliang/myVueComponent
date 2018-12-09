<template>
  <div>
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="item in recommends" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>
<script>
import Slider from '@/components/slider/slider'
export default {
  name: 'demo',
  data () {
    return {
      recommends: [{
        id: 18957,
        linkUrl: 'http://y.qq.com/m/act/jikedianyin/index.html?openinqqmusic=1&playtarget=music&ADTAG=jiaodiantu&channelID=10032187',
        picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1094690.jpg'
      }, {
        id: 18932,
        linkUrl: 'https://y.qq.com/m/act/voiceofdreams3/index.html?openinqqmusic=1&playtarget=music&ADTAG=jiaodiantu&channelID=10032187',
        picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1094424.jpg'
      }, {
        id: 18969,
        linkUrl: 'https://c.y.qq.com/r/cUL2?ADTAG=jiaodiantu',
        picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1093319.jpg'
      }, {
        id: 18939,
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1_video=true&id=5447180&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1093122.jpg'
      }, {
        id: 18931,
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001rKTHS1sZN5x',
        picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1093903.jpg'

      }]
    }
  },
  components: {
    Slider
  }
}
</script>
