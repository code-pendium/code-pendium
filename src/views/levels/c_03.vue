<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-03",
title = "Basic Calculator",
tags = ["Basic", "Arithmetic", "Calculator"],
difficulty = 3,

description = 
`<p>
Now to combine the two things that you've learned so far! 
In this problem you will be making a simple function that does basic arithmetic between two numerical inputs. 
The function must return a number by doing an operation between the two inputs. 
The operation is based on the given type specified by the input.
</p>`,

inputFormat =
`<p>
The input function <kbd>solve()</kbd> takes 3 arguments: <kbd>a</kbd>, <kbd>b</kbd>, and <kbd>type</kbd>. 
The arguments <kbd>a</kbd> and <kbd>b</kbd> are both numbers. 
The argument <kbd>type</kbd> is a string. 
The 4 possible values for this argument are <kbd>add</kbd>, <kbd>subtract</kbd>, <kbd>multiply</kbd>, and <kbd>divide</kbd>.
</p>
<p>
Example Input: <kbd>solve(1, 2, "add");</kbd>
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
Since there are <b>4 possible values</b> for the argument <kbd>type</kbd>, there should also be 4 different conditions for each one.
</p>
<p>
Example:
<br>
<kbd>if(type == "add") { 
   return a + b
 }</kbd>
</p>`,

defaultCode = 
`function solve(a, b, type) {
  // Your code here
}`,

defaultInput = 
`solve(1, 2, "add")`,

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
    var operations = ["add", "subtract", "multiply", "divide"]
    for(var i in operations) {
      var op = operations[i]
      var a = rnd(), b = rnd()
      this.properties.testInputs[i] = [a, b, op]
    }
  }
}
</script>