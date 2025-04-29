// Server requiries
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));
const nsp = io.of("/game-space");

// Game requiries
// Hier die Klassen importieren
let game = require("./Game.js");
let Game = game.Game;
const extent = 64;
var newGame;
let connectionCounter = 0;

nsp.on("connection", function (socket) {
  // Hier drunter nur eingehende Nachrichten also Client -> Server
  console.log(`A socket connected with id ${socket.id}`);
  socket.on("disconnect", function () {
    console.log(socket.id + " disconnected");
    newGame.playerDisconnect();
    connectionCounter--;
  });
  socket.on("playerConnect", function () {
    if (connectionCounter === 0) {
      newGame = new Game(extent);
    }
    connectionCounter++;
    newGame.playerConnect();
  });

  socket.on("playerName", function (name) {
    socket.join("GameRoom", () => newGame.newPlayer(name, socket.id));
  });

  socket.on("sendDifficulty", function (difficulty) {
    newGame.setDifficulty(difficulty);
  });

  socket.on("playerReady", function () {
    console.log(`${socket.id} ready`);
    newGame.playerReady(socket.id);
  });

  socket.on("playerMovement", function (pressedKey) {
    newGame.updateMovement(socket.id, pressedKey);
  });
  socket.on("restart", function () {
    newGame.restart();
  });
});

// Ab hier ausgehende Nachrichten also Server -> Client in Funktionen die von Game.js aufgerufen können werden
module.exports.sendDifficultyToClient = (difficulty) =>
  nsp.to("GameRoom").emit("setDifficulty", difficulty);
module.exports.sendStartGame = () => nsp.emit("startGame");
module.exports.sendTimer = (time) => nsp.emit("timer", time);
module.exports.sendDraw = (gameState) => nsp.emit("draw", gameState);
module.exports.sendGameOver = (levelCount) => nsp.emit("gameOver", levelCount);

http.listen(3000, () => {
  console.log(`Serving ${clientPath} on *:3000.`);
});
