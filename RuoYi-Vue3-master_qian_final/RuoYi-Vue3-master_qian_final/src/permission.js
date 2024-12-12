import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/register'];

router.beforeEach((to, from, next) => {
  NProgress.start()
  //   // 清除旧的上一个路由信息
  //   localStorage.removeItem('lastRoute');
  //  // 保存新的上一个路由信息
  //   localStorage.setItem('lastRoute', from.fullPath);
  // 检查是否存在 'individual_points_lastRoute' 键
  if (localStorage.getItem('individual_points_lastRoute')) {
    // 如果存在，先删除
    localStorage.removeItem('individual_points_lastRoute');
  }

  // 无论是否存在，都设置新的值
  localStorage.setItem('individual_points_lastRoute', from.fullPath);

  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        useUserStore().getInfo().then(() => {
          isRelogin.show = false
          usePermissionStore().generateRoutes().then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach(route => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next({ path: '/' })
          })
        })
      } else {

        if (to.name === 'ShenHe_submit') {
          // console.log(to)
          // 检查是否有 params 属性
          if (to.params) {
            if (to.params.params) {
              const dataStr = to.params.params;
              console.log(typeof dataStr);
              // console.log(decodeURIComponent(dataStr));
              if (dataStr != ':params') {
                const decodedData = JSON.parse(decodeURIComponent(dataStr));
                // 检查是否有 title 属性
                if (decodedData.title) {
                  console.log(decodedData.title);
                  // console
                  // 将 title 设置为 to.meta.title
                  to.meta.title = decodedData.title;
                }
              }

            }


          }

        }
        // 解析 params
        // console.log(to.params )
        // 检查是否有 title 属性
        // const dataStr = to.params.data;
        // if (to.params.title) {
        //   console.log(to.params.title )
        //   // 将 title 设置为 to.meta.title
        //   to.meta.title = to.params.title;
        // }

        next()
      }
    }
  } else {
    console.log("token不存在")
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
