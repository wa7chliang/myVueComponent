import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vuePage',
      name: 'vuePage',
      component: (resolve) => require(['@/example/vuePage'], resolve)
    },
    {
      path: '/slider',
      name: 'slider',
      component: (resolve) => require(['@/example/slider'], resolve)
    },
    {
      path: '/animation',
      name: 'animation',
      component: (resolve) => require(['@/example/animation'], resolve)
    },
    {
      path: '/timeSheet',
      name: 'timeSheet',
      component: (resolve) => require(['@/example/timeSheet'], resolve)
    },
    {
      path: '/securityCode',
      name: 'securityCode',
      component: (resolve) => require(['@/example/securityCode'], resolve)
    }
  ]
})
