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
      <v-divider vertical inset></v-divider>
      <v-menu v-model="profile" bottom offset-y open-on-hover>
        <template v-slot:activator="{on}">
          <v-btn fab small v-on="on" class="ml-3">
            <v-icon dark>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="title">Profile</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="subtitle-2">Progress</span>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-progress-circular
                  size="48"
                  :value="levelProgress"
                  class="headline">
                  {{completedLevels}}
                </v-progress-circular>
              </v-col>
              <v-col>
                <span>
                  Levels<br/>
                  Completed
                </span><br/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-avatar
                  size="48"
                  color="#3B3B3B"
                  class="headline"
                >
                  {{starsCollected}}
                </v-avatar>
              </v-col>
              <v-col>
                <span>
                  ★ Stars<br/>
                  Collected
                </span><br/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card> 
      </v-menu>
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
                  v-if="checkLevel(r.slug)">
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
    validRoute: true,
    scrollFab: false,
    profile: null,

    levelProgress: 0,
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
    },

    totalLevels: function() {
      return this.levelRoutes.length
    },

    completedLevels: function() {
      var levelData = this.$store.state.levelData
      var keys = Object.keys(levelData)
      var completed = 0
      for(var i in keys) {
        if(levelData[keys[i]].completed)
          completed++
      }
      return completed
    },

    starsCollected: function() {
      var levelData = this.$store.state.levelData
      var levelInfo = this.$store.state.levelInfo
      var keys = Object.keys(levelData)
      var stars = 0
      for(var i in keys) {
        var level = levelData[keys[i]]
        var info = levelInfo[keys[i]]
        if(level.completed)
          stars += parseInt(info.difficulty)
      }
      return stars
    }
  },

  watch: {
    $route(to) {
      this.validateRoute(to)
    },

    profile() {
      setTimeout(function(t) {
        t.levelProgress = t.profile ?
        (t.completedLevels / t.totalLevels * 100) : 0
      }, 100, this)
    }
  },

  beforeMount () {
    this.validateRoute()
  },

  mounted () {
    window.onscroll = (e) => {
      this.onscroll(e)
    }
    this.onscroll()

    if(process.env.NODE_ENV != "development")
      console.log(
        "%cIf you can read this, you are cheating! Don't do it ;-;", 
        "color: red; font-size: medium; background-color:#290000;")
  },

  methods: {
    onscroll (e) {
      var top = window.pageYOffset || e.target.scrollTop || 0
      this.scrollFab = (top > 20)
    },

    validateRoute () {
      if(window.innerWidth >= this.breakpoint)
        this.drawer = true
        
      this.validRoute = this.$router.currentRoute.name != undefined
    },

    checkLevel (level) {
      return (this.$store.state.levelData[level] 
      && this.$store.state.levelData[level].completed)
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