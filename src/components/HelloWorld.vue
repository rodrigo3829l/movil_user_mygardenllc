<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <button @click="incrementCounter">Click Me</button>
      <p>Counter: {{ counter }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup() {
      const counter = ref(0);
  
      const incrementCounter = () => {
        counter.value += 1;
      };
  
      return {
        counter,
        incrementCounter,
      };
    },
  });
  </script>
  
  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
  