<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "C-X²",
title = "Square",
tags = ["Intermediate", "Looping", "String"],
difficulty = 4,

description = 
`<p>
This is a <b>bonus level</b> to test your skills even further! 
You may try your best at answering, or skip this for now and go back when you think you're ready.
</p>
<p>
You must write a program to output a square based on a given integer. 
The square will be made out of white square <kbd>⬜</kbd> characters, and will be outputted as a string. 
The input will also have an option of whether to have the square filled or outlined. 
A filled square will fill in the insides, while an outlined square will only have the edges. 
The insides of an outlined sqaure will be replaced with black square <kbd>⬛</kbd> characters instead.
</p>`,

inputFormat = 
`<p>
The input function <kbd>square()</kbd> takes 2 arguments: <b>size</b> and <b>filled</b>. 
The argument <b>size</b> is a positive integer. 
The argument <b>filled</b> is a boolean which determines if the square should be filled or not. 
If <b>filled</b> is false, the sqaure should only have the edges.
</p>
<p>
Example Input: <kbd>square(4, false)</kbd>
</p>`,

outputFormat =
`<p>
The output is a string that that forms a square.
</p>
<p>
Example Output:
</p>
<p>
<kbd>⬜⬜⬜⬜ 
 ⬜⬛⬛⬜ 
 ⬜⬛⬛⬜ 
 ⬜⬜⬜⬜</kbd>
<p>
(Some of the lines here have been shifted to align accordingly)
</p>
</p>`,

defaultCode = 
`function square(size, filled) {
  // Your code here
}`,

defaultInput = 
`square(4, false)`,

testInputs = [null, null],

inputFunction = `square`,

solution = (size, filled) => {
  var squareStr = ""
  for(var i = 1; i <= size; i++) {
    var row = ""
    for(var j = 1; j <= size; j++) {
      if(!filled) {
        if(i > 1 && i < size && j > 1 && j < size) {
          row += "⬛"
          continue
        }
      }
      row += "⬜"
    }
    row += i == size ? "" : "\n"
    squareStr += row
  }
  return squareStr
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

      defaultCode, 
      defaultInput,

      testInputs,
      inputFunction,
      solution
    }
  }),

  mounted () {
    this.properties.testInputs[0] = [random.int(10, 100), true]
    this.properties.testInputs[1] = [random.int(10, 100), false]
  }
}
</script>