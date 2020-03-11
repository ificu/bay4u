import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //CarInfo: { CarNo: "", VinNo: "WBAJD3109JB316363" },
        CarInfo: { CarNo: "", VinNo: "" },
        UserInfo: { UserID: "", BsnID: "", Name: "", EntNo: "", UserType: "" }, // 사용자 ID, 사업장 코드, 사용자 명, 정비업코드, 사용자 타입
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

            let chatid = msgData.msgData.Chatid;
            let extIdx = state.msgDatas.findIndex(el => el.msgData.Chatid === chatid);
            if (extIdx === -1) {
                state.msgDatas.push(msgData);
            } else {
                if (chatid === undefined) {
                    state.msgDatas.push(msgData);
                }
            }
        },
        InitMsgData(state) {
            state.msgDatas = []
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
    },
});