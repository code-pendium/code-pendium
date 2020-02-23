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

      <v-col cols="12">
        <v-row justify="center">
          <!--<v-btn tile outlined class="startbtn" to="/c-00">Get Started</v-btn>-->
          <a class="startbtn" href="/#/c-00">
            <span>Get Started <v-icon>mdi-chevron-right</v-icon></span>
          </a>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import * as monaco from "monaco-editor"

const scriptSample = 
`function typeChar(n) {
  if(n == scriptSample.length)
    return
  var nextChar = scriptSample.charAt(n)
  this.editor.setValue(this.editor.getValue() + nextChar)
  setTimeout((n, callback) => {
    callback(n)
  }, 100, n + 1, this.typeChar)
}
this.typeChar(0)`

export default {
  data: () => ({
    imgLoaded: false,
    editor: null,
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
        return
      var nextChar = scriptSample.charAt(n)
      this.editor.setValue(this.editor.getValue() + nextChar)
      setTimeout((n, callback) => {
        callback(n)
      }, 100, n + 1, this.typeChar)
    }
  }
}
</script>

<style lang="scss">
.home-editor {
  width: 40rem;
  height: 15rem;
}

$defaultColor: #2196F3;
$hoverColor: #fff;

.startbtn {
  cursor: pointer;
  background: $defaultColor;
  position: relative;
  padding: 0.5rem 1.25rem;
  box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.34);
  text-decoration: none;

  span {
    color: #fff;
    display: block;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: 0.3s ease;
    position: relative;
    z-index: 1;
    left: 0;
  }

  .v-icon {
    margin-bottom: 2px;
    position: relative;
    width: 0;
    left: -50%;
    color: rgba(0, 0, 0, 0);
    transition: 0.3s ease;
  }

  &:before, &:after {
    content: "";
    background: $hoverColor;
    height: 50%;
    width: 0;
    position: absolute;
    transition: 0.3s cubic-bezier(.785,.135,.15,.86);
  }
  &:before {
    top: 0;
    left: 0;
    right: auto;
  }
  &:after {
    bottom: 0;
    right: 0;
    left: auto;
  }

  &:hover {
    &:before {
      width: 100%;
      right: 0;
      left: auto;
    }
    &:after {
      width: 100%;
      left: 0;
      right: auto;
    }
    span, .v-icon {
      color: #000;
    }
    span {
      left: -5%;
    }
    .v-icon {
      left: 5%;
    }
  }
}
</style>