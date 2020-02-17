<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-01",
title = "Basic Calculator",
tags = ["Basic", "Arithmetic"],
difficulty = 1,

description = 
`<p>
You will be making a simple function that does basic arithmetic between two numerical inputs. 
The function must return a number by doing an operation between the two inputs. 
The operation is based on the given type specified by the input.
</p>`,

inputFormat =
`<p>
The input function <kbd>solve()</kbd> takes 3 arguments: <b>a</b>, <b>b</b>, and <b>type</b>. 
The arguments <b>a</b> and <b>b</b> are both numbers. 
The argument <b>type</b> is a string. 
The 4 possible values for this argument are <b>add</b>, <b>subtract</b>, <b>multiply</b>, and <b>divide</b>.
</p>
<p>
Example Input: <kbd>solve(1, 2, "add");</kbd>
</p>`,

outputFormat =
`<p>
The output of the function must be a number. Use the <kbd>return</kbd> statement.
</p>
<p>
Example Output: <kbd>3</kbd>
</p>`,

defaultCode = 
`function solve(a, b, type) {
  // Your code here
}`,

defaultInput = 
`solve(1, 2, "add");`,

testInputs = [null, null, null, null],

inputFunction = `solve`,

solution = (a, b, type) => {
  if(type == "add") 
    return a + b
  if(type == "subtract") 
    return a - b
  if(type == "multiply") 
    return a * b
  if(type == "divide") 
    return a / b
},

validator = (a, b) => {
 return a == b
}

import random from "random"

function rnd() {
  return random.int(-100, 100)
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
  }),

  mounted () {
    var operations = ["add", "subtract", "multiply", "divide"]
    for(var i in operations) {
      var op = operations[i]
      var a = rnd(), b = rnd()
      this.properties.testInputs[i] = [a, b, op]
    }
  }
}
</script>