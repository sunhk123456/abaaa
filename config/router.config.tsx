export default [
  {
    path: '/login',
    component: '@/pages/login/index',
  },
  {
    path: '/timeout',
    component: '@/pages/Timeout/Timeout',
  },
  {
    path: '/500',
    name: 'not-find',
    component: './Exception/500',
  },
  {
    path: '/404',
    name: 'not-find',
    component: './Exception/404',
  },
  {
    exact: false,
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/statistics' },
      { path: '/demo', component: '@/pages/demo/index' },
      { path: '/statistics', component: '@/pages/statistics/index' },
      { path: '/*', redirect: '/404' },
    ],
  },
];
