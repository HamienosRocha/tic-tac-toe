
const gameboard = document.querySelector('#gameboard');

let go = 'circle';
const startCells = [...Array(9).fill('')];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 7, 4],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

createBoard();

function createBoard() {
  if(!gameboard) {
    console.error(`game board not found`);
    return;
  }

  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.id = `cell-${index}`;
    cellElement.classList.add('cell-box');
    cellElement.addEventListener('click', addGo)

    gameboard.appendChild(cellElement);
  });
}

function addGo(event) {
  console.log(`event: `, event);
  const target = event.target;
  if(target.classList.contains('cell-box') && !target.hasChildNodes()) {
    const divGo = document.createElement('div');
    divGo.classList.add(go);
    target.appendChild(divGo);

    go = go === 'circle' ? 'cross' : 'circle';
  }

}