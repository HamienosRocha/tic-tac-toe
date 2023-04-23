
const gameboardContainer = document.querySelector('.container-gameboard');
const actionsContainer = document.querySelector('.container-actions');
const gameInfo = document.querySelector('.game-info');

const initialGo = 'circle';
const startCells = [...Array(9).fill('')];
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 7, 4], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

let go = initialGo;
createBoard();

function createBoard() {
  if(!gameboardContainer) {
    console.error(`gameboard container not found`);
    return;
  }

  const gameboard = document.createElement('div');
  gameboard.id = 'gameboard';

  gameInfo.textContent = `it's ${go}'s turn`;
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.id = `cell-${index}`;
    cellElement.classList.add('cell-box');
    cellElement.addEventListener('click', addGo)

    gameboard.appendChild(cellElement);
  });

  gameboardContainer.appendChild(gameboard);
}

function addGo(event) {
  const target = event.target;
  const divGo = document.createElement('div');
  divGo.classList.add(go);
  target.appendChild(divGo);

  go = go === 'circle' ? 'cross' : 'circle';
  gameInfo.textContent = `it's ${go}'s turn`;
  target.removeEventListener('click', addGo);
  checkScore();
}

function checkScore() {
  const allCellBox = document.querySelectorAll('.cell-box');

  winningCombos.forEach(combos => {
    const circleWins = combos.every(item => allCellBox[item].firstChild?.classList.contains('circle'));

    if(circleWins) {
      gameInfo.textContent = `Circle wins`;
      allCellBox.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
      actionsContainer.style.display = 'initial';
      return;
    }
  });

  winningCombos.forEach(combos => {
    const crossWins = combos.every(item => allCellBox[item].firstChild?.classList.contains('cross'));

    if(crossWins) {
      gameInfo.textContent = `Cross wins`;
      allCellBox.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
      actionsContainer.style.display = 'initial';
      return;
    }
  });

  const isTie = Array.from(allCellBox).every(cell => cell.hasChildNodes());
  if(isTie) {
    gameInfo.textContent = `Tie`;
    allCellBox.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
    actionsContainer.style.display = 'initial';
    return;
  }
}

function restart() {
  const gameboard = document.querySelector('#gameboard');

  if(gameboard) {
    gameboardContainer.removeChild(gameboard);

    go = initialGo;
    gameInfo.textContent = `it's ${go}'s turn`;
    actionsContainer.style.display = 'none';

    createBoard();
  }
}