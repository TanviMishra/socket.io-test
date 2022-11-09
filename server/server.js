//declaring variables
//REQD DEPENDENCIES ~import
const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

//CLIENT PATH
const publicPath = path.join(__dirname, "/../public"); //setting path to serve HTML through the public folder
//PORT
const port = process.env.PORT || 3000;
//IO VARIABLES
let app = express(); //created in line 4
let server = http.createServer(app); //http method
let io = socketIO(server); //sockt.io connect

//GEN VARIABLES
playerCount = 0;
//some CONNECTION
app.use(express.static(publicPath)); //setting express server to serve content
server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

//OPEN a socket.io connection
io.on("connection", (socket) => {
  console.log("user # " + playerCount + " just connected.");
  playerInfo = playerSetup(playerCount);
  io.emit("gameBoard", playerCount);
  console.log(playerInfo);
  playerCount++;
  socket.on("disconnect", () => {
    playerCount--; //TO DO: eventually that specific player will need to be removed
    console.log("user has disconnected.");
  });
  socket.on("startGame", () => {
    //create a 'listener' for that message
    console.log("start msg: server");
    io.emit("startGame"); //emit a message back to all the connected clients
  });
  socket.on("floodBox", (data) => {
    sendData = { index: data.index, player: playerInfo.playerID };
    console.log(sendData);
    io.emit("floodBox", sendData);
  });
});
//GENERAL VARIABLES
roles = ["tree", "empty", "building"];
let playerInfo = {
  playerID: "",
  playerRole: "",
};
//GENERAL FNS
function playerSetup(input) {
  let player = { playerID: "", playerRole: "" };
  player.playerID = input;
  player.playerRole = roles[input % 3];
  return player;
}
