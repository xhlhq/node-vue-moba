import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import(/* webpackChunkName: "main" */'@/views/Main/Main.vue')
const Home = () => import(/* webpackChunkName: "home" */'@/views/Home/Home.vue')
const Article = () => import(/* webpackChunkName: "article" */'@/views/Article/Article.vue')
const Hero = () => import(/* webpackChunkName: "hero" */'@/views/Hero/Hero.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/',name: 'home',component: Home},
      {path: '/articles/:id',name: 'articles',component: Article,props: true,},
    ]
  },
  {path: '/hero/:id',name: 'hero',component: Hero,props: true,},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
