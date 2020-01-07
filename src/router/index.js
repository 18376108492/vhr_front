import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Test01 from "../views/Test01.vue";
import Test02 from "../views/Test02.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden:true
  },
  {
    path: '/home',
    name: '选项',
    component: Home,
    children:[
      {
        path: '/test01',
        name: '选项一',
        component: Test01
      },{
        path: '/test02',
        name: '选项二',
        component: Test02
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
