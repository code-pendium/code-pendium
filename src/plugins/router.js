import Vue from "vue"
import Router from "vue-router"

const Home  = () => import("@/views/Home")
const About = () => import("@/views/About")
const Page404 = () => import("@/views/404")

const levels = [
  ["c_00", "Introduction"],
  ["c_01", "Operators"],
  ["c_02", "Conditions"],
  ["c_03", "Basic Calculator"],
  ["c_04", "Arrays"],
  ["c_05", "Looping"],
  ["c_06", "Step Calculator"],
  ["c_x2", "Square"]
]

function load(component) {
  return () => import(`@/views/levels/${component}.vue`)
}

const routes = [
  {
    path: "*",
    component: Page404
  },
  {
    path: "/",
    name: "Home",
    icon: "mdi-home",
    type: "navigation",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    icon: "mdi-information",
    type: "navigation",
    component: About
  },
]

for (var i in levels) {
  var slug = levels[i][0]
  var path = slug.replace(/_/g, "-")
  var name = path.toUpperCase()
  var title = levels[i][1]
  var route = {
    path: "/level/" + path,
    name, slug, title,
    type: "level",
    component: load(slug)
  }
  routes.push(route)
}

Vue.use(Router)
export default new Router({
  mode: "history",
  routes
})