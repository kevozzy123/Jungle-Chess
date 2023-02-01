import Player from './Player.js';
import Board from './Board.js';
import UserInterface from './UserIterface.js';
import { abs } from './util/index.js';
const RED = 'rgb(222, 117, 117)';
const GREEN = 'rgb(85, 204, 85)';
class GameControl {
    constructor() {
        this.redPlayer = new Player();
        this.bluePlayer = new Player();
        this.selectedPiece = null;
        this.selectedAttr = null;
        this.board = new Board();
        this.targetLocation = null;
        this.idleTurns = 0;
        this.timer = null;
        this.UI = new UserInterface();
        this.audio = document.querySelector('audio');
        this.isGameover = false;
        this.redTurn = true;
        this.startBtn = document.querySelector('.btn');
        this.app = document.getElementById('app');
        this.turnText = document.querySelector('.turn-box');
        this.init();
    }
    ;
    init() {
        this.startBtn.addEventListener('click', () => this.handleStartClick());
    }
    handleStartClick() {
        this.UI.showGame();
        this.drawBoard();
    }
    drawBoard() {
        let arr = this.board.arr;
        let redAnimals = 0;
        let greenAnimals = 0;
        for (let i = 0; i < arr.length; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < arr[i].length; j++) {
                let box = document.createElement('div');
                box.dataset.num = arr[i][j].toString();
                let animalIcon;
                let index = abs(arr[i][j]);
                if (abs(arr[i][j]) > 1000) {
                    index = abs(arr[i][j]) - 1000;
                }
                else if (abs(arr[i][j]) === 24) {
                    index = abs(arr[i][j]) / 3;
                }
                else if (abs(arr[i][j]) > 100) {
                    index = abs(arr[i][j]) - 100;
                    console.log(index);
                }
                animalIcon = this.board.animals[index - 1];
                let boardContent = `<i class='iconfont'>${animalIcon}</i>`;
                box.classList.add('box');
                box.innerHTML = animalIcon ? boardContent : '';
                // box.textContent = boardContent
                box.addEventListener('click', (e) => {
                    if (this.redTurn) {
                        if (this.isSide('red', arr[i][j])) {
                            this.setSelectedPiece(box, [i, j], e);
                            return;
                        }
                    }
                    else {
                        if (this.isSide('green', arr[i][j])) {
                            this.setSelectedPiece(box, [i, j], e);
                            return;
                        }
                    }
                    if (this.selectedPiece) {
                        this.targetLocation = [i, j];
                        this.handleChessMove(e, i, j);
                    }
                });
                if (this.isSide('red', arr[i][j])) {
                    box.style.background = RED;
                    redAnimals++;
                }
                else if (this.isSide('green', arr[i][j])) {
                    box.style.background = GREEN;
                    greenAnimals++;
                }
                if (this.redTurn) {
                    if (this.isSide('red', arr[i][j])) {
                        box.style.cursor = 'pointer';
                        box.classList.add('hover');
                        box.classList.add('turn');
                    }
                }
                else {
                    if (this.isSide('green', arr[i][j])) {
                        box.style.cursor = 'pointer';
                        box.classList.add('hover');
                        box.classList.add('turn');
                    }
                }
                if (arr[i][j] === 33) {
                    box.style.backgroundColor = '#1E90FF';
                }
                if (arr[i][j] === 31 || arr[i][j] === 30) {
                    box.style.backgroundColor = '#4e342e';
                    box.textContent = 'trap';
                    box.classList.add('terrain');
                }
                if (arr[i][j] === 40) {
                    box.style.backgroundColor = '#f4511e';
                    box.textContent = 'lair';
                    box.classList.add('terrain');
                }
                else if (arr[i][j] === 41) {
                    box.style.backgroundColor = '#7cb342';
                    box.textContent = 'lair';
                    box.classList.add('terrain');
                }
                row.appendChild(box);
            }
            this.app.appendChild(row);
            this.redPlayer.animalCount = redAnimals;
            this.bluePlayer.animalCount = greenAnimals;
        }
    }
    // if selected a piece, add event to move, eat, or unselect
    setSelectedPiece(box, position, e) {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(item => {
            item.classList.remove('selected');
            item.classList.remove('legal');
        });
        this.selectedPiece = position;
        box.classList.add('selected');
        this.selectedAttr = e.target.getAttribute('data-num');
        this.showLegalMoves(boxes, position);
    }
    showLegalMoves(boxes, position) {
        let surroundings = [
            boxes[position[0] * 7 + position[1] + 1],
            boxes[position[0] * 7 + position[1] - 1],
            boxes[(position[0] - 1) * 7 + position[1]],
            boxes[(position[0] + 1) * 7 + position[1]] // bottom
        ];
        let surCopy = [...surroundings];
        position[1] === 6 && surroundings.splice(0, 1);
        position[1] === 0 && surroundings.splice(1, 1);
        position[0] === 0 && surroundings.splice(surroundings.length === 4 ? 2 : 1, 1);
        position[0] === 8 && surroundings.splice(surroundings.length === 4 ? 3 : 2, 1);
        surroundings.forEach(sur => {
            if (sur.getAttribute('data-num') === '33') {
                console.log(this.selectedAttr);
                // tiger or lion can jump across the river
                if (abs(this.selectedAttr) === 3 || abs(this.selectedAttr) === 2) {
                    if (surCopy[0].getAttribute('data-num') === '33') {
                        surroundings.push(boxes[position[0] * 7 + position[1] + 3]);
                    }
                    if (surCopy[1].getAttribute('data-num') === '33') {
                        surroundings.push(boxes[position[0] * 7 + position[1] - 3]);
                    }
                    if (surCopy[2].getAttribute('data-num') === '33') {
                        surroundings.push(boxes[(position[0] - 4) * 7 + position[1]]);
                    }
                    if (surCopy[3].getAttribute('data-num') === '33') {
                        surroundings.push(boxes[(position[0] + 4) * 7 + position[1]]);
                    }
                }
                let filtered;
                // only rat can go into the river
                if (abs(this.selectedAttr) !== 8 && abs(this.selectedAttr) !== 24) {
                    filtered = surroundings.filter(item => {
                        return item.getAttribute('data-num') !== '33';
                    });
                    surroundings = filtered;
                }
                else if (abs(this.selectedAttr) === 24) {
                    filtered = surroundings.filter(item => {
                        return item.getAttribute('data-num') === '33' || item.getAttribute('data-num') === '0';
                    });
                    surroundings = filtered;
                }
            }
            // check ally
            let withoutAllyBoxes = surroundings.filter(item => {
                return !item.classList.contains('hover');
            });
            surroundings = withoutAllyBoxes;
        });
        // console.log(surroundings)
        surroundings.forEach(sur => {
            if (sur) {
                sur.classList.add('legal');
            }
        });
    }
    handleChessMove(e, i, j) {
        let targetAttr = e.target.getAttribute('data-num');
        let indexOne = this.selectedPiece[0];
        let indexTwo = this.selectedPiece[1];
        // if player has selected a piece, get target number
        if (!e.target.classList.contains('legal')) {
            return;
        }
        // get the terrain type of target location
        if (abs(targetAttr) === 0) {
            // move seleted piece to target position
            this.board.arr[i][j] = Number(this.selectedAttr);
            this.board.arr[indexOne][indexTwo] = 0;
            if (abs(this.selectedAttr) === 24) {
                this.board.arr[indexOne][indexTwo] = 33;
                this.board.arr[i][j] = Number(this.selectedAttr) / 3;
            }
            else if (Number(this.selectedAttr) > 1000) {
                this.board.arr[indexOne][indexTwo] = 31;
                this.board.arr[i][j] = Number(this.selectedAttr) - 1000;
            }
            else if (Number(this.selectedAttr) < -1000) {
                this.board.arr[indexOne][indexTwo] = 30;
                this.board.arr[i][j] = Number(this.selectedAttr) + 1000;
            }
            else if (Number(this.selectedAttr) < -100) {
                this.board.arr[indexOne][indexTwo] = 31;
                this.board.arr[i][j] = Number(this.selectedAttr) + 100;
            }
            else if (Number(this.selectedAttr) > 100) {
                this.board.arr[indexOne][indexTwo] = 30;
                this.board.arr[i][j] = Number(this.selectedAttr) - 100;
            }
        }
        else if (abs(targetAttr) < 10 && Number(targetAttr) !== 0) {
            this.compareAnimalSize(targetAttr, i, j, indexOne, indexTwo);
        }
        else if (Number(targetAttr) === 33) {
            this.board.arr[i][j] = abs(this.selectedAttr) === 24
                ? Number(this.selectedAttr) : Number(this.selectedAttr) * 3;
            if (abs(this.selectedAttr) === 8) {
                this.board.arr[indexOne][indexTwo] = 0;
            }
            else if (abs(this.selectedAttr) === 24) {
                this.board.arr[indexOne][indexTwo] = 33;
            }
        }
        else if (targetAttr === '30') {
            if (this.isSide('red', this.selectedAttr)) {
                this.board.arr[indexOne][indexTwo] = 0;
                this.board.arr[i][j] = Number(this.selectedAttr) + 100;
            }
            else if (this.isSide('green', this.selectedAttr)) {
                this.board.arr[indexOne][indexTwo] = 0;
                this.board.arr[i][j] = Number(this.selectedAttr) - 1000;
            }
        }
        else if (targetAttr === '31') {
            if (this.isSide('green', this.selectedAttr)) {
                this.board.arr[indexOne][indexTwo] = 0;
                this.board.arr[i][j] = Number(this.selectedAttr) - 100;
            }
            else if (this.isSide('red', this.selectedAttr)) {
                this.board.arr[indexOne][indexTwo] = 0;
                this.board.arr[i][j] = Number(this.selectedAttr) + 1000;
            }
        }
        else if (abs(targetAttr) > 100 && abs(targetAttr) < 1000) {
            // if animal is in its own trap, it won't be affected by the trap
            let target = Number(targetAttr) > 0 ?
                Number(targetAttr) - 100 : Number(targetAttr) + 100;
            this.compareAnimalSize(target, i, j, indexOne, indexTwo);
        }
        else if (abs(targetAttr) > 1000) {
            // if animal is in its enemy's trap, it becomes vunerable
            console.log('eat');
            this.board.arr[i][j] = Number(this.selectedAttr) > 0 ?
                Number(this.selectedAttr) + 100 : Number(this.selectedAttr) - 100;
            this.board.arr[indexOne][indexTwo] = 0;
        }
        else if (Number(targetAttr) === 40) {
            if (Number(this.selectedAttr) < 0) {
                this.UI.showGameover("Red Player's lair has been taken!");
            }
        }
        else if (Number(targetAttr) === 41) {
            if (Number(this.selectedAttr) > 0) {
                this.UI.showGameover("Green Player's lair has been taken!");
            }
        }
        this.reRender();
    }
    compareAnimalSize(targetAttr, i, j, indexOne, indexTwo) {
        let isSameTeam = (Number(targetAttr) > 0 && Number(this.selectedAttr) > 0)
            || (Number(targetAttr) < 0 && Number(this.selectedAttr) < 0);
        if (isSameTeam) {
            console.log('is same team');
            return;
        }
        let prev;
        let selected;
        let attrNum = Number(this.selectedAttr);
        if (abs(this.selectedAttr) > 100 && abs(this.selectedAttr) < 1000) {
            selected = attrNum > 0 ?
                attrNum - 100 : attrNum + 100;
            prev = attrNum > 0 ? 30 : 31;
        }
        else if (abs(this.selectedAttr) > 1000) {
            selected = attrNum > 0 ?
                attrNum - 1000 : attrNum + 1000;
            prev = attrNum > 0 ? 31 : 30;
        }
        else {
            selected = attrNum;
            prev = 0;
        }
        // compare the value of two sides
        if (abs(targetAttr) === abs(selected)) {
            // if two pieces are the same, remove both pieces
            this.board.arr[i][j] = 0;
            this.board.arr[indexOne][indexTwo] = prev;
        }
        else if (abs(selected) < abs(targetAttr)) {
            // move seleted piece to target position
            if (abs(selected) === 1 && abs(targetAttr) === 8) {
                this.board.arr[indexOne][indexTwo] = prev;
            }
            else {
                this.board.arr[i][j] = Number(this.selectedAttr);
                this.board.arr[indexOne][indexTwo] = prev;
            }
        }
        else {
            if (abs(selected) === 8 && abs(targetAttr) === 1) {
                this.board.arr[i][j] = Number(this.selectedAttr);
                this.board.arr[indexOne][indexTwo] = prev;
            }
            else {
                this.board.arr[indexOne][indexTwo] = prev;
            }
        }
    }
    isSide(side, attribute) {
        let attr = Number(attribute);
        if (side === 'red') {
            return (attr < 9 && attr > 0) || attr === 24 || attr > 100 || attr > 1000;
        }
        else {
            return attr < 0 || attr === -24 || attr < -100 || attr < -1000;
        }
    }
    // cleanup before re-render the chess board
    reRender() {
        this.app.innerHTML = '';
        this.selectedAttr = null;
        this.selectedPiece = null;
        this.targetLocation = null;
        this.redTurn = !this.redTurn;
        this.turnText.textContent = this.redTurn ? "Red Player's turn" : "Green Player's turn";
        this.drawBoard();
        this.checkGameover();
        this.audio.play();
    }
    checkGameover() {
        if (this.redPlayer.animalCount === 0 || this.bluePlayer.animalCount === 0) {
            this.isGameover = true;
            this.UI.showGameover("You have eliminated all of your opponent's beasts");
        }
        else if (this.board.arr[0][4] !== 40) {
            this.isGameover = true;
        }
        else if (this.board.arr[8][4] !== 41) {
            this.isGameover = true;
        }
        else if (this.redPlayer.timeLeft === 0) {
            this.isGameover = true;
        }
        else if (this.bluePlayer.timeLeft === 0) {
            this.isGameover = true;
        }
        else if (this.idleTurns === 30) {
            this.isGameover = true;
        }
    }
}
export const gameControl = new GameControl();
