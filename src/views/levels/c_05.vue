<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "C-05",
title = "Looping",
tags = ["Fundamentals"],
difficulty = 2,

description = 
`<p>
Looping is the process of executing a block of code a specific number of times. 
This is usually done for redundant tasks, and especially in arrays. 
The type of looping we will tackle in here is the <kbd>for</kbd> loop. Consider the following code below:
</p>
<p>
<kbd>var colors = ["Red", "Green", "Blue", "Black", "White"] 
 var text = ""
 text += colors[0] + "\\n"
 text += colors[1] + "\\n"
 text += colors[2] + "\\n"
 text += colors[3] + "\\n"
 text += colors[4] + "\\n"</kbd> 
</p>
In this example, we are trying to list down all the elements inside <kbd>colors</kbd> into a single multi-line string. 
We do this by <b>string concatenation</b>. The addition <kbd>+</kbd> operator can work on strings. 
The addition assignment operator <kbd>+=</kbd> adds the value stated to the variable. 
If we have an example, <kbd>x += y</kbd>, it is essentially the same as <kbd>x = x + y</kbd>. 
The escaped n character (\\n) corresponds to a new line character. 
If we execute and print out the output of the example code, it should look like this:
</p>
<p>
<kbd>"Red
 Green
 Blue
 Black
 White"</kbd>
</p>
<p>
Now what if we have not just 5, but 100 elements inside the <kbd>color</kbd> array? 
To save us some space and allow for more flexibility, we will utilize the <kbd>for</kbd> loop.
</p>
<p>
<kbd>var colors = ["Red", "Green", "Blue", "Black", "White"] 
 var text = ""
 for(var i = 0; i < colors.length; i++) {
   text += colors[i] += "\\n"
 }</kbd>
</p>
<p>
This may seem a little confusing, but we'll break it down. The basic <kbd>for</kbd> loop is comprised of 3 statements:
</p>
<p>
<kbd>for(statement1; statement2; statement3)</kbd>.
</p>
<p>
The first statement will be executed once.
We'll call this the <b>initial</b> statement. Usually this is where we'll define an <b>iterator</b> variable. 
The second statement defines the condition of the loop. 
So long as this condition is true, it will execute the code block within the loop. 
Usually, this is where we set the <b>condition</b> to limit the iterator. 
The third and last statement is executed every loop cycle. Usually this is where we iterate the iterator variable we've initially set.
</p>
<p>
With this, we can read the for loop above as follows:
<ul>
<li>Start the loop by defining <kbd>i</kbd> and setting it to <kbd>0</kbd>.</li>
<li>Set the condtion to <kbd>i < colors.length</kbd>. 
This means our loop will execute until the value of <kbd>i</kbd> exceeds the number of elements inside the <kbd>colors</kbd> array.</li>
<li>Set that for every loop cycle, add <kbd>1</kbd> to our iterator <kbd>i</kbd>. 
In here we use the shorthand <kbd>i++</kbd>, which is the same as <kbd>i += 1</kbd>.</li>
</ul>
</p>
<p>
With this, our <kbd>for</kbd> loop should cycle 5 times, with <kbd>i</kbd> going from <kbd>0</kbd> to <kbd>4</kbd>. 
We can then use <kbd>i</kbd> to substitute for the index number with <kbd>colors[i]</kbd> in <kbd>text += colors[i] += "\\n"</kbd>, 
essentially condensing our code earlier into this single statement.
</p>
<p>
Now that you have an idea as to how looping works, here's the problem for this level: 
You will be making a function that strings all the entries within the given input array into a single string, separated by  a space. 
<b>You may not use the <kbd>array.join()</kbd> method.</b>
</p>`,

inputFormat = 
`<p>
The input function <kbd>firstAndLast()</kbd> only has 1 argument: <kbd>array</kbd>. 
This argument is an array type that can contain any amount of elements.
</p>
<p>
Example Input: <kbd>stringArray(["Please", "help", "me"])</kbd>
</p>`,

outputFormat =
`<p>
The output must be a string of the input array combined together, with a space as a separator. 
You may also choose to trim excess spaces at the ends of the output, using the <kbd>string.trim()</kbd> method.
</p>
<p>
Example Output: <kbd>"Please help me "</kbd>
</p>`,

hint = 
`<p>
This problem's solution is quite similar to the example code given in the description, 
except that you have to use a space <kbd>" "</kbd> instead of a new line <kbd>"\\n"</kbd> character. 
You also have to return the <kbd>text</kbd> variable at the very <b>end of the function</b>, not within the loop.
</p>`,

defaultCode = 
`function stringArray(array) {
  // Your code here
}`,

defaultInput = 
`stringArray(["Please", "help", "me"])`,

testInputs = [[["I", "am", "so", "fucked", "with", "this", "deadline", "pls", "save", "me"]], null],

inputFunction = `stringArray`,

solution = (array) => {
  var str = ""
  for(var i = 0; i < array.length; i++) {
    str += array[i] + " "
  }
  return str
},

validator = (a, b) => {
 return a.trim() == b.trim()
},

precheck = (code) => {
  var invalidMatches = code.match(/(.join)/g)
  if(invalidMatches) 
    return "You cannot use the array.join() method"
  return true
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
      validator,

      precheck
    }
  }),

  mounted() {
    this.properties.testInputs[1] = [[]]
    var l = random.int(3, 10)
    for(var i = 0; i < l; i++) {
      this.properties.testInputs[1][0][i] = random.int(-100, 100)
    }
  }
}
</script>