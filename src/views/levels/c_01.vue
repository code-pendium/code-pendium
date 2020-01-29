<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-01",
title = "Introduction",
tags = ["Basic", "Arithmetic"],
difficulty = 1,

description = 
`<p>
Welcome to Codependium! This level aims to walk you through the basics of Codependium's level system, structure, and workflow. 
In general, each level revolves around a problem that requires some code to be executed using a set of inputs. 
You may choose to test your code by running it with the level's default testing input or by creating your own one. 
Once you are satisfied with your code, you may choose to submit it. 
Once submitted, your code will be tested against multiple different inputs. 
If your code passes all these tests, you complete the level!
Every level grants you a certain amount of stars <b>★</b> after completion, which is based on the level's difficulty. 
These stars may range from <b>1★</b> being the lowest and easiest to <b>10★</b> being the highest and most difficult.
</p>
<p>
Another thing to take note of is the Input Format and Output Format sections. 
It is important that you read these sections for each level very carefully. 
The Input Format section focuses on the general syntax for the input of each problem. 
It will describe the arguments necessary for the input function in detail, including constraints if there are any. 
As mentioned earlier, you may write your own inputs to test out your code. You may do this in the Run Input section. 
A very important rule within this section is that <b>inputs are read line by line</b>. 
This means every new line will be treated as another input. Inputs that take up more than one line will not work.
</p>
<p>
Now for the Output Format. It explains essentially the same things as the Input Format, but for the output instead. 
This section details what exactly your code should return. 
It is important to strictly follow the instructions stated in here, as it can affect your test results on submission. 
The Run Output section displays the output of your code, based on each input stated in the Run Input section. 
If you have multiple inputs then this section will output for each corresponding line. 
But do take note that some problems might have an output comprising of multiple lines. Consider this when having multiple inputs.
</p>
<p>
And finally, after all of that, here are the instructions for finishing this level!
</p>
<p>
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

    console.log(this.properties.testInputs) // eslint-disable-line
  }
}
</script>