//VARIABLES
let socket = io();
//DOM VARIABLES
let grid = document.querySelector("#grid-content");
let boxesArr = [];
let startButton = document.querySelector("#start");
//GENERAL VARIABLES

//EVENT LISTENERS
startButton.addEventListener("click", () => {
  socket.emit("startGame");
});
//box event listener in the fn addEventListener()

//SOCKET CLIENT LISTENERS
socket.on("gameBoard", (player) => {
  makeGameBoard(grid, parseInt(player));
});
socket.on("startGame", () => {
  cueStart();
});
socket.on("floodBox", (data) => {
  console.log(data);
  flood(data);
});

/*function socketEnable(eventN, callback) {
  socket.on(eventN, () => {
    callback()
  });
} */

// socket.on("crazyIsClicked", (data) => {
//   console.log("crazy click msg: client");
//   goCrazy(data.offsetLeft, data.offsetTop);
// });

//GENERAL FNS
function makeGameBoard(canvas, check) {
  // if (check == 0) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let box = document.createElement("div");
      box.setAttribute("class", "boxConst");
      canvas.append(box);
    }
  }
  addingEventListener();
  // }
}
function addingEventListener() {
  boxesArr = document.querySelectorAll(".boxConst");
  console.log(boxesArr);
  for (let i = 0; i < boxesArr.length; i++) {
    box = boxesArr[i];
    box.addEventListener("click", () => {
      socket.emit("floodBox", (data = { index: i }));
    });
  }
}
function cueStart() {
  document.querySelector("body").style.overflowY = "scroll";
  document.querySelector("#instruct").style.display = "none";
}
function flood(info) {
  console.log(info);
  switch (info.player) {
    case 0:
      boxesArr[info.index].style.backgroundColor = "grey";
      break;
    case 1:
      boxesArr[info.index].style.backgroundColor = "black";
      break;
    case 2:
      boxesArr[info.index].style.backgroundColor = "white";
      break;
  }
}
