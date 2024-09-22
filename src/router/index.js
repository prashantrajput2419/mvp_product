import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import ProductView from '@/components/ProductView'
import Orders from '@/components/Orders'
import OrdersDetail from '@/components/OrdersDetail'
import ProductDetail from '@/components/ProductDetail'
import Cart from '@/components/Cart'

// admin panal
import AdminLogin from '@/components/admin/AdminLogin'
import AdminMain from '@/components/admin/AdminMain'
import AdminProduct from '@/components/admin/AdminProduct'
import AddProduct from '@/components/admin/AddProduct'
import AdminOrders from '@/components/admin/AdminOrders'
import AdminOrderDetail from '@/components/admin/AdminOrderDetail'
import AdminCategory from '@/components/admin/AdminCategory'

// kitchen panal
import KitchenLogin from '@/components/kitchen/AdminLogin'
import KitchenMain from '@/components/kitchen/AdminMain'
import KitchenProduct from '@/components/kitchen/AdminProduct'
import KitchenAddProduct from '@/components/kitchen/AddProduct'
import KitchenOrders from '@/components/kitchen/AdminOrders'
import KitchenOrderDetail from '@/components/kitchen/AdminOrderDetail'
import KitchenCategory from '@/components/kitchen/AdminCategory'

// counter panal
import CounterLogin from '@/components/counter/AdminLogin'
import CounterMain from '@/components/counter/AdminMain'
import CounterProduct from '@/components/counter/AdminProduct'
import CounterAddProduct from '@/components/counter/AddProduct'
import CounterOrders from '@/components/counter/AdminOrders'
import CounterOrderDetail from '@/components/counter/AdminOrderDetail'
import CounterCategory from '@/components/counter/AdminCategory'


import domain from '../domain_config.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'productView',
          component: ProductView
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        },
        {
          path: '/ordersdetail/:orderId',
          name: 'ordersdetail',
          component: OrdersDetail
        },
        {
          path: '/productDetail/:proId',
          name: 'productDetail',
          component: ProductDetail
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        }
      ]
    },
    {
      path: '/admin',
      name: 'adminLogin',
      component: AdminLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next('/admin/admindashboard')
        } else {
          next()
        }
      },
    },
    {
      path: '/admin/admindashboard',
      name: 'admindashboard',
      component: AdminMain,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next()
        } else {
          next('/admin')
        }
      },
      children: [
        {
          path: '/admin/admindashboard',
          name: 'adminorders',
          component: AdminOrders
        },
        {
          path: '/admin/adminproduct',
          name: 'adminproduct',
          component: AdminProduct
        },
        {
          path: '/admin/addproduct',
          name: 'addproduct',
          component: AddProduct
        },
        {
          path: '/admin/admincategory',
          name: 'admincategory',
          component: AdminCategory
        },
        {
          path: '/admin/adminorderdetail/:orderId',
          name: 'adminorderdetail',
          component: AdminOrderDetail
        }
      ]
    },
    {
      path: '/kitchen',
      name: 'kitchenLogin',
      component: KitchenLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next('/kitchen/admindashboard')
        } else {
          next()
        }
      },
    },
    {
      path: '/kitchen/admindashboard',
      name: 'kitchendashboard',
      component: KitchenMain,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next()
        } else {
          next('/kitchen')
        }
      },
      children: [
        {
          path: '/kitchen/admindashboard',
          name: 'kitchenorders',
          component: KitchenOrders
        },
        {
          path: '/kitchen/adminproduct',
          name: 'kitchenproduct',
          component: KitchenProduct
        },
        {
          path: '/kitchen/addproduct',
          name: 'kitchenaddproduct',
          component: KitchenAddProduct
        },
        {
          path: '/kitchen/admincategory',
          name: 'kitchencategory',
          component: KitchenCategory
        },
        {
          path: '/kitchen/adminorderdetail/:orderId',
          name: 'kitchenorderdetail',
          component: KitchenOrderDetail
        }
      ]
    },
    {
      path: '/counter',
      name: 'counterLogin',
      component: CounterLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next('/counter/admindashboard')
        } else {
          next()
        }
      },
    },
    {
      path: '/counter/admindashboard',
      name: 'counterdashboard',
      component: CounterMain,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('is_login') === 'true') {
          next()
        } else {
          next('/counter')
        }
      },
      children: [
        {
          path: '/counter/admindashboard',
          name: 'counterorders',
          component: CounterOrders
        },
        {
          path: '/counter/adminproduct',
          name: 'counterproduct',
          component: CounterProduct
        },
        {
          path: '/counter/addproduct',
          name: 'counteraddproduct',
          component: CounterAddProduct
        },
        {
          path: '/counter/admincategory',
          name: 'countercategory',
          component: CounterCategory
        },
        {
          path: '/counter/adminorderdetail/:orderId',
          name: 'counterorderdetail',
          component: CounterOrderDetail
        }
      ]
    }
  ]
})
