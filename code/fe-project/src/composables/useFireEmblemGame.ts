import fireEmblemApi from "@/modules/fecharacters/api/fireEmblemApi";
import type { FEListResponse, Unit } from "@/modules/fecharacters/interfaces/fe-list.response";
import { GameStatus } from "@/modules/fecharacters/interfaces/game-status.enum";
import { computed, onActivated, onMounted, ref } from "vue";

export function useFireEmblemGame() {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const unitList = ref<Unit[]>([]);
  const winCount = ref(0);
  const restartCounter = ref(0);
  const randomIndex = ref(0);

  const isLoading = computed(() => unitList.value.length === 0);

  const randomUnit = computed(() => {
    return unitList.value[randomIndex.value];
  })

  const getPokemon = async () => {
    const response = await fireEmblemApi.get<FEListResponse>();
    let unitArray: Unit[]= response.data.units;
    console.log(unitArray[0].Name);
    return unitArray;
  }

  onMounted(async () => {
    unitList.value = await getPokemon();
    randomIndex.value = Math.floor(Math.random() * unitList.value.length)
  })

  const startCounter = () => {
    restartCounter.value = 5;
    const timer = setInterval(() => {
      restartCounter.value--;
      if (restartCounter.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  const checkAnswer = (name: string) => {
    if (name.toLowerCase() === randomUnit.value.Name.toLowerCase()) {
      gameStatus.value = GameStatus.Won;
      // confetti({
      //   particleCount: 300,
      //   spread: 150,
      //   origin: { y: 0.6 }
      // });
      winCount.value++;
    } else {
      gameStatus.value = GameStatus.Lost;
    }

    startCounter();

    setTimeout(() => {
      restartGame();
    }, 5000);
  }

  const restartGame = async () => {
    gameStatus.value = GameStatus.Playing;
    randomIndex.value = Math.floor(Math.random() * unitList.value.length);
  }

  return {
    gameStatus,
    isLoading,
    randomUnit,
    winCount,
    restartCounter,

    //methods
    checkAnswer
  }
}
