<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-01",
title = "Operators",
tags = ["Basic"],
difficulty = 1,

description = 
`<p>
In this problem, you will be making a simple function that adds two variables. We can achieve this by using <b>operators</b>. 
The 4 most basic operators are addition<kbd>+</kbd>, subtraction<kbd>-</kbd>, multiplication<kbd>*</kbd>, and division<kbd>/</kbd>. 
There is also the assigment operator <kbd>=</kbd> which we can use to assign values to a variable. 
Combining all these, we can create a <b>statement</b>.
</p>
<p>
Example:
</p>
<p>
<kbd>var a = 1
 var b = 2
 var c = a + b</kbd>
</p>
<p>
The variable <kbd>c</kbd> here becomes <kbd>3</kbd>
</p>`,

inputFormat =
`<p>
The input function <kbd>add()</kbd> takes 2 arguments: <kbd>a</kbd> and <kbd>b</kbd>. 
The arguments are both numbers. 
</p>
<p>
Example Input: <kbd>add(1, 2)</kbd>
</p>`,

outputFormat =
`<p>
The output of the function must be a number.
</p>
<p>
Example Output: <kbd>3</kbd>
</p>`,

hint = 
`<p>
You only need to assign a value to <kbd>result</kbd>. 
The value should be the result of adding the arguments <kbd>a</kbd> and <kbd>b</kbd>.
</p>`,

defaultCode = 
`function add(a, b) {
  // Edit the line below
  var result
  return result
}`,

defaultInput = 
`add(1, 2)`,

testInputs = [null, null, null, null],

inputFunction = `add`,

solution = (a, b) => {
  var result = a + b
  return result
},

validator = (a, b) => {
 return a == b
}

import random from "random"

export default {
  components: {
    Level,
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
  }),

  mounted () {
    for(var i in this.properties.testInputs) {
      this.properties.testInputs[i] = [random.int(0, 100), random.int(0, 100)]
    }
  }
}
</script>