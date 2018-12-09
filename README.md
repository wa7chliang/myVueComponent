# vue-page
做项目时写的一个vue的简单分页组件

### 图片展示：
![pageImg.png](https://github.com/wa7chliang/vue-page/blob/master/static/img/pageImg.png)

### 例子演示：

#### 安装依赖
```
yarn install
```
#### 运行
```
yarn run dev
```

打开http://localhost:8080

### 使用：
使用src/components/vuePage/vuePage.vue文件

:param = "[objdata]" 
objdata: {
  count: 总页数
}

@getNowCount = "methods function"
methods function(num) {
  //num为点击的第几页
}

# slider
这是一个使用better-scroll做的轮播图组件

### 使用：
使用src/components/slider/slider.vue文件

:loop = Boolean 默认:true  是否无缝滚动
:autoPlay = Boolean 默认:true 是否自动滚动
:interval = Number  默认:4000 滚动间隔
