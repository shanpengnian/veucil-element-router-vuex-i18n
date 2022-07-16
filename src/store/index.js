import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
import md5 from 'js-md5'
Vue.use(Vuex)

const store = new Vuex.Store({
    //this.$store.state.hasLogin
    state: {
        hasLogin: false,
        token:null,
        userInfo:{}
    },
    mutations: {
        //this.$store.commit('login',res.data)
        login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider.userInfo;
            state.token = provider.token;
            // MD5加盐
            let md5Obj=md5(JSON.stringify(provider.userInfo))
            cookie.set("userInfo",md5Obj,6);
            cookie.set("userToken",provider.token,6);
			console.log("缓存：登录")
		},
        //this.$store.commit('logout')
		logout(state) {
            console.log("缓存：退出了")
			state.hasLogin = false;
            state.token =null;
			state.userInfo = {};
            cookie.remove("userToken")
            cookie.remove("userInfo")
		}
    },
    actions: {},
    modules: {}
})

export default store
