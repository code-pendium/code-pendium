<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "",
title = "",
tags = [],
difficulty = 0,

description = 
``,

inputFormat = 
``,

outputFormat =
``,

defaultCode = 
``,

defaultInput = 
``,

testInputs = [],

inputFunction = ``,

solution = () => {
},

validator = (a, b) => {
 return a == b
}

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
      inputFormat,
      outputFormat,

      defaultCode, 
      defaultInput,

      testInputs,
      inputFunction,
      solution,
      validator
    }
  })
}
</script>