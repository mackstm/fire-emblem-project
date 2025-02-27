import fireEmblemApi from "@/modules/fecharacters/api/fireEmblemApi";
import type { FEListResponse, Unit } from "@/modules/fecharacters/interfaces/fe-list.response";
import { GameStatus } from "@/modules/fecharacters/interfaces/game-status.enum";
import confetti from "canvas-confetti";
import { computed, onMounted, ref } from "vue";

/**
 * Composable for managing the Fire Emblem game logic.
 */
export function useFireEmblemGame() {
  /**
   * Represents the current game status (Playing, Won, Lost).
   */
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  /**
   * List of all Fire Emblem units retrieved from the API.
   */
  const unitList = ref<Unit[]>([]);

  /**
   * The number of times the player has won.
   */
  const winCount = ref(0);

  /**
   * Countdown timer before restarting the game.
   */
  const restartCounter = ref(0);

  /**
   * Index of the randomly selected unit in the unit list.
   */
  const randomIndex = ref(0);

  /**
   * Array storing the hints given to the player.
   */
  const cluesARR = ref<string[]>([]);

  /**
   * Maximum number of incorrect guesses allowed before losing.
   */
  const maxError = ref(8);

  /**
   * Tracks the number of incorrect guesses made by the player.
   */
  const errorCounter = ref(0);

  /**
   * Tracks the number of hints given to the player.
   */
  const cluesCounter = ref(0);

  /**
   * Determines if the game is still loading (i.e., waiting for unit data).
   */
  const isLoading = computed(() => unitList.value.length === 0);

  /**
   * Retrieves a random unit from the unit list.
   * Ensures special characters in names are properly formatted.
   */
  const randomUnit = computed(() => {
    if (unitList.value[randomIndex.value].Name.match(/[’]/)) {
      const aux: string[] = unitList.value[randomIndex.value].Name.split("’");
      let newName = "";
      for (let i = 0; i < aux.length; i++) {
        if (i == aux.length - 1) {
          newName += aux[i];
        } else {
          newName += aux[i] + "'";
        }
      }
      unitList.value[randomIndex.value].Name = newName;
    }
    return unitList.value[randomIndex.value];
  });

  /**
   * Fetches Fire Emblem character data from the API.
   * @returns {Promise<Unit[]>} A promise resolving to an array of unit objects.
   */
  const getFECharacter = async () => {
    const response = await fireEmblemApi.get<FEListResponse>();
    const unitArray: Unit[] = response.data.units;
    console.log(unitArray[0].Name);
    return unitArray;
  };

  /**
   * Starts a countdown timer before restarting the game.
   */
  const startCounter = () => {
    restartCounter.value = 5;
    const timer = setInterval(() => {
      restartCounter.value--;
      if (restartCounter.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  /**
   * Checks if the player's guess is correct.
   * If incorrect, increments the error counter and provides hints.
   * If the maximum number of errors is reached, the game is lost.
   * @param {string} name - The player's guessed unit name.
   */
  const checkAnswer = (name: string) => {
    if(name.trim().length <= 0){
      return;
    }

    if (errorCounter.value >= maxError.value) {
      gameStatus.value = GameStatus.Lost;
      startCounter();
      setTimeout(() => {
        restartGame();
      }, 5000);
      return;
    }

    if (name.toLowerCase() === randomUnit.value.Name.toLowerCase()) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 100,
        spread: 300,
        origin: { y: 0.6 },
        ticks: 100
      });
      winCount.value++;

      startCounter();

      setTimeout(() => {
        restartGame();
      }, 5000);
    } else {
      cluesCounter.value++;
      errorCounter.value++;
      selectClue();
    }
  };

  /**
   * Provides hints based on the number of incorrect attempts.
   */
  const selectClue = () => {
    switch (cluesCounter.value) {
      case 1:
        cluesARR.value.push("AFINIDAD: " + randomUnit.value.Affin);
        break;
      case 2:
        let statsArr: string[] = [];
        statsArr.push("VIDA: " + randomUnit.value.HP);
        statsArr.push("ATAQUE: " + randomUnit.value.Str);
        statsArr.push("HABILIDAD: " + randomUnit.value.Skl);
        statsArr.push("VELOCIDAD: " + randomUnit.value.Spd);
        statsArr.push("SUERTE: " + randomUnit.value.Lck);
        statsArr.push("DEFENSA: " + randomUnit.value.Def);
        statsArr.push("RESISTENCIA: " + randomUnit.value.Res);
        statsArr.push("CONSTITUCION: " + randomUnit.value.Con);
        cluesARR.value.push(statsArr.join(";"));
        break;
      case 3:
        cluesARR.value.push("MOVIMIENTO: " + randomUnit.value.Mov.toString());
        break;
      case 4:
        cluesARR.value.push("LVL: " + randomUnit.value.Lv);
        break;
      case 5:
        cluesARR.value.push("CLASE: " + randomUnit.value.Class);
        break;
      default:
        break;
    }
  };

  /**
   * Restarts the game by resetting counters and selecting a new random unit.
   */
  const restartGame = async () => {
    // if(unitList.value.length == 0){
    //   console.log("sin prrsonajes");
    //   return;
    // }

    gameStatus.value = GameStatus.Playing;
    // unitList.value.splice(randomIndex.value, 1);
    const previousIndex = randomIndex.value;
    randomIndex.value = Math.floor(Math.random() * unitList.value.length);

    let sameCharacter = true;

    while(sameCharacter) {
      if(previousIndex != randomIndex.value){
        sameCharacter = false;
      } else {
        randomIndex.value = Math.floor(Math.random() * unitList.value.length);
      }
    }

    cluesARR.value = [];
    cluesCounter.value = 0;
    errorCounter.value = 0;
  };

  /**
   * Lifecycle hook: Fetches Fire Emblem characters when the component is mounted.
   */
  onMounted(async () => {
    unitList.value = await getFECharacter();
    randomIndex.value = Math.floor(Math.random() * unitList.value.length);
  });

  return {
    gameStatus,
    isLoading,
    randomUnit,
    winCount,
    restartCounter,
    cluesARR,
    errorCounter,

    // Methods
    checkAnswer,
  };
}
