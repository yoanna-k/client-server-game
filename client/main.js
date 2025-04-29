import { Rendering } from "./Rendering.js";
import { KeyHandler } from "./eventHandler.js";

let canvas = document.getElementById("myCanvas");

const socket = io("/game-space");
const extent = 64;

let rendering = new Rendering(canvas, extent);
let keyHandler = new KeyHandler();

// Hier drunter alle eingehenede Nachrichtien also Server -> Client
socket.on("connect", function () {
  socket.emit("playerConnect", canvas);
  rendering.inputName();
});
socket.on("setDifficulty", function (difficulty) {
  rendering.chooseDifficulty(difficulty);
});
socket.on("startGame", function () {
  rendering.startGame();
  keyHandler.startGame();
});
socket.on("timer", function (time) {
  rendering.drawTimer(time);
});
socket.on("draw", function (gamestate) {
  rendering.draw(gamestate);
});
socket.on("gameOver", function (levelCount) {
  rendering.drawGameOver(levelCount);
});

// Hier drunter nur ausgehende Nachrichten also Client -> Server in Funktionen die von eventHandler.js aufgerufen werden können
// Alle Funktionen mit export function exportieren

export function sendName(name) {
  socket.emit("playerName", name);
}
export function sendDifficultyToServer(difficultyClient) {
  socket.emit("sendDifficulty", difficultyClient);
  rendering.chooseDifficulty(difficultyClient);
}
export function sendReady() {
  socket.emit("playerReady");
}
export function sendPlayerMovement(pressedKey) {
  socket.emit("playerMovement", pressedKey);
}
export function sendRestart() {
  rendering.restart();
  socket.emit("restart");
}
