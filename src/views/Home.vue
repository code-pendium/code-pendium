<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-img src="../assets/logo.png" max-height="100" max-width="100" @load="imgLoaded = true">
            <v-skeleton-loader v-if="!imgLoaded" type="image">
            </v-skeleton-loader>
          </v-img>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <span>
            <span class="display-3 font-weight-thin">
              <vue-typer 
              text="Codependium" 
              :repeat="0"
              :typeDelay="100"
              ></vue-typer>
            </span> 
            <span class="title font-weight-thin">
              v{{this.$store.state.version}}
            </span>
          </span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <span class="title font-weight-light">
            A compendium of educational coding puzzles and problems for cognitive skill development
          </span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-card>
            <v-card-title>
            </v-card-title>
            <div id="editor" class="home-editor"></div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="helloWorld"
      color="primary"
    >
      Hello World!
      <v-btn text @click.native="helloWorld = false">Close</v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
import * as monaco from "monaco-editor"

const scriptSample = 
`// Self-typing code
function typeChar(n) {
  if(n == scriptSample.length)
    return
  var nextChar = scriptSample.charAt(n)
  this.editor.setValue(this.editor.getValue() + nextChar)
  setTimeout((n, callback) => {
    callback(n)
  }, 100, n + 1, this.typeChar)
}
this.typeChar(0)

// Hello World
this.snackbar.show("Hello World!")`

export default {
  data: () => ({
    imgLoaded: false,
    editor: null,
    helloWorld: false
  }),

  mounted () {
    this.editor = monaco.editor.create(document.getElementById("editor"), {
      language: "javascript",
      theme: "vs-dark",
      tabSize: 2,
      automaticLayout: true,
      readOnly: true,
      minimap: {
        enabled: false
      },
      scrollbar: {
        horizontal: "hidden",
        vertical: "hidden"
      }
    })

    this.typeChar(0)
  },

  methods: {
    typeChar(n) {
      if(n == scriptSample.length)
      {
        this.helloWorld = true
        return
      }
      var nextChar = scriptSample.charAt(n)
      this.editor.setValue(this.editor.getValue() + nextChar)
      setTimeout((n, callback) => {
        callback(n)
      }, 100, n + 1, this.typeChar)
    }
  }
}
</script>

<style>
.home-editor {
  width: 40rem;
  height: 20rem;
}
</style>