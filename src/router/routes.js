import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import ProductDetail from '../views/ProductDetail.vue'

export const routes= [
    {
      path: '/',
      name: 'home',
      component: Home,
      display:'Home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      display:'hide'
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      display:'Admin'
    },
    {
      path: '/admin/product/:id',
      name: 'productDetail',
      component: ProductDetail,
      display:'hide'
    }
  ]