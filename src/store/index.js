import Vue from "vue";
import Vuex from "vuex";

//动态加载全局菜单
Vue.use(Vuex)
export  default  new Vuex.Store({
    state: {
        routes: []
    },
    mutations: {
        initRoutes(state,data){
            state.routes=data;
        }
    },
    actions:{

    }
})