<template>

  <img v-if="!showUnit" v-bind:src="unitImage" class="brightness-0 h-[200px]" alt="unit"/>

  <img v-else v-bind:src="unitImage" class="fade-in h-[200px]" alt="unit"/>

</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Props interface for the FireEmblemPicture component.
 */
interface Props {
  /**
   * The name of the unit to display in the image.
   */
  unitName: string;

  /**
   * Determines whether the unit should be displayed.
   * @default false
   */
  showUnit?: boolean;
}

/**
 * Component props with default values.
 */
const props = withDefaults(defineProps<Props>(), {
  showUnit: false,
});

/**
 * Computes the image path based on the unit's name.
 */
const unitImage = computed(() => `../../images/${props.unitName}.png`);

console.log(props.unitName);
</script>


<style scoped>

</style>
