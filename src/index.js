
const gameboard = document.querySelector('#gameboard');

const startCells = [...Array(9).fill('')];
let go = 'circle';

createBoard();

function createBoard() {
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