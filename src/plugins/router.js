import Vue from "vue"
import Router from "vue-router"

import Home from "../views/Home"
import About from "../views/About"

import c_01 from "../views/levels/c_01"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      icon: "fas fa-home",
      type: "navigation",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      icon: "fas fa-info-circle",
      type: "navigation",
      component: About
    },
    {
      path: "/c-01",
      name: "C-01",
      title: "Introduction",
      slug: "c_01",
      type: "level",
      component: c_01
    },
    { path: "*", redirect: "/home" }
  ]
})
