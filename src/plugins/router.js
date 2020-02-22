import Vue from "vue"
import Router from "vue-router"

import Home from "../views/Home"
import About from "../views/About"

const levels = [
  ["c_00", "Introduction"],
  ["c_01", "Operators"],
  ["c_02", "Conditions"],
  ["c_03", "Basic Calculator"],
  ["c_04", "Arrays"],
  ["c_05", "Looping"],
  ["c_06", "Step Calculator"]
]

function load(component) {
  return () => import(`@/views/levels/${component}.vue`)
}

const routes = [
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    icon: "home",
    type: "navigation",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    icon: "info",
    type: "navigation",
    component: About
  }
]

for (var i in levels) {
  var slug = levels[i][0]
  var path = slug.replace(/_/g, "-")
  var name = path.toUpperCase()
  var title = levels[i][1]
  var route = {
    path: "/" + path,
    name, slug, title,
    type: "level",
    component: load(slug)
  }
  routes.push(route)
}

Vue.use(Router)
export default new Router({ routes })