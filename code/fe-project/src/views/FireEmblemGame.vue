<template>
  <section v-if="isLoading">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando personajes</h3>
  </section>
  <section v-else>
    <h1>Adivinar personaje de Fire Emblem: The Sacred Stones</h1>

    <div class="flex w-[65%] justify-between">
      <div class="flex flex-col items-start">
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
          <input v-else type="text" v-model="guess" placeholder="Escribe aquí" />
          <v-btn color="success" type="submit" :disabled="gameStatus !== GameStatus.Playing">Adivina!</v-btn>
        </form>

      </div>
      <div class="flex flex-col items-end">
        <div class="text-sm mt-2">
          Victorias: {{ winCount }}
        </div>

        <div class="text">
          <ul>
            <li v-for="(item, index) in cluesARR" :key="index">
                <ul v-if="index == 1">
                  <li class="flex justify-between items-center mt-1" v-for="(item2, index2) in item.split(';')" :key="index2">
                    <p class="me-2">
                      {{ item2.split(':')[0] }}
                    </p>

                    <v-progress-circular
                      color="green"
                      :model-value="calcStatForBar(item2.split(':'))"
                      size="50"
                    >
                      {{ item2.split(':')[1].trim() }}
                  </v-progress-circular>
                  </li>
                </ul>

                <p v-else>{{ item }}</p>
            </li>
          </ul>
        </div>
      </div>
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
const example = ref(50);

const calcStatForBar = (stat: string[]) => {
  if (stat[0] == 'HP') {
    return parseInt(stat[1].trim()) * 100 / 50;
  }

  return parseInt(stat[1].trim()) * 100 / 20;
}

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

