<template>
  <v-container id="level" fluid class="px-5">
    <vue-topprogress ref="topProgress"></vue-topprogress>

    <v-row dense 
      :justify="sandbox ? 'center' : 'start'"
      :class="sandbox ? 'mb-3' : ''">
      <v-col 
        :lg="sandbox ? 'auto' : 10" 
        :md="sandbox ? 'auto' : 9" 
        :sm="sandbox ? 'auto' : 9">
        <v-card :ripple="sandbox">
          <v-card-title>
            <span class="display-1"><kbd>{{name}}</kbd></span>
            <v-spacer></v-spacer>
            <v-chip 
              class="ml-1"
              v-bind:key="t"
              v-for="t in tags"
            >
              {{t}}
            </v-chip>
            <v-avatar color="grey darken-2" size="36" v-if="sandbox">
              <v-icon>mdi-cube-outline</v-icon>
            </v-avatar>
          </v-card-title>
          <v-card-subtitle>
            <span class="title">{{title}}</span>
          </v-card-subtitle>    
          <v-divider></v-divider>
          <v-card-text class="body-2">
            <span v-html="description"></span>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col lg="2" md="3" sm="3" v-if="!sandbox">
        <v-card>
          <v-card-title>
            <span class="display-1">{{difficulty}}★</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="title">Difficulty</span>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="body-1">
            <span>{{levelStatus}}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn small tile :to="previousLevel.path">
              <v-icon left>mdi-chevron-left</v-icon>
              {{previousLevel.name}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn small tile :to="nextLevel.path">
              {{nextLevel.name}}
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense v-if="!sandbox">
      <v-col cols="6">
        <v-card class="max-height">
          <v-card-title class="pa-3">
            <span class="subtitle-1">Input Format</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="body-2">
            <span v-html="inputFormat"></span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="max-height">
          <v-card-title class="pa-3">
            <span class="subtitle-1">Output Format</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="body-2">
            <span v-html="outputFormat"></span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col lg="8" md="7" sm="12">
        <v-card>
          <v-card-title class="pa-3">
            <span class="subtitle-1">Code Editor</span>
            <v-tooltip right transition="scroll-x-transition" mode="out-in" v-if="!sandbox">
              <template v-slot:activator="{on}">
                <v-btn v-on="on" icon @click="hintDialog = true" :disabled="running">
                  <v-icon>mdi-help-circle</v-icon>
                </v-btn>
              </template>
              <span>Hint</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn tile @click="run(0)" :loading="running" :disabled="running">
              <v-icon left>mdi-play-circle-outline</v-icon>
              Run
            </v-btn>
            <v-divider vertical v-if="!sandbox"></v-divider>
            <v-btn tile @click="submit(0)" :disabled="running" v-if="!sandbox">
              <v-icon left>mdi-cube-send</v-icon>
              Submit
            </v-btn>
          </v-card-title>
          <div id="code" class="editor"></div>
        </v-card>
      </v-col>

      <v-col lg="4" md="5" sm="12">
        <v-container fluid fill-height>
          <v-row dense>
            <v-col>
              <v-card>
                <v-card-title class="pa-2">
                  <span class="subtitle-1">Run Input</span>
                </v-card-title>
                <div id="input" class="minieditor"></div>
              </v-card>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <v-card>
                <v-card-title class="pa-2">
                  <span class="subtitle-1">Run Output</span>
                </v-card-title>
                <div id="output" class="minieditor"></div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog
      v-model="hintDialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
      v-if="!sandbox"
    >
      <v-card>
        <v-card-title>
          <span class="title">
            <v-icon>mdi-help-circle</v-icon>
            Hint
            </span>
          <v-spacer></v-spacer>
          <v-btn text icon :disabled="submitting" @click="hintDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text class="body-2">
          <span v-html="hint"></span>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="submitDialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
      v-if="!sandbox"
    >
      <v-card :loading="submitting">
        <v-card-title>
          <span class="title">Submission</span>
          <v-spacer></v-spacer>
          <v-btn text icon :disabled="submitting" @click="submitDialog = false, submitResult = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle>
          <span class="subtitle-1"><kbd>{{name}}</kbd> {{title}}</span>
        </v-card-subtitle>
        <v-divider></v-divider>

        <v-card-text>
          <v-list subheader>
            <v-list-item
              v-for="test in testResults"
              :key="test.number"
            >  
              <v-list-item-content>
                <v-list-item-title>Test {{test.number}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn 
                  :color="test.state == 'loading' ? 'normal' : (test.state ? 'success' : 'error')" 
                  :loading="test.state == 'loading'">
                  {{test.state ? "Passed" : "Failed"}}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>

      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="submitResult"
      :color="allTestsPassed ? 'success' : 'error'"
      v-if="!sandbox"
    >
      {{submitResultText}}
      <v-btn icon @click.native="submitResult = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
import { editor } from "monaco-editor"
import jsonFormat from "json-format"

export default {
  props: {
    // Mandatory
    name: String,
    title: String,
    tags: Array,
    difficulty: Number,

    description: String,
    inputFormat: String,
    outputFormat: String,
    hint: String,

    defaultCode: String,
    defaultInput: String,

    testInputs: Array,
    inputFunction: String,
    solution: Function,

    // Optional
    validator: {
      type: Function,
      default: function(a, b) {
        return a === b
      }
    },
    precheck: Function,
    sandbox: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    code: null,
    codeUpdateTime: 0,
    input: null,
    inputUpdateTime: 0,
    output: null,

    hintDialog: false,
    running: false,
    submitting: false,
    submitDialog: false,
    submitResult: false,
    testResults: []
  }),

  computed: {
    levelRoutes: function() {
      return this.$router.options.routes.filter(r => {
        return r.type == "level"
      })
    },

    currentLevelIndex: function() {
      var routes = this.levelRoutes
      var current = this.$router.currentRoute
      for(var i in routes) {
        if(routes[i].path == current.path)
          return i
      }
      return -1
    },

    nextLevel: function() {
      var routes = this.levelRoutes
      var index = parseInt(this.currentLevelIndex)
      if(index + 1 == routes.length)
        return routes[index]
      return routes[index + 1]
    },

    previousLevel: function() {
      var routes = this.levelRoutes
      var index = parseInt(this.currentLevelIndex)
      if(index - 1 == -1)
        return routes[index]
      return routes[index - 1]
    },

    slug: function() {
      return this.name.toLowerCase().replace("-", "_")
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (char) => {
        return "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(char);
      })
    },

    testsPassed: function() {
      var passed = 0
      for(var i in this.testResults) {
        var test = this.testResults[i]
        if(test.state == true)
          passed++
      }
      return passed
    },

    submitResultText: function() {
      var tests = this.testInputs.length
      var failed = tests - this.testsPassed
      if(failed == 0)
        return "You passed all the tests!"
      else if(failed == tests)
        return "You failed all the tests!"
      return `You failed ${failed} test${failed > 1 ? "s" : ""}.`
    },

    allTestsPassed: function() {
      return this.testsPassed == this.testResults.length
    },
    
    levelStatus: function() {
      var passed = this.$store.state.levelData[this.slug].testsPassed
      var tests = this.testInputs.length
      var status = ""
      if(!passed)
        passed = 0
      if(passed == tests && tests > 0)
        status = "Completed"
      else
        status = `${passed}/${tests} Tests Passed`
      return status
    }
  },

  created () {
    this.$store.commit("createLevelData", {
      level: this.slug,
      difficulty: this.difficulty
    })
  },

  mounted () {
    this.code = editor.create(document.getElementById("code"), {
      language: "javascript",
      theme: "vs-dark",
      tabSize: 2,
      automaticLayout: true,
      minimap: {
        enabled: false
      }
    })

    var codeData = this.getData("code")
    this.code.setValue(codeData.length == 0 ? this.defaultCode : codeData)
    
    this.code.onDidChangeModelContent(() => {
      this.saveCode()
    })

    this.input = editor.create(document.getElementById("input"), {
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      wordWrap: "on"
    })

    var inputData = this.getData("input")
    this.input.setValue(inputData.length == 0 ? this.defaultInput : inputData)
    
    this.input.onDidChangeModelContent(() => {
      this.saveInput()
    })

    this.output = editor.create(document.getElementById("output"), {
      theme: "vs-dark",
      automaticLayout: true,
      minimap: {
        enabled: false
      },
      readOnly: true
    })

    if(process.env.NODE_ENV == "development")
      console.log(this.testInputs)
  },

  beforeDestroy () {
    this.saveCode()
    this.saveInput()
  },

  methods: {
    execute (callback, code, n) {
      if(this.precheck) {
        var check = this.precheck(code)
        if(check != true) {
          this.$nextTick(() => {
            callback(check, n)
          })
          return
        }
      }

      var URL = window.URL || window.webkitURL
      var workerScript = `
      self.onmessage = e => { 
        postMessage(eval(e.data[0])); 
      }`
      var blob = new Blob([workerScript], { type: "application/javascript" })
      var objectURL = URL.createObjectURL(blob)

      var worker = new Worker(objectURL)
      worker.onmessage = event => {
        worker.terminate()
        URL.revokeObjectURL(objectURL)
        //console.log(event.data)
        callback(event.data, n)
      }
      worker.onerror = e => {
        worker.terminate()
        URL.revokeObjectURL(objectURL)
        //console.error(`Error: Line ${e.lineno} in ${e.filename}: ${e.message}`)
        callback(`Error at line ${e.lineno}: ${e.message}`, n)
      }
      worker.postMessage([code])

      setTimeout((worker, objectURL, callback, n) => {
        fetch(objectURL)
        .then(() => {
          worker.terminate()
          var URL = window.URL || window.webkitURL
          URL.revokeObjectURL(objectURL)
          callback("Timed Out", n)
          //console.log("Killed worker, timed out")
        })
        .catch(() => {
          // worker has been cleaned
        })
      }, 10000, worker, objectURL, callback, n) 
    },

    run (n) {
      if(n == 0) {
        this.toggleLoading(true)
        this.output.setValue("")
      }

      var inputs = this.input.getValue().split("\n")
      var code = this.code.getValue()
      var finalCode = code + inputs[n]

      this.execute((data, n) => {
        n = parseInt(n)
        try {
          var dataJson = jsonFormat(data).replace(/\\n/g, "\n")
          if(typeof data == "string")
            dataJson = dataJson.substr(1, dataJson.length - 2)
          data = dataJson
        } catch(e) {} // eslint-disable-line
        var last = n >= inputs.length - 1
        var nextln = last ? "" : "\n"
        this.output.setValue(this.output.getValue() + data + nextln)

        if(!last)
          this.run(n + 1)
        else
          this.toggleLoading(false)

      }, finalCode, n)
    },

    submit (n) {
      if(n == 0) {
        this.submitDialog = true
        this.submitting = true
        var inputs = this.testInputs
        this.testResults = []
        for(var i in inputs) {
          var testResult = {
            number: parseInt(i) + 1,
            state: "loading"
          }
          this.testResults.push(testResult)
        }
      }

      var input = this.testInputs[n]
      var args = JSON.stringify(input)
      var inputStr = `${this.inputFunction}.apply(null, ${args})`
      var code = this.code.getValue()
      var finalCode = code + inputStr;

      this.execute((data, n) => {
        n = parseInt(n)
        var input = this.testInputs[n]
        var answer = this.solution.apply(null, input)
        var valid = this.validator(data, answer)
        this.testResults[n].state = valid
        var last = n >= this.testInputs.length - 1

        if(!last)
          this.submit(n + 1)
        else {
          this.submitting = false
          this.submitResult = true
          var stored = this.$store.state.levelData[this.slug].testsPassed
          if(!stored || this.testsPassed > stored)
          {
            this.saveData({
              testsPassed: this.testsPassed,
              completed: this.allTestsPassed
            })
          }
        }
      }, finalCode, n)
    },

    toggleLoading (state) {
      this.code.updateOptions({readOnly: state})
      this.input.updateOptions({readOnly: state})
      this.running = state
      if(state)
        this.$refs.topProgress.start()
      else
        this.$refs.topProgress.done()
    },

    saveCode () {
      this.saveData({
        code: this.code.getValue()
      })
    },

    saveInput () {
      this.saveData({
        input: this.input.getValue()
      })
    },

    saveData (data) {
      data.level = this.slug
      this.$store.commit("saveData", data)
    },

    getData (target) {
      return this.$store.state.levelData[this.slug][target]
    }
  }
}
</script>

<style>
.editor {
  height: 40vh;
}
.minieditor {
  height: 15vh;
}
.max-height {
  height: 100%;
}
kbd {
  margin: 1px;
}
</style>