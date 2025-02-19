<template>
  <section class="flex flex-col justify-center items-center w-screen h-screen" v-if="isLoading">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando personajes</h3>
  </section>
  <section class="flex flex-col justify-center items-center w-screen md:h-screen" v-else>
    <img class="mt-4 md:mt-0" src="../../images/assets/fe8-logo.png" alt="logo" >
    <h3 class="mt-2 font-bold text-[20px] mb-2">
          {{ gameStatus === GameStatus.Playing ? 'JUGANDO...' : 'INTÉNTALO DE NUEVO: ' + restartCounter }}
    </h3>

    <div class="md:flex md:flex-row w-[65%] justify-evenly items-center">
      <div class="flex flex-col items-center">


          <h3 class="mb-3 font-bold text-[25px] my-outline" v-if="gameStatus !== GameStatus.Playing">
          <span v-if="gameStatus == GameStatus.Won" class="text-green-500">
            {{
              randomUnit.Name.toLocaleUpperCase()
            }}
          </span>

          <span v-else class="text-red-500">
            {{
              randomUnit.Name.toLocaleUpperCase()
            }}
          </span>

          </h3>
          <FireEmblemPicture :unitName="randomUnit.Name.toLowerCase()"
          :showUnit="gameStatus !== GameStatus.Playing"/>




      </div>


      <v-card class="bg-black mb-4 md:h-[38rem]" elevation="16" min-width="300" max-width="400" >
        <v-card-item>
          <v-card-title> Pistas </v-card-title>
          <v-card-subtitle> Acerca del personaje... </v-card-subtitle>
        </v-card-item>
        <v-card-text class="h-1/12">
          <ul>
            <li v-for="(item, index) in cluesARR" :key="index">
                <ul v-if="index == 1">
                  <li class="flex justify-between items-center mt-1" v-for="(item2, index2) in item.split(';')" :key="index2">
                    <p class="font-bold me-2">
                      {{ item2.split(':')[0] }}
                    </p>

                    <v-progress-circular
                      class="font-bold"
                      color="green"
                      bg-color="#7d7d7d"
                      :model-value="calcStatForBar(item2.split(':'))"
                      size="50"
                    >
                      {{ item2.split(':')[1].trim() }}
                  </v-progress-circular>
                  </li>
                </ul>

                <p class="font-bold" v-else>{{ item }}</p>
            </li>
          </ul>
        </v-card-text>
      </v-card>



    </div>

    <div class="text-sm mb-2 font-bold">
      VICTORIAS: {{ winCount }}
    </div>

      <form class="flex flex-row justify-center items-center" @submit.prevent="sendAnswer">
          <!-- <input class="bg-white h-[10px]" v-if="gameStatus != GameStatus.Playing"type="text"  placeholder="Escribe aquí" disabled />
          <input class="bg-white h-10 rounded-full" v-else type="text" v-model="guess" placeholder="Escribe aquí" /> -->
          <v-text-field
            v-if="gameStatus != GameStatus.Playing"
            name="Adivina"
            label="Escribe aquí"
            id="id"
            width="200"
            disabled
          ></v-text-field>

          <v-text-field
            v-else
            name="Adivina"
            label="Escribe aquí"
            id="id"
            width="200"

            background-color="success"
            v-model="guess"
          ></v-text-field>

          <v-btn type="submit" :disabled="gameStatus !== GameStatus.Playing"
            class="ms-10"
            base-color="gray"
            active-color="#eac476"
            text="Adivina!"
            :active="gameStatus == GameStatus.Playing"
          ></v-btn>
        </form>





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

const calcStatForBar = (stat: string[]) => {
  if (stat[0] == 'VIDA') {
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

.my-outline {
  text-shadow:
   -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
     1px 1px 0 #fff;

}
</style>

