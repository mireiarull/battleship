
let userBoardImport = JSON.parse(localStorage.getItem("userBoard"));

let CPUBoardImport = JSON.parse(localStorage.getItem("CPUBoard"));

let userNameImport = localStorage.getItem("userName");
document.querySelector("#userName").innerHTML = " " + userNameImport;

const myEventListenersPage2 = () => {
    document.getElementById("modalButtonExit").addEventListener("click", () => {
        document.querySelector(".modal-end").style.display = "none";
        newGame.disableClicks();
    });
    document.getElementById("modalButtonRestart").addEventListener("click", () => {
        window.location.href = "index.html";
        window.location.href.reload();
    });
    document.getElementById("exitButton").addEventListener("click", () => {
        newGame.checkIfGameOver(true);
    });
    document.getElementById("restartButton").addEventListener("click", () => {
        window.location.href = "index.html";
        window.location.href.reload();
    });
}

myEventListenersPage2();


const getBoardPosition = () => {
    for (let i = 1; i<11; i++){
        for (let j = 1; j<11; j++){
            document.getElementById("CPU-" + String(i) + "-" + String(j)).addEventListener("click", () => {
                newGame.position = [i,j];
                newGame.checkShipPosition(newGame.CPUBoard, "player");
                setTimeout(() => newGame.CPUTurn(), 400);
                document.getElementById("CPU-" + String(i) + "-" + String(j)).style.pointerEvents = "none";
                });
        }
    }
}

class playGame {
    userBoard = userBoardImport;
    CPUBoard = CPUBoardImport;
    position;
    userSinks = 0;
    userShots = 0;
    userHits = 0;
    userMisses = 0;
    userTurnsLeft = 10;

    CPUSinks = 0;
    CPUShots = 0;
    CPUHits = 0;
    CPUMisses = 0;
    CPUTurnsLeft = 10;

    startGame () {
        this.printShips(this.userBoard);
        getBoardPosition();
    }

    printShips = (board) => {
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board[i].length; j++){
                if (board[i][j] === 1 || board[i][j] === 2 || board[i][j] === 3 || board[i][j] === 4 || board[i][j] === 5){
                    document.getElementById(String(i+1) + "-" + String(j+1)).style.backgroundColor = "rgb(167, 167, 167)";
                } else {
                    document.getElementById(String(i+1) + "-" + String(j+1)).style.backgroundColor = "rgb(85,85,255)";
                }
            }
        }
    }


    CPUTurn () {
        this.position = [Math.floor(Math.random()*10)+1 , Math.floor(Math.random()*10)+1];
        this.checkShipPosition(this.userBoard, "CPU");
    }


    checkShipPosition (board, user) {
        let rowPosition = this.position[0]-1;
        let columnPosition = this.position[1]-1;

        if (board[rowPosition][columnPosition] !== ""){
            let shipName = board[rowPosition][columnPosition];
            board[rowPosition][columnPosition] = "X";
            if (user === "player"){
                document.getElementById("CPU-" + String(rowPosition+1) + "-" + String(columnPosition+1)).style.backgroundColor = "red";
                this.userHits += 1;
                this.userShots += 1;
                this.userTurnsLeft -= 1;
                if (this.checkIfShipIsSunk(this.CPUBoard, shipName)){
                    this.userSinks += 1;
                };
            } else if (user === "CPU"){
                document.getElementById(String(rowPosition+1) + "-" + String(columnPosition+1)).style.backgroundColor = "red";
                this.CPUHits += 1;
                this.CPUShots += 1;
                this.CPUTurnsLeft -= 1;
                if (this.checkIfShipIsSunk(this.userBoard, shipName)){
                    this.CPUSinks += 1;
                };
            }

        } else {
            if (user === "player"){
                document.getElementById("CPU-" + String(rowPosition+1) + "-" + String(columnPosition+1)).style.backgroundColor = "white";
                this.userMisses += 1;
                this.userShots += 1;
                this.userTurnsLeft -= 1;
            } else if (user === "CPU"){
                document.getElementById(String(rowPosition+1) + "-" + String(columnPosition+1)).style.backgroundColor = "white";
                this.CPUMisses += 1;
                this.CPUShots += 1;
                this.CPUTurnsLeft -= 1;
            }

        }
        this.printInformation(user);
        this.checkIfGameOver();
    }

    checkIfShipIsSunk = (board, shipName) => {
        let shipCount = 0;
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board[i].length; j++){
                if (board[i][j] === shipName){
                    shipCount += 1;
                }
            }
        }
        if (shipCount === 0){
            this.paintSunkShip(board, shipName);
            return true;
        } else {
            return false;
        }
    }
    
    paintSunkShip (board, shipName) {
        if (board === this.CPUBoard){
            document.querySelector("#CPU-piece-ship-" + shipName).classList.add("sunk-ship");
        }
    }

    printInformation (user) {
        if (user === "player"){
            document.querySelector("#userSinksCount").innerHTML = this.userSinks;
            document.querySelector("#userSinksCount-end").innerHTML = this.userSinks;
            document.querySelector("#userShotsCount").innerHTML = this.userShots;
            document.querySelector("#userShotsCount-end").innerHTML = this.userShots;
            document.querySelector("#userHitsCount").innerHTML = this.userHits;
            document.querySelector("#userHitsCount-end").innerHTML = this.userHits;
            document.querySelector("#userMissesCount").innerHTML = this.userMisses;
            document.querySelector("#userMissesCount-end").innerHTML = this.userMisses;
            document.querySelector("#userShotsLeftCount").innerHTML = this.userTurnsLeft;
            document.querySelector("#userShotsLeftCount-end").innerHTML = this.userTurnsLeft;
        } else if (user === "CPU"){
            document.querySelector("#CPUSinksCount").innerHTML = this.CPUSinks;
            document.querySelector("#CPUSinksCount-end").innerHTML = this.CPUSinks;
            document.querySelector("#CPUShotsCount").innerHTML = this.CPUShots;
            document.querySelector("#CPUShotsCount-end").innerHTML = this.CPUShots;
            document.querySelector("#CPUHitsCount").innerHTML = this.CPUHits;
            document.querySelector("#CPUHitsCount-end").innerHTML = this.CPUHits;
            document.querySelector("#CPUMissesCount").innerHTML = this.CPUMisses;
            document.querySelector("#CPUMissesCount-end").innerHTML = this.CPUMisses;
            document.querySelector("#CPUShotsLeftCount").innerHTML = this.CPUTurnsLeft;
            document.querySelector("#CPUShotsLeftCount-end").innerHTML = this.CPUTurnsLeft;
        }
    }

    checkIfGameOver(status) {
        if (status === true){
            document.querySelector("#myModalEnd").style.display = "flex";
            document.querySelector("#winnerAnnouncement").innerHTML = "The battle has finished without a winner. Try again!"
        }
        if (this.userTurnsLeft <= 0 || this.CPUTurnsLeft <= 0){
            document.querySelector("#myModalEnd").style.display = "flex";
            document.querySelector("#winnerAnnouncement").innerHTML = "The battle has finished without a winner. Try again!"
        } else if (this.userSinks >= 5){
            document.querySelector("#myModalEnd").style.display = "flex";
            document.querySelector("#winnerAnnouncement").innerHTML = "Admiral " + userNameImport + " is the winner!";
        } else if (this.CPUSinks >= 5) {
            document.querySelector("#myModalEnd").style.display = "flex";
            document.querySelector("#winnerAnnouncement").innerHTML = "The opponent is the winner!";
        }
    }
    disableClicks () {
        const buttonOffUserGame = document.querySelector(".user-game");
        const buttonOffCPUGame = document.querySelector(".CPU-game");
        buttonOffUserGame.style.pointerEvents = "none";
        buttonOffCPUGame.style.pointerEvents = "none";
    }
}

const newGame = new playGame();

newGame.startGame();
