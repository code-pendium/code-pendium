<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "C-06",
title = "Step Calculator",
tags = ["Basic", "Arithmetic", "Calculator"],
difficulty = 3,

description = 
`<p>
In a previous problem, you've created a simple 4-operation calculator. 
Now that you've learned a little bit about arrays and looping, it's time to one it up and make a slightly more advanced version. 
In this problem, you will be making a step calculator. Each input will consist of multiple "steps" that the calculator should execute. 
Your program must output the result of executing all these steps in the order that they are given.
</p>`,

inputFormat = 
`<p>
The input function <kbd>calculate()</kbd> takes 2 arguments: <b>initial</b> and <b>steps</b>. 
The first argument would be the initial value of the calculation. This value gets mutated as each step passes through the function. 
The <b>steps</b> argument is an array. This array will contain instructions for each step. A step is an array with two elements. 
The first element is a number. The second element is an operation (<b>add</b>, <b>subtract</b>, <b>multiply</b>, <b>divide</b>).
</p>
<p>
Example Input: <kbd>calculate(1, [[2, "add"], [3, "add"], [4, "subtract"]])</kbd>
</p>`,

outputFormat =
`<p>
The ouput of the function is the final value after every step has been executed. The output must be a number. 
If the input has no steps specified, return the initial value.
<p>
Example Output: <kbd>2</kbd>
</p>
</p>`,

hint =
`<p>
This problem is all about modifying the <kbd>initial</kbd> variable with every "step" within the <kbd>steps</kbd> array, 
and then finally returning it after all steps have been done. 
Also note that every "step" is in an array format. You will notice that the <kbd>steps</kbd> array, contains arrays (the "steps"). 
To access the value of an individual step, you may re-use the same format, like so:
</p>
<p>
<kbd>for(var i = 0; i < steps.length; i++) { 
   var number = steps[i][0]
   var type = steps[i][1]
 }</kbd>
</p>
<p>
In here, we are trying to get the <kbd>number</kbd> value, which is the first <kbd>[0]</kbd> element on a "step" object. 
We do this by first getting the specific step with <kbd>step[i]</kbd>, and then adding in the <kbd>[0]</kbd>. 
The same can be done for the <kbd>type</kbd> variable, and since it is the second element, we use <kbd>[1]</kbd>.
</p>
<p>
Alternatively, we can also do:
</p>
<kbd>var step = steps[i]
 var number = step[0] 
 var type = step[1] </kbd>
</p>
<p>A bit longer, but this format has better readability.
</p>`,

defaultCode = 
`function calculate(initial, steps) {
  // Your code here
}`,

defaultInput = 
`calculate(1, [[2, "add"], [3, "add"], [4, "subtract"]]);`,

testInputs = [null, null, null],

inputFunction = `calculate`,

solution = (initial, steps) => {
  for(var i in steps) {
    var n = steps[i][0]
    var type = steps[i][1]
    if(type == "add") 
      initial += n
    if(type == "subtract") 
      initial -= n
    if(type == "multiply") 
      initial *= n
    if(type == "divide") 
      initial /= n
  }
  return initial
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

    // First Test
    this.properties.testInputs[0] = [rnd(), []]
    for(let i in operations)
    {
      let op = operations[i]
      let n = rnd()
      this.properties.testInputs[0][1][i] = [n, op]
    }
    
    // Second Test
    this.properties.testInputs[1] = [rnd(), []]

    // Third Test
    this.properties.testInputs[2] = [rnd(), []]
    var rndSteps = random.int(2, 10)
    for(let i = 0; i < rndSteps; i++) {
      let rndOp = random.int(0, 3)
      let op = operations[rndOp]
      let n = rnd()
      this.properties.testInputs[2][1][i] = [n, op]
    }
  }
}
</script>