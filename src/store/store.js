import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        CarInfo: { CarNo: "", VinNo: "WBAJD3109JB316363" },
        UserInfo: { UserID: "", BsnID: "", Name: "" },
        msgDatas: [],
    },
    getters: {
        CarInfo(state) { return state.CarInfo },
        UserInfo(state) { return state.UserInfo },
        msgDatas(state) { return state.msgDatas },
    },
    mutations: {
        SetCarInfo(state, carInfo) {
            state.CarInfo = carInfo
        },
        SetUserInfo(state, userInfo) {
            state.UserInfo = userInfo
        },
        SetMsgData(state, msgData) {
            state.msgDatas.push(msgData);
        }
    },
    actions: {
        UpdateCarInfo({ commit }, carInfo) {
            commit('SetCarInfo', { carInfo })
        },
        UpdateUserInfo({ commit }, userInfo) {
            commit('SetUserInfo', { userInfo })
        },
        UpdateMsgData({ commit }, msgData) {
            commit('SetMsgData', { msgData })
        }
    }
});