
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // component: () => import('layouts/MovieLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/movies', component: () => import('src/pages/Movies.vue') },
      { path: '/tv', component: () => import('src/pages/TV.vue') },
      { path: '/shuffle', component: () => import('src/pages/Random.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
