<template>
  <Level
  v-bind="properties"
  ></Level>
</template>

<script>
import Level from "@/components/Level"

const name = "C-03",
title = "Is it a Palindrome?",
tags = ["Intermediate", "String"],
difficulty = 4,

description = 
`<p>
A palindrome, by definition,  is a word, number, phrase, or other sequence of characters which reads the same backward as forward. 
Some examples of palindrome words in the English language are level, noon, mom, and racecar. 
Your task now is to determine whether a given string is a palindrome, or not. 
Do note that this problem will not be limited to only words. Your program must also be able to handle phrases. 
Symbols and spaces won't matter, so long as the sequence of characters within the phrase can be considered as a palindrome.
</p>`,

inputFormat = 
`<p>
The input function <kbd>isPalindrome()</kbd> takes only one argument: <b>str</b>. This argument is an alphanumerical string.
</p>
<p>
Example Input: <kbd>isPalindrome("Never odd or even")</kbd>
</p>`,

outputFormat =
`<p>
The ouput is a string with a certain syntax: <kbd>{str} {is|is not} a palindrome</kbd>.
</p>
<p>
Example Output: <kbd>"Never odd or even" is a palindrome</kbd>
</p>`,

defaultCode = 
`function isPalindrome(str) {
  // Your code here
}`,

defaultInput = 
`isPalindrome("Never odd or even")`,

testInputs = [null, null, 
["A man, a plan, a canal – Panama"],
["Madam, I'm Adam!"],
["Doc, note: I dissent. A fast never prevents a fatness. I diet on cod"],
["The quick brown fox jumps over the lazy dog"],
],

inputFunction = `isPalindrome`,

solution = (str) => {
  var absStr = str.toLowerCase().replace(/[^0-9a-z]/g, "")
  var reverseStr = absStr.split().reverse().join("")
  return `"${str}" is${absStr == reverseStr ? "" : " not"} a palindrome`
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

      defaultCode, 
      defaultInput,

      testInputs,
      inputFunction,
      solution,
      validator
    }
  }),

  mounted() {
    var rnd = random.int(1000, 9999).toString()
    var reverse = rnd.split().reverse().join("")
    this.properties.testInputs[0] = [rnd]
    this.properties.testInputs[1] = [rnd + reverse]
  }
}
</script>