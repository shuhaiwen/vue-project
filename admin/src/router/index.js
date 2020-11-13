/*
 * @Author: your name
 * @Date: 2020-07-15 10:11:10
 * @LastEditTime: 2020-07-30 14:56:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\router\index.js
 */ 
import Vue from "vue";
import VueRouter from "vue-router";
import LayOut from '../Layout'
Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: ()=>import('../views/Login.vue'),
    meta: {
      noRequiredAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
   path:'/',
   name:'LayOut',
   component: LayOut,
   // 重定向将主页默认显示为/Chart
   redirect:'/Chart',
   children:[
     {
       path:'Chart',
       component:()=>import('../components/charts/index.vue')
     },
     {
      path:'Table',
      component:()=>import('../components/Tables/Table.vue')
     }
   ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//? 路由守卫
//! 坑1:路由死循环，页面空白 原因:没有判断当前路由是否为不需导航路由
router.beforeEach((to, from, next) => {
//一定要判断是否为登录路由，是登录路由则next(),否则next('/'),不然会进入死循环
// Storage api
// Storage.key()
// 该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。
// Storage.getItem()
// 该方法接受一个键名作为参数，返回键名对应的值。
// Storage.setItem()
// 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
// Storage.removeItem()
// 该方法接受一个键名作为参数，并把该键名从存储中删除。
// Storage.clear()
// 调用该方法会清空存储中的所有键名。
console.log('user-info'+sessionStorage.getItem('user-info'))
 if (to.name!=='Login'&&!sessionStorage.getItem('user-info')) {
  console.log("start")
   return next('/Login')
  }
 return next()
})
export default router;
