import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    // counter 라는 state 속성을 추가
    state: {
        CarInfo: { CarNo: "", VinNo: "" },
        UserInfo: { UserID: "", BsnID: "" }
    },
    getters: {
        CarInfo(state) { return state.CarInfo },
        UserInfo(state) { return state.UserInfo },
    },
    mutations: {
        SetCarInfo(state, carInfo) {
            state.CarInfo = carInfo
        },
        SetUserInfo(state, userInfo) {
            state.UserInfo = userInfo
        }
    },
    actions: {
        UpdateCarInfo({ commit }, carInfo) {
            commit('SetCarInfo', { carInfo })
        },
        UpdateUserInfo({ commit }, userInfo) {
            commit('SetUserInfo', { userInfo })
        }
    }
});