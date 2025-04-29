import { sendName } from "./main.js";
import { sendDifficultyToServer } from "./main.js";
import { sendPlayerMovement } from "./main.js";
import { sendReady } from "./main.js";
import { sendRestart } from "./main.js";

export class KeyHandler {
  constructor() {
    this.gameStart = 0;
    //Click to send name to server --Sebastian
    document.getElementById("submitName").onclick = function () {
      let name = document.getElementById("inputName").value;
      if (name !== "") {
        sendName(name);
      }
    };
    //click to choose difficulty --Sebastian
    let difficulty = 0;
    document.getElementById("easy").onclick = () => (difficulty = 1);
    document.getElementById("middle").onclick = () => (difficulty = 2);
    document.getElementById("hard").onclick = () => (difficulty = 3);
    document.getElementById("submitDifficulty").onclick = function () {
      if (difficulty !== 0) {
        sendDifficultyToServer(difficulty);
      }
    };
    //click to be ready to play --Sebastian
    document.getElementById("ready").onclick = function () {
      sendReady();
      document.getElementById("ready").disabled = true;
    };
    document.getElementById("restart").onclick = function () {
      sendRestart();
    };
  }
  //player moves --Janka
  startGame() {
    if (this.gameStart === 0) {
      document.addEventListener("keydown", (event) => {
        if (
          event.code === "ArrowRight" ||
          event.code === "ArrowLeft" ||
          event.code === "ArrowUp" ||
          event.code === "ArrowDown" ||
          event.code === "Space"
        ) {
          let pressedKey = event.code;
          sendPlayerMovement(pressedKey);
        }
      });
    }
    this.gameStart++;
  }
}
