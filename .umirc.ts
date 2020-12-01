import { defineConfig } from 'umi';
import pageRoutes from './config/router.config';
import themes from './config/theme.config';
const appName = 'indexDetails';

export default defineConfig({
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  theme: themes,
  dynamicImport: {
    loading: '@/components/PageLoading/loading',
  },
  targets: {
    ie: 11,
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true, // 删除debugger
    },
  },
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  define: {
    APP_NAME: appName,
  },
  qiankun: {
    slave: {},
  },
  mountElementId: appName,
  base: appName,
  outputPath: `./dist/${appName}`,
  publicPath: `/${appName}/`,
  routes: pageRoutes,
  // proxy: {
  //   '/productEvaluationList/api': {
  //     target: 'http://10.249.216.110:8022',
  //     changeOrigin: true,
  //     pathRewrite: { '^/productEvaluationList/api': '' },
  //   },
  // },
});
