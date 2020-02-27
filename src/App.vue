<template>
  <v-app id="code-compendium">
    <v-app-bar
      v-if="validRoute"
      v-model="appbar"
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

    <v-navigation-drawer
      v-if="validRoute"
      v-model="drawer"
      app
      clipped
      :mobile-break-point="breakpoint"
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
              <v-scroll-x-transition>
                <v-icon 
                  :key="updateKey"
                  v-if="($store.state.levelData[r.slug] && $store.state.levelData[r.slug].completed)">
                  mdi-check
                </v-icon>
              </v-scroll-x-transition>
            </v-list-item-action> 
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content id="content">
      <v-scroll-y-transition mode="out-in">
        <router-view></router-view>
      </v-scroll-y-transition>
      <v-fade-transition>
        <v-btn light fab fixed bottom right
          v-show="scrollFab"
          @click="$vuetify.goTo(0)">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fade-transition>
    </v-content>

    <v-footer
      v-if="validRoute"
      app
    >
      <!--<span class="px-3">&copy;{{new Date().getFullYear()}}</span>-->
      <a
        href="http://creativecommons.org/licenses/by-nc/4.0/"
        target="_blank"
      >
        <v-avatar
          size="24"
          class="mr-1"
        >
          <v-img
            src="@/assets/cc/cc.svg"
            alt="Creative Commons - Logo"
          />
        </v-avatar>
        <v-avatar
          size="24"
          class="mr-1"
        >
          <v-img
            src="@/assets/cc/by.svg"
            alt="Creative Commons - BY"
          />
        </v-avatar>
        <v-avatar
          size="24"
        >
          <v-img
            src="@/assets/cc/nc.svg"
            alt="Creative Commons - Non-commercial"
          />
        </v-avatar>
      </a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    breakpoint: 1350,
    drawer: false,
    appbar: true,
    validRoute: false,
    scrollFab: false,
    updateKey: false,
  }),

  computed: {
    levelRoutes: function() {
      return this.$router.options.routes.filter(r => {
        return r.type == "level"
      })
    },

    navigationRoutes: function() {
      return this.$router.options.routes.filter(r => {
        return r.type == "navigation"
      })
    }
  },

  watch : {
    $route(to) {
      this.validateRoute(to)
    }
  },

  mounted () {
    window.onscroll = (e) => {
      this.onscroll(e)
    }
    this.onscroll()

    this.validateRoute(this.$router.currentRoute)

    setInterval(this.update, 1000)

    if(process.env.NODE_ENV != "development")
      console.log(
        "%cIf you can read this, you are cheating! Don't do it ;-;", 
        "color: red; font-size: medium; background-color:#290000;")
  },

  methods: {
    update () {
      this.$forceUpdate()
    },

    onscroll (e) {
      var top = window.pageYOffset || e.target.scrollTop || 0
      this.scrollFab = (top > 20)
    },

    validateRoute (route) {
      if(window.innerWidth >= this.breakpoint)
        this.drawer = true
        
      this.validRoute = route.name != undefined
    }
  }
}
</script>

<style lang="scss">
.custom {
  &.char.typed {
    color: white;
  }

  &.caret {
    display: none;
  }
}

#content .container {
  max-width: 1200px;
}

.v-application {
  min-width: 720px;
  background-image: url("~@/assets/backgrounds/app-bg.png") !important;
}

.v-navigation-drawer {
  background-image: url("~@/assets/backgrounds/nav-bg.png") !important;
  background-repeat: repeat;
}

$font_path: "~@/assets/fonts/";
$roboto_path: $font_path + "Roboto/Roboto-";

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 100;
  src: url($roboto_path + "Thin.ttf");
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  src: url($roboto_path + "Light.ttf");
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: url($roboto_path + "Regular.ttf");
}

@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  src: url($roboto_path + "Medium.ttf");
}

$montserrat_path: $font_path + "Montserrat/Montserrat-";

@font-face {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 100;
  src: url($montserrat_path + "Thin.ttf");
}
</style>