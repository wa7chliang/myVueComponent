# vue-page
做项目时写的一个vue的简单分页组件

### 图片展示：
![pageImg.png](https://github.com/wa7chliang/vue-page/blob/master/static/img/pageImg.png)

### 例子演示：

#### 安装依赖
```
npm install
```
#### 运行
```
npm run dev
```

打开http://localhost:8080

### 使用：
使用src/components/page.vue文件

:param = "[objdata]" 
objdata: {
  count: 总页数
}

@getNowCount = "methods function"
methods function(num) {
  //num为点击的第几页
}
