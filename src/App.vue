<template>
  <v-app id="code-compendium">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list subheader dense>
        <v-subheader class="subtitle-1">Levels</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group>
          <v-list-item v-bind:key="r.name" v-for="r in levelRoutes" :to="{path: r.path}">
            <v-list-item-content>
              <v-list-item-title>{{r.name}}</v-list-item-title>
              <v-list-item-subtitle>{{r.title}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon 
                :key="updateKey"
                v-if="($store.state.levelData[r.slug] && $store.state.levelData[r.slug].completed)">
                mdi-check
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Codependium</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-bind:key="r.name" v-for="r in navigationRoutes" :to="{path: r.path}">
        <v-icon left>{{r.icon}}</v-icon>{{r.name}}
      </v-btn>
    </v-app-bar>

    <v-content id="content">
      <v-scroll-y-transition mode="out-in">
        <router-view></router-view>
      </v-scroll-y-transition>
    </v-content>

    <v-footer app>
      <span class="px-3">&copy;{{new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import router from "./plugins/router"

export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: false,
    mini: true,
    updateKey: false
  }),

  computed: {
    levelRoutes: () => {
      return router.options.routes.filter(r => {
        return r.type == "level"
      })
    },
    navigationRoutes: () => {
      return router.options.routes.filter(r => {
        return r.type == "navigation"
      })
    }
  },

  watch: {
    $store: function() {
      console.log("Store Changed")
    }
  },

  mounted () {
    setInterval(this.update, 1000)
    if(process.env.NODE_ENV != "development")
      console.log(
        "%cIf you can read this, you are cheating! Don't do it ;-;", 
        "color: red; font-size: medium; background-color:#290000;")
  },

  methods: {
    update () {
      this.$forceUpdate()
    }
  }
}
</script>

<style>
body {
  background-color: #303030;
}
.custom.char.typed {
  color: white;
}
.custom.caret {
  display: none;
}
#content .container {
  max-width: 1200px;
}
</style>