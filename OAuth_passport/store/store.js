import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user:null,
        token:null,
        isUserLoggedin: false
    },
    mutations: {
        setUser (state, user){
            state.user =user
        },
        setToken(state, token){
            state.token = token
            if(token){
                state.isUserLoggedin = true
            } else{
                state.isUserLoggedin = false
            }
        }
    },
    actions: {
        setToken({commit}, token){
            commit('setToken',token)
        },
        setUser({commit}, user){
            commit('setUser', user)
        }
    }
})