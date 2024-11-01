<template>
  <div>
    <div>
      <h1>
        {{ msg }}
      </h1>
      <p>...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  msg: string;
}

const props = defineProps<Props>();
</script>
