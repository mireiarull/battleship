let userNameImport = localStorage.getItem("userName");

if (userNameImport !== ""){
    document.querySelector("#userName").innerHTML = " " + userNameImport;
}

const myEventListenersPage1 = () => {

    const buttonDown = document.querySelector("#buttonDown");
    const buttonRight = document.querySelector("#buttonRight");
    const buttonClear = document.querySelector("#buttonClear");
    const buttonBattle = document.querySelector("#startBattleButton");

    buttonDown.addEventListener("click", () => {
        buttonDown.classList.add("clicked");
        buttonRight.classList.remove("clicked");
        placePlayerShips.direction = "down";
    })

    buttonRight.addEventListener("click", () => {
        buttonRight.classList.add("clicked");
        buttonDown.classList.remove("clicked");
        placePlayerShips.direction = "right";
    })

    buttonClear.addEventListener ("click", () => {
        placePlayerShips.clearBoard();
    })

    buttonBattle.addEventListener ("click", () => {
        valueSenderUserBoard();
        valueSenderCPUBoard();
    })


    for (let i=1; i<6; i++){
        document.querySelector("#ship-"+ i).addEventListener("click", () => {
            document.querySelector("#piece-ship-"+ i).style.border = "3px solid yellow";
            if (i === 1){
                length = 2;
            } else if (i === 2){
                length = 3;
            } else if (i > 2){
                length = i;
            }
            placePlayerShips.shipName = i;
            placePlayerShips.shipLength = length;
            placePlayerShips.setBoardPosition();
        })
    }
}

myEventListenersPage1();

class shipsBoard {
    board = [];
    CPUboard = [];
    shipLength;
    shipName;
    direction = "right";
    position;

    constructor () {
        for (let i = 0; i<10; i++){
            this.board.push([]);
            for (let j = 0; j<10; j++){
                this.board[i].push("");
            }
        }
    }
    
    setBoardPosition () {
        for (let i = 0; i<12; i++){
            for (let j = 0; j<12; j++){
                const button = document.getElementById(String(i) + "-" + String(j));
                button.addEventListener("click", () => {
                    this.position = [i,j]
                    this.placeShipsOnBoard();
                 });
            }
        }
    }

    placeShipsOnBoard () {
        if (!this.checkIfShipIsPlaced(this.shipName, this.board) && this.checkIfShipFits() && !this.checkIfShipOverlaps(this.board)){
            this.addShiptoArray(this.board);
            this.printBoard();
            document.querySelector("#piece-ship-"+ this.shipName).classList.add("placed");
        } 
    }


