const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: (solve) => require(['@/views/bss/login/login'], solve)
  },
  {
    path: '/SDocPreview',
    name: 'SDocPreview',
    component: (solve) => require(['@/components/FileUpload/DocPreview'], solve)
  },
  {
    path: '/single/page/preview',
    name: 'single',
    component: (solve) => require(['@/components/OnLine/index'], solve),
    props: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401/401.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error-page/403/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error-page/500/500.vue')
  }
]

export default routes
