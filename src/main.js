/* eslint-disable quote-props */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/useElement'
import cookie from 'js-cookie'
import VueI18n from 'vue-i18n'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'
import axios from 'axios'
import md5 from 'js-md5'
//阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

Vue.prototype.cookie = cookie

Vue.use(ElementUi)

Vue.use(VueI18n)

Vue.prototype.$axios = axios

// 这几个路由路径不验证
const white = ['/login', '/register', '/change']
/**
 * 路由前置过滤,处理登录拦截
 */
router.beforeEach((to, from, next) => {
    if (!white.includes(to.path)) {
        // console.log(store.state.userState)
        // console.log(cookie.get('userToken'))
        // console.log(store.state.hasLogin)
        if (cookie.get('userToken') || store.state.hasLogin) {
            //console.log(1)
            next()
        } else {
            if (from.path !== '/login') {
                console.log(2)
                next('/login')
            }
        }
    }
    next()
})

/**
 * 设置cookie
 * @param name => token名称
 * @param data => token数据
 * @param expires => 过期时间 6：6天后失效
 */
Vue.prototype.set_cookie = (name, data, expires) => {
    cookie.set(name, data, {
        expires: expires
    })
}
/**
 * 获取cookie
 */
 Vue.prototype.get_cookie = (name) => {
    return cookie.get(name)
}
/**
 * 删除cookie
 */
 Vue.prototype.remove_cookie = (name) => {
    cookie.remove(name)
}
/**
 * 数据md5加密
 * @param data => 传入需要加密的数据
 */
Vue.prototype.encryption = (data) => {
    return md5(data)
}

const messages = {
    'cn': require('@/assets/lang/cn.js'),
    'en': require('@/assets/lang/en.js')
}

const i18n = new VueI18n({
    locale: cookie.get('lang') || 'cn',
    messages
})

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
