import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/invoice',
    component: () => import('@/views/invoice/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 把需要设置权限的理由放在动态路由里那就得写为 其中 meta中的 roles 就是对角色的管理
export const asyncRoutes = [
  {
    path: '/infomation',
    component: Layout,
    redirect: '/product/list',
    name: 'Infomation',
    meta: { title: '信息管理', icon: 'el-icon-s-goods', roles: ['salesman', 'purchaser', 'inventory'] },
    children: [
      {
        path: 'product_list',
        name: 'ProductList',
        component: () => import('@/views/product/list'),
        meta: { title: '商品列表', icon: 'el-icon-s-order' }
      },
      {
        path: 'customer_list',
        name: 'CustomerList',
        component: () => import('@/views/customer/list'),
        meta: { title: '客户列表', icon: 'el-icon-s-order', roles: ['salesman'] }
      },
      {
        path: 'suplier_list',
        name: 'SuplierList',
        component: () => import('@/views/supplier/list'),
        meta: { title: '供应商列表', icon: 'el-icon-s-order', roles: ['purchaser'] }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: { title: '销售单管理', icon: 'el-icon-s-order', roles: ['salesman'] },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: { title: '销售单列表', icon: 'el-icon-s-order' }
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/order/detail'),
        meta: { title: '销售单详情', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/order/create'),
        meta: { title: '创建销售单', icon: 'el-icon-s-order' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/order/edit'),
        meta: { title: '编辑销售单', icon: 'el-icon-s-order' },
        hidden: true
      }
    ]
  },
  {
    path: '/purchases',
    component: Layout,
    name: 'Purchases',
    meta: { title: '采购单管理', icon: 'el-icon-s-order', roles: ['purchaser'] },
    children: [
      {
        path: 'list',
        name: 'PurchasesList',
        component: () => import('@/views/order/list'),
        meta: { title: '采购单列表', icon: 'el-icon-s-order' }
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/order/detail'),
        meta: { title: '采购单详情', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/order/create'),
        meta: { title: '创建采购单', icon: 'el-icon-s-order' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/order/edit'),
        meta: { title: '编辑采购单', icon: 'el-icon-s-order' },
        hidden: true
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    name: 'Inventory',
    meta: { title: '仓库单管理', icon: 'el-icon-s-order', roles: ['inventory'] },
    children: [
      {
        path: 'list',
        name: 'InventoryList',
        component: () => import('@/views/order/list'),
        meta: { title: '仓库单列表', icon: 'el-icon-s-order' }
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/order/detail'),
        meta: { title: '仓库单详情', icon: 'el-icon-s-order' },
        hidden: true
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/order/create'),
        meta: { title: '创建仓库单', icon: 'el-icon-s-order' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/order/edit'),
        meta: { title: '编辑仓库单', icon: 'el-icon-s-order' },
        hidden: true
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
