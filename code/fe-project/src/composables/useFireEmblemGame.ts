import fireEmblemApi from "@/modules/fecharacters/api/fireEmblemApi";
import type { FEListResponse, Unit } from "@/modules/fecharacters/interfaces/fe-list.response";
import { GameStatus } from "@/modules/fecharacters/interfaces/game-status.enum";
import { computed, onActivated, onMounted, reactive, ref } from "vue";

export function useFireEmblemGame() {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const unitList = ref<Unit[]>([]);
  const winCount = ref(0);
  const restartCounter = ref(0);
  const randomIndex = ref(0);
  const cluesARR = ref<string[]>([]);
  const maxError = ref(8);
  const errorCounter = ref(0);
  const cluesCounter = ref(0);

  const isLoading = computed(() => unitList.value.length === 0);

  const randomUnit = computed(() => {
    if (unitList.value[randomIndex.value].Name.match(/[’]/)) {
      let helpMe: string[] = unitList.value[randomIndex.value].Name.split("’");
      let newName = "";
      for (let i = 0; i < helpMe.length; i++) {
        if (i == helpMe.length - 1) {
          newName += helpMe[i];
        } else {
          newName += helpMe[i] + "'";
        }
      }
      unitList.value[randomIndex.value].Name = newName;
    }
    return unitList.value[randomIndex.value];
  })

  const getFECharacter = async () => {
    const response = await fireEmblemApi.get<FEListResponse>();
    let unitArray: Unit[]= response.data.units;
    console.log(unitArray[0].Name);
    return unitArray;
  }


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
    if(errorCounter.value >= maxError.value ) {
      gameStatus.value = GameStatus.Lost;

      startCounter();

      setTimeout(() => {
        restartGame();
      }, 5000);
      return;
    }



    if (name.toLowerCase() === randomUnit.value.Name.toLowerCase()) {
      gameStatus.value = GameStatus.Won;
        // confetti({
        //   particleCount: 300,
        //   spread: 150,
        //   origin: { y: 0.6 }
        // });
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


  }

  const selectClue = () =>{
    switch (cluesCounter.value) {
      case 1:
        cluesARR.value.push(randomUnit.value.Affin);
        break;
      case 2:
        let statsArr : string[] = [];
        statsArr.push("HP: " + randomUnit.value.HP);
        statsArr.push("STR: " + randomUnit.value.Str);
        statsArr.push("SKL: " + randomUnit.value.Skl);
        statsArr.push("SPD: " + randomUnit.value.Spd);
        statsArr.push("LCK: " + randomUnit.value.Lck);
        statsArr.push("DEF: " + randomUnit.value.Def);
        statsArr.push("RES: " + randomUnit.value.Res);
        statsArr.push("CON: " + randomUnit.value.Con);
        cluesARR.value.push(JSON.stringify(statsArr));
        break;
      case 3:
        cluesARR.value.push(randomUnit.value.Mov.toString());
        break;

      case 4:
        cluesARR.value.push("LVL: " + randomUnit.value.Lv);
      break;

      case 5:
        cluesARR.value.push(randomUnit.value.Class);
        break;
      default:
        break;
    }
  }

  const restartGame = async () => {
    gameStatus.value = GameStatus.Playing;
    randomIndex.value = Math.floor(Math.random() * unitList.value.length);
    cluesARR.value = [];
    cluesCounter.value = 0;
    errorCounter.value = 0;
  }

  onMounted(async () => {
    unitList.value = await getFECharacter();
    randomIndex.value = Math.floor(Math.random() * unitList.value.length)
  })

  return {
    gameStatus,
    isLoading,
    randomUnit,
    winCount,
    restartCounter,
    cluesARR,

    //methods
    checkAnswer
  }
}
