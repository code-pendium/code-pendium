import Vue from "vue"
import Router from "vue-router"

import Home from "../views/Home"
import About from "../views/About"

import c_00 from "../views/levels/c_00"
import c_01 from "../views/levels/c_01"
import c_02 from "../views/levels/c_02"
import c_03 from "../views/levels/c_03"

Vue.use(Router)

var router = new Router({
  routes: [
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
    },
    {
      path: "/c-00",
      name: "C-00",
      title: "Introduction",
      slug: "c_00",
      type: "level",
      component: c_00
    },
    {
      path: "/c-01",
      name: "C-01",
      title: "Operators",
      slug: "c_01",
      type: "level",
      component: c_01
    },
    {
      path: "/c-02",
      name: "C-02",
      title: "Conditions",
      slug: "c_02",
      type: "level",
      component: c_02
    },
    {
      path: "/c-03",
      name: "C-03",
      title: "Basic Calculator",
      slug: "c_03",
      type: "level",
      component: c_03
    },
    { path: "*", redirect: "/home" }
  ]
})

export default router