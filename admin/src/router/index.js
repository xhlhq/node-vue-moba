import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
const Main = () => import(/* webpackChunkName: "Main" */ '../views/Main.vue')
const CategoryEdit = () => import(/* webpackChunkName: "categoryEdit" */ '../views/CategoryEdit.vue')
const CategoryList = () => import(/* webpackChunkName: "categoryList" */ '../views/CategoryList.vue')
const ItemEdit = () => import(/* webpackChunkName: "itemEdit" */ '../views/ItemEdit.vue')
const ItemList = () => import(/* webpackChunkName: "itemList" */ '../views/ItemList.vue')
const HeroEdit = () => import(/* webpackChunkName: "heroEdit" */ '../views/HeroEdit.vue')
const HeroList = () => import(/* webpackChunkName: "heroList" */ '../views/HeroList.vue')
const ArticleEdit = () => import(/* webpackChunkName: "articleEdit" */ '../views/ArticleEdit.vue')
const ArticleList = () => import(/* webpackChunkName: "adList" */ '../views/ArticleList.vue')
const AdEdit = () => import(/* webpackChunkName: "adEdit" */ '../views/AdEdit.vue')
const AdList = () => import(/* webpackChunkName: "articleList" */ '../views/AdList.vue')
const AdminUserEdit = () => import(/* webpackChunkName: "AdminUserEdit" */ '../views/AdminUserEdit.vue')
const AdminUserList = () => import(/* webpackChunkName: "AdminUserList" */ '../views/AdminUserList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',name:'login',component:Login,meta: { isPublic:true }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create',component: CategoryEdit},
      {path: '/categories/edit/:id',component: CategoryEdit,props: true},//如果 props 被设置为 true，route.params 将会被设置为组件属性。
      {path: '/categories/list',component: CategoryList},

      {path: '/items/create',component: ItemEdit},
      {path: '/items/edit/:id',component: ItemEdit,props: true},
      {path: '/items/list',component: ItemList},

      {path: '/heroes/create',component: HeroEdit},
      {path: '/heroes/edit/:id',component: HeroEdit,props: true},
      {path: '/heroes/list',component: HeroList},

      {path: '/articles/create',component: ArticleEdit},
      {path: '/articles/edit/:id',component: ArticleEdit,props: true},
      {path: '/articles/list',component: ArticleList},

      {path: '/ads/create',component: AdEdit},
      {path: '/ads/edit/:id',component: AdEdit,props: true},
      {path: '/ads/list',component: AdList},

      {path: '/admin_users/create',component: AdminUserEdit},
      {path: '/admin_users/edit/:id',component: AdminUserEdit,props: true},
      {path: '/admin_users/list',component: AdminUserList}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //如果不存在isPublick(非公开)且不存在token,则跳转到登录页
  if(!to.meta.isPublic && !localStorage.token){
    next('/login')
  }else{
    next()
  }
})

export default router
