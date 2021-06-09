
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

      { path: '/category/index', component: () => import('src/pages/Category/Index.vue') },
      { path: '/category/create', component: () => import('src/pages/Category/Create.vue') },
      { path: '/category/edit/:id', component: () => import('src/pages/Category/Edit.vue') },

      { path: '/course/index', component: () => import('src/pages/Course/Index.vue') },
      { path: '/course/create', component: () => import('src/pages/Course/Create.vue') },
      { path: '/course/edit/:id', component: () => import('src/pages/Course/Edit.vue') },

      { path: '/user/create', component: () => import('src/pages/User/Create.vue') },
      { path: '/user/index', component: () => import('src/pages/User/Index.vue') },
      { path: '/user/edit/:id', component: () => import('src/pages/User/Edit.vue') },
      { path: '/user/register/:id', component: () => import('src/pages/User/Register.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
