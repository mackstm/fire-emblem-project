<template>
  <section v-if="isLoading">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>
  <section v-else>
    <h1>Adivinar personaje de Fire Emblem: The Sacred Stones</h1>

    <h3 class="mt-2">
      {{ gameStatus === GameStatus.Playing ? 'Adivina el personaje' : 'Intentalo de nuevo en: ' + restartCounter }}
    </h3>

    <FireEmblemPicture :unitName="randomUnit.Name.toLowerCase()" :showUnit="gameStatus !== GameStatus.Playing"/>

    <form @submit.prevent="sendAnswer">
      <input type="text" v-model="guess" placeholder="Adivina!"/>
      <button type="submit">Adivina!</button>
    </form>


    <div class="text-sm mt-2">
      Victorias: {{ winCount }}
    </div>

  </section>
</template>

<script setup lang="ts">
import { useFireEmblemGame } from '../composables/useFireEmblemGame';
import FireEmblemPicture from '@/components/FireEmblemPicture.vue';
import { GameStatus } from '../modules/fecharacters/interfaces/game-status.enum';
import { ref } from 'vue';

const guess = ref('');

const sendAnswer = () => {
  checkAnswer(guess.value);
}

const { gameStatus,
    isLoading,
    randomUnit,
    winCount,
    restartCounter,
    checkAnswer } = useFireEmblemGame();

</script>

<style scoped>

section {
  @apply flex flex-col justify-center items-center w-screen h-screen
}

</style>

