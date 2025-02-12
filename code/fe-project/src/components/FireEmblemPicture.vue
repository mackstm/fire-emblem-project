<template>

  <img v-if="!showUnit" v-bind:src="unitImage" class="brightness-0 h-[200px]" alt="unit"/>

  <img v-else v-bind:src="unitImage" class="fade-in h-[200px]" alt="unit"/>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
  interface Props {
    unitName: string;
    showUnit?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    showUnit: false
  });

  const unitImage = computed(() =>
    `../../images/${props.unitName}.png`
  );

</script>

<style scoped>

</style>
