import Vue from "vue"
import Vuex from "vuex"

import VuexPersist from "vuex-persist"

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    m: "If you can read this, you are cheating! Don't do it ;-;",
    version: "1.0",
    levelData: {},
    levelInfo: {}
  },
  mutations: {
    saveData(state, data) {
      var level = state.levelData[data.level]
      if (data.code != undefined)
        Vue.set(level, "code", data.code)
      if (data.input != undefined)
        Vue.set(level, "input", data.input)
      if (data.testsPassed)
        Vue.set(level, "testsPassed", data.testsPassed)
      if (data.completed)
        Vue.set(level, "completed", data.completed)
    },

    createLevelData(state, data) {
      if (!state.levelData[data.level]) {
        Vue.set(state.levelData, data.level, {
          code: "",
          input: "",
          testsPassed: 0,
          completed: false
        })
      }
      Vue.set(state.levelInfo, data.level, {
        difficulty: data.difficulty
      })
    },
  },
  plugins: [vuexLocal.plugin]
})
