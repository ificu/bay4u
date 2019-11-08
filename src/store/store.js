import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    // counter 라는 state 속성을 추가
    state: {
        CarInfo: { CarNo: "", VinNo: "" },
        UserInfo: { UserID: "", BsnID: "S009" }
    },
    getters: {
        CarInfo(state) { return state.CarInfo }
    },
    mutations: {
        SetCarInfo(state, carInfo) {
            state.CarInfo = carInfo
        }
    },
    actions: {
        UpdateCarInfo({ commit }, carInfo) {
            commit('SetCarInfo', { carInfo })
        }
    }
});