    checkIfShipIsPlaced (ship, board) {
        let shipCount = 0;
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board[i].length; j++){
                if (board[i][j] === ship){
                    shipCount += 1;
                }
            }
        }
        if (ship === 1 && shipCount >= 2){
            return true;
        } else if (ship === 2 && shipCount >= 3) {
            return true;
        } else if (ship === 3 && shipCount >= 3) {
            return true;
        } else if (ship === 4 && shipCount >= 4) {
            return true;
        } else if (ship === 5 && shipCount >= 5) {
            return true;
        } else {
            return false;
        }
    }

    checkIfShipFits () {
        let rowPosition = this.position[0];
        let columnPosition = this.position [1];
        let endPosition = []
        if (this.direction === "down"){
            endPosition[0] = rowPosition + this.shipLength - 1;
            endPosition[1] = columnPosition;
        } else if (this.direction === "right"){
            endPosition[0] = rowPosition;
            endPosition[1] = columnPosition + this.shipLength -1;
        }
        if (endPosition[0] > 10 || endPosition[1] > 10 ){
            return false;
        } else {
            return true;
        }
    }

    checkIfShipOverlaps (board) {
        let rowPosition = this.position[0]-1;
        let columnPosition = this.position[1]-1;

        if (this.direction === "down"){
            for (let i=0; i<this.shipLength; i++){
                if (board[rowPosition + i][columnPosition] !== ""){
                    return true;
                }
            }
        } else if (this.direction === "right"){
            for (let i=0; i<this.shipLength; i++){
                if (board[rowPosition][columnPosition + i] !== ""){
                    return true;
                }
            }
        }
        return false;
    }

    
    clearBoard () {
        this.board = [];
        for (let i = 0; i<10; i++){
            this.board.push([]);
            for (let j = 0; j<10; j++){
                this.board[i].push("");
            }
        }
        this.printBoard();

        for (let i=1; i<6; i++){
            document.querySelector("#piece-ship-"+ i).style.border = "3px solid rgb(85,85,255)";
            document.querySelector("#piece-ship-"+ i).style.backgroundColor = "rgb(167, 167, 167)";
        }
    }

    addShiptoArray (board) { 

        let rowPosition = this.position[0] - 1;
        let columnPosition = this.position [1] - 1;
        if (this.direction === "down"){
            for (let i=0; i<this.shipLength; i++){
                board[rowPosition + i][columnPosition] = this.shipName;
            }
        } else if (this.direction === "right"){
            for (let i=0; i<this.shipLength; i++){
                board[rowPosition][columnPosition + i] = this.shipName;
            }
        }
    }

    printBoard () {
        for (let i=0; i<this.board.length; i++){
            for (let j=0; j<this.board[i].length; j++){
                if (this.board[i][j] === 1 || this.board[i][j] === 2 || this.board[i][j] === 3 || this.board[i][j] === 4 || this.board[i][j] === 5){
                    document.getElementById(String(i+1) + "-" + String(j+1)).style.backgroundColor = "rgb(167, 167, 167)";
                } else {
                    document.getElementById(String(i+1) + "-" + String(j+1)).style.backgroundColor = "rgb(85,85,255)";
                }
            }
        }

        if (this.checkIfShipIsPlaced(1, this.board) && this.checkIfShipIsPlaced(2, this.board) && this.checkIfShipIsPlaced(3, this.board) && this.checkIfShipIsPlaced(4, this.board) && this.checkIfShipIsPlaced(5, this.board)){
            document.querySelector("#startBattleButton").style.display = "block";
            this.createCPUBoard();
        }
    }


    createCPUBoard () {
        for (let i = 0; i<10; i++){
            this.CPUboard.push([]);
            for (let j = 0; j<10; j++){
                this.CPUboard[i].push("");
            }
        }

        let shipCount = 0;
        while (shipCount <= 5){

            this.position = [Math.floor(Math.random()*10)+1 , Math.floor(Math.random()*10)+1];

            let randomDireccion = this.getRandomDirection();
            if (randomDireccion === 0){
                this.direction = "right";
            }else if (randomDireccion === 1){
                this.direction === "down";
            }

            for (let i=1; i<6; i++){
                if (i === 1){
                    this.shipName = i;
                    this.shipLength = 2;
                } else if (i === 2){
                    this.shipName = i;
                    this.shipLength = 3;
                } else if (i > 2){
                    this.shipName = i;
                    this.shipLength = i;
                }
                
                if (!this.checkIfShipIsPlaced(this.shipName, this.CPUboard) && this.checkIfShipFits() && !this.checkIfShipOverlaps(this.CPUboard)){
                    this.addShiptoArray(this.CPUboard);
                    shipCount +=1;
                } 
            }

            if (shipCount === 5){
                return (this.CPUboard);
            }
        }     
    }

    getRandomDirection () {
        return Math.floor(Math.random()*2);
    }
}


let placePlayerShips = new shipsBoard();

const valueSenderUserBoard = () => {
    let userBoard = JSON.stringify(placePlayerShips.board);
    localStorage.setItem("userBoard", userBoard);
    window.location.href = "index-Page2.html";
}

const valueSenderCPUBoard = () => {
    let CPUBoard = JSON.stringify(placePlayerShips.CPUboard);
    localStorage.setItem("CPUBoard", CPUBoard);
    window.location.href = "index-Page2.html";
}