<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "C-00",
title = "Introduction",
tags = [],
difficulty = 1,

description = 
`<p>
Welcome to Codependium! This level aims to walk you through the basics of Codependium's level system, structure, and workflow. 
In general, each level revolves around a problem that requires some code to be executed using a set of inputs. 
To finish a level, you must submit a program to fulfill the needs of the problem given. This is done by writing code. 
Before submitting, you may choose to test your code by running it with the level's default testing input, or by setting your own one. 
Once you are satisfied with the results of your code, you may choose to submit it. 
Submitting will take your code and test it against multiple different test inputs. 
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
This means that every new line will be treated as another input. Inputs that take up more than one line will not work.
</p>
<p>
Now for the Output Format. It essentially explains the same things as the Input Format, but for the output instead. 
This section details how and what exactly your code should return. 
It is important to strictly follow the instructions stated in here, as it can affect your test results upon submission. 
The Run Output section displays the output of your code, based on each input stated in the Run Input section. 
If you have multiple inputs then this section will output for each corresponding line. 
But do take note that some problems might have an output comprising of multiple lines. Consider this when having multiple inputs.
</p>
<p>
And finally, after all of that, here are the instructions for finishing this level: 
You will be making a basic function that simply just returns the input given. 
Returning an output is the very core of every function, and this is how every level will play out onwards.
</p>`,

inputFormat =
`<p>
The input function <kbd>say()</kbd> takes only a single argument: <kbd>something</kbd>. This argument may be of any data type.
</p>
<p>
Example Input: <kbd>say("Hello World")</kbd>
</p>`,

outputFormat =
`<p>
The output of the function is simply the given input.
</p>
<p>
Example Output: <kbd>Hello World</kbd>
</p>`,

hint = 
`<p>
Erase the double slash <kbd>//</kbd> before <kbd>return something</kbd> to un-comment the statement.
</p>`,

defaultCode = 
`function say(something) {
  // This is a comment, it will not be read by the compiler
  // To finish this level, simply remove the double slash (//) on the next line
  // return something
  // The line above is a return statement
  // It simply returns the argument "something", which is passed through the function
}`,

defaultInput = 
`say("Hello World");`,

testInputs = [null, null, null],

inputFunction = `say`,

solution = (something) => {
  return something
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
      solution
    }
  }),

  mounted () {
    for(var i = 0; i < this.properties.testInputs.length; i++) {
      this.properties.testInputs[i] = [random.int(-100, 100)]
    }
  }
}
</script>