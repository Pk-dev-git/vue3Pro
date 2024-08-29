import { createStore } from 'vuex'

export default createStore({
    state: {
        showToast:false,
        message:'',
        status:'',  
    },
    mutations: {
        UPDATE_TOAST_SHOW(state, payload){
            state.showToast = payload;
        },
        UPDATE_TOAST_MESSAGE(state, payload){
            state.message = payload;
        },
        UPDATE_TOAST_STATUS(state, payload){
            state.status = payload
        }
    },
    actions:{
        tiggerToast({ commit }, msg, type='success'){
            console.log("tiggerToast")
            commit('UPDATE_TOAST_SHOW', true)
            commit('UPDATE_TOAST_MESSAGE', msg)
            commit('UPDATE_TOAST_STATUS', type)
            setTimeout(() => {
                commit('UPDATE_TOAST_SHOW', false)
                commit('UPDATE_TOAST_MESSAGE', '')
                commit('UPDATE_TOAST_STATUS', '')
            }, 3000) 
        }
    }
})