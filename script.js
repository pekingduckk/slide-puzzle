import Grid from "./Grid.js"
import { Tile1, Tile2, Tile3, Tile4, Tile5, Tile6, Tile7, Tile8} from "./Tile.js"
 
var alanBtnInstance = alanBtn({
  key: "af02e81c9448e7ec51e10e4e12ca80352e956eca572e1d8b807a3e2338fdd0dc/stage",
  onCommand: function (commandData) {
    if (commandData.command === "move-top") {
      //call client code that will react on the received command
      moveDown()
    }
    if (commandData.command === "move-bottom") {
      //call client code that will react on the received command
      moveUp()
    }
    if (commandData.command === "move-left") {
      //call client code that will react on the received command
      moveRight()
    }
    if (commandData.command === "move-right") {
      //call client code that will react on the received command
      moveLeft()
    }
  },
  rootEl: document.getElementById("alan-btn"),
});
const gameBoard = document.getElementById("game-board")
 
 
const grid = new Grid(gameBoard)
 
grid.randomEmptyCell().tile = new Tile1(gameBoard)
grid.randomEmptyCell().tile = new Tile2(gameBoard)
grid.randomEmptyCell().tile = new Tile3(gameBoard)
grid.randomEmptyCell().tile = new Tile4(gameBoard)
grid.randomEmptyCell().tile = new Tile5(gameBoard)
grid.randomEmptyCell().tile = new Tile6(gameBoard)
grid.randomEmptyCell().tile = new Tile7(gameBoard)
grid.randomEmptyCell().tile = new Tile8(gameBoard)
setupInput()
 
 
function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
  }
 
function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      moveUp()
      break
     
    case "ArrowDown":
      moveDown()
      break
     
    case "ArrowLeft":
      moveLeft()
      break
     
    case "ArrowRight":
      moveRight()
      break
     
    default:
      setupInput()
      return
  }
 
  setupInput()
}
 
function moveUp() {
  return slideTiles(grid.cellsByColumn)
}
 
function moveDown() {
  return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}
 
function moveLeft() {
  return slideTiles(grid.cellsByRow)
}
 
function moveRight() {
  return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}
 
function slideTiles(cells) {
  cells.forEach(group =>  {
 
      for (let i = 1; i < group.length; i++) {
        const cell = group[i]
        if (cell.tile == null) continue
        let lastValidCell
       
        for (let j = i - 1; j >= 0; j=-1) {
          const moveToCell = group[j]
          if (!moveToCell.canAccept(cell.tile)) break
          lastValidCell = moveToCell
        }
 
        if (lastValidCell != null) {
          if (lastValidCell.tile == null) {
            lastValidCell.tile = cell.tile
          } else {
            lastValidCell.tile = cell.tile
          }
         
          cell.tile = null
          break
        }
      }
  })  
}  
