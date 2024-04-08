var origBoard = 0;
const huPlayer = 'O';
const aiPlayer = 'X';
var finish = null;
const wincombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  console.log(`game started`);
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}


function turnClick(square) {
  turn(square.target.id, huPlayer);
  if (typeof origBoard[square.target.id] == 'number') {
   if (!checkTie()) {
        turn(bestSpot(), aiPlayer);
      };
  }
}

/*
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  } else {
    // Check if it's a tie before AI move
    if (!checkTie()) {
      turn(bestSpot(), aiPlayer);
    }
  }
}


function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  } else {
    // Check if it's a tie before AI move
    if (!checkTie()) {
      setTimeout(() => {
        turn(bestSpot(), aiPlayer);
      }, 500);
    }
  }
}
*/
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => {
    return (e === player) ? a.concat(i) : a;
  }, []);

  let gameWon = null;

  for (let [index, win] of wincombs.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }

  return gameWon;
}

function gameOver(gameWon) {
  for (let index of wincombs[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = (gameWon.player === huPlayer) ? "blue" : "red";
    document.getElementById(index) = (gameWon.player === huPlayer) ? finish=true : finish=false;
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }

  declareWinner((gameWon.player === huPlayer) ? "You win!" : "You lose!");
}


function declareWinner(who) {
  document.querySelector(".endgame .text").innerText = who; // Corrected selector
  document.querySelector(".endgame").style.display = "block";
}
/*
function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame.text").innerText = who;
}*/

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "yellow";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}
