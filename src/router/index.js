/* eslint-disable indent */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register.vue')
    },
    {
        path: '/change',
        name: 'Change',
        component: () => import('@/views/change.vue')
    },
    {
        path: '/forget',
        name: '/Forget',
        component: () => import('@/views/forget.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
