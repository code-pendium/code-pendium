<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "SND-BX",
title = "Sandbox",
tags = [],
difficulty = 0,

description = 
`<p>
This is a Sandbox level. You are free to test and try out any code below.
</p>`,

defaultCode = 
``,

defaultInput = 
``

export default {
  components: {
    Level
  },

  data: () => ({
    properties: {
      name,
      title,
      tags,
      difficulty,
      description,
      defaultCode, 
      defaultInput,
      sandbox: true
    }
  })
}
</script>