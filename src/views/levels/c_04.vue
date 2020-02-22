<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "../../components/Level"

const name = "C-04",
title = "Arrays",
tags = ["Fundamentals"],
difficulty = 2,

description = 
`<p>
Array is a data type that can store multiple values in a single variable. Think of it like a list. An example of an array would be:
</p>
<p>
<kbd>var fruits = ["Apple", "Orange", "Grape"]</kbd>
</p>
<p>
To access an element (value) from an array, we have to call it by it's <b>index number</b>. 
This is the position of the element in the array. The index number of an array <b>always starts with 0</b>. 
Using the same array example above, we can get the value <kbd>Grape</kbd> by doing the following: 
</p>
<p>
<kbd>var x = fruits[2]</kbd>
</p>
<p>
The variable <kbd>x</kbd> in here would equate to <kbd>Grape</kbd>, 
since we are calling the element in the array with the index number of <b>2</b>, 
which corresponds to <b>the third element of the array</b> (because arrays count from zero, as stated above). 
Calling elements from an array can also be done not just with numbers, we can also use variables. 
</p>
<p>
<kbd>var fibonacci = [1, 1, 2, 3, 5] 
 var i = fibonacci.length - 1
 var last = fibonacci[i]</kbd>
</p>
<p>
The variable <kbd>last</kbd> here equates to <kbd>5</kbd>, which is the last element in the array <kbd>fibonacci</kbd>. 
You might notice something new here, and it is the <kbd>length</kbd> property. 
Every array (and even strings) have this property. It tells us the total number of elements 
(or characters, if it's a string) within the array. 
If we want to get the index number of the last element of the array, we can use the said array's length value, and deduct 1 from it. 
We do this since arrays count from zero. 
In the example above, we set the variable <kbd>i</kbd> as an index number for the last element of the array. 
We can then use <kbd>i</kbd> to extract the last element of the <kbd>fibonacci</kbd> array, 
which is the value we assigned to the variable <kbd>last</kbd>.
</p>
<p>
Your task now is to create a function that gets the first and last element of a given array. Return both these values as an array.
</p>`,

inputFormat = 
`<p>
The input function <kbd>firstAndLast()</kbd> only has 1 argument: <kbd>array</kbd>. 
This argument is an array type that can contain any amount of elements.
</p>
<p>
Example Input: <kbd>firstAndLast([1, 2, 3, 4])</kbd>
</p>`,

outputFormat =
`<p>
The output of the function must be an array, with two elements being the first and last elements of the input array, respectively.
</p>
<p>
Example Output: <kbd>[1,4]</kbd>
</p>`,

hint = 
`<p>
</p>`,

defaultCode = 
`function firstAndLast(array) {
  // Your code here
}`,

defaultInput = 
`firstAndLast([1, 2, 3, 4])`,

testInputs = [null, null],

inputFunction = `firstAndLast`,

solution = (array) => {
  return [array[0], array[array.length - 1]]
},

validator = (a, b) => {
 return (a[0] == b[0] && a[1] == b[1])
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

  mounted() {
    this.properties.testInputs[0] = [[random.int(-100, 100)]]
    this.properties.testInputs[1] = [[]]
    var l = random.int(3, 10)
    for(var i = 0; i < l; i++) {
      this.properties.testInputs[1][0][i] = random.int(-100, 100)
    }
  }
}
</script>