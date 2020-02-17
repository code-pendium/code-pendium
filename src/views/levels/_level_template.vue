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
`<p>
</p>`,

inputFormat = 
`<p>
</p>
<p>
Example Input: <kbd></kbd>
</p>`,

outputFormat =
`<p>
</p>
<p>
Example Output: <kbd></kbd>
</p>`,

hint = 
`<p>
</p>`,

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
      hint,

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