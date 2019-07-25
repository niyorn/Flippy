import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSession: 0,
    startTime: '',
    endTime: '',
    breakTime: ''
  },


  mutations: {
    setUserSession(state, payload) {
      state.userSession = payload
    },
    setUserStartTime(state, payload) {
      state.startTime = payload
    },
    setUserEndTime(state, payload) {
      state.endTime = payload
    },
    setUserBreakTime(state, payload) {
      state.breakTime = payload
    }
  },


  //TODO: calulate the difference in time between startTime and Endtime
  actions: {
    calculateSessions({commit, dispatch}, payload) {
      commit('setUserSession', payload.sessions)
      commit('setUserStartTime', payload.startTime)
      commit('setUserEndTime', payload.endTime)
      commit('setUserBreakTime', payload.breakTime)

      dispatch('calculate')
    },
    calculate({state}) {
      const startTime = state.startTime
      const endTime = state.endTime
    }
  }
})
