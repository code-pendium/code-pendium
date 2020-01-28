import Vue from "vue"
import Vuex from "vuex"

import VuexPersist from "vuex-persist"

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    version: "1.0",
    levelData: {}
  },
  mutations: {
    saveData(state, data) {
      var level = state.levelData[data.level]
      if (data.code)
        level.code = data.code
      if (data.input)
        level.input = data.input
      if (data.testsPassed)
        level.testsPassed = data.testsPassed
      if (data.completed)
        level.completed = data.completed
    },

    createLevelObj(state, level) {
      state.levelData[level] = {
        code: "",
        input: "",
        testsPassed: 0,
        completed: false
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
