<template>
  <section v-if="isLoading">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando personajes</h3>
  </section>
  <section v-else>
    <h1>Adivinar personaje de Fire Emblem: The Sacred Stones</h1>

    <h3 class="mt-2">
      {{ gameStatus === GameStatus.Playing ? 'Adivina el personaje' : 'Intentalo de nuevo en: ' + restartCounter }}
    </h3>

    <h3 class="mt-2" v-if="gameStatus !== GameStatus.Playing">
      {{
        randomUnit.Name.toLocaleUpperCase()}}
    </h3>
    <FireEmblemPicture :unitName="randomUnit.Name.toLowerCase()"
    :showUnit="gameStatus !== GameStatus.Playing"/>

    <form @submit.prevent="sendAnswer">
      <input v-if="gameStatus != GameStatus.Playing" v-model="guess" type="text"  placeholder="Adivina!" disabled />
      <input v-else type="text" v-model="guess" placeholder="Adivina!" />
      <button type="submit" :disabled="gameStatus !== GameStatus.Playing">Adivina!</button>
    </form>


    <div class="text-sm mt-2">
      Victorias: {{ winCount }}
    </div>

    <div class="text">
      <ul>
        <li v-for="item in cluesARR">
          {{ item }}
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { useFireEmblemGame } from '../composables/useFireEmblemGame';
import FireEmblemPicture from '@/components/FireEmblemPicture.vue';
import { GameStatus } from '../modules/fecharacters/interfaces/game-status.enum';
import { ref } from 'vue';

/**
 * The user's input for guessing the Fire Emblem character.
 */
const guess = ref('');

/**
 * Submits the user's guess and resets the input field.
 */
const sendAnswer = () => {
  checkAnswer(guess.value);
  guess.value = "";
};

/**
 * Destructured properties from the Fire Emblem game composable.
 */
const {
  /** The current status of the game (e.g., playing, won, lost). */
  gameStatus,

  /** Indicates whether the game is loading. */
  isLoading,

  /** The randomly selected Fire Emblem unit for the current round. */
  randomUnit,

  /** The player's win count. */
  winCount,

  /** Resets the game counter. */
  restartCounter,

  /** Array of clues available for the player. */
  cluesARR,

  /** Function to check if the player's guess is correct. */
  checkAnswer
} = useFireEmblemGame();
</script>


<style scoped>

section {
  @apply flex flex-col justify-center items-center w-screen h-screen
}

</style>

