<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-02",
title = "Conditions",
tags = ["Basic"],
difficulty = 1,

description = 
`<p>
Conditions are a core part of every programming language. 
Conditional statements are used to perform different actions depending on different conditions. 
In this problem, we will be using <kbd>if</kbd>, <kbd>else</kbd>, and <kbd>else if</kbd> statements. 
</p>
<ul>
<li><kbd>if</kbd> is used to specify a block of code to be executed, if the specified condition is true.</li>
<li><kbd>else</kbd> is used  to specify a block of code to be executed, if the first condition is false.</li>
<li><kbd>else if</kbd> is used to specify a new condition to test, if the first condition is false.</li>
</ul>
<br>
<p>
In this problem, you will be making a function that returns something based on the given input <kbd>food</kbd>. 
The conditions to be followed are:
</p>
<ul>
<li>If <kbd>food</kbd> is <kbd>Apple</kbd>, it should return <kbd>Pie!</kbd>.</li> 
<li>If <kbd>food</kbd> is <kbd>Orange</kbd>, it should return <kbd>Juice!</kbd>.</li>
<li>If it is neither of those, it should simply return <kbd>false</kbd>.</li>
</ul>`,

inputFormat = 
`<p>
The input function <kbd>match()</kbd> takes only 1 arguments: <kbd>food</kbd>. This argument is a string.
</p>
<p>
Example Input: <kbd>match("Apple")</kbd>
</p>`,

outputFormat =
`<p>
The output is also a string, except when all the conditions fail. In that casem return <kbd>false</kbd>.
</p>
<p>
Example Output: <kbd>Pie!</kbd>
</p>`,

hint = 
`<p>
Every condition must contain a corresponding <kbd>return</kbd> statement (instructed in description). 
Do also note that strings have to be encased in quotes <kbd>'</kbd> or double quotes <kbd>"</kbd>. 
</p>
<p>
Example: <kbd>return "Foo"</kbd>
</p>`,

defaultCode = 
`function match(food) {
  // The conditions have already been given to you
  // Just fill in the required return statements
  if(food == "Apple") {
    
  } else if(food == "Orange") {

  } else {

  }
}`,

defaultInput = 
`match("Apple")`,

testInputs = ["Apple", "Orange", null],

inputFunction = `square`,

solution = (food) => {
  if(food == "Apple") {
    return "Pie!"
  } else if(food == "Orange") {
    return "Juice!"
  } else {
    return false
  }
},

validator = (a, b) => {
 return a == b
}

import random from "random"

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
    this.properties.testInputs[2] = [random.int(-100, 100)]
  }
}
</script>