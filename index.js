// Os ID's são as colQnt e linesQnt -1
const linesQnt = 54; 
const colQnt = 125;
let playerPos = [0, 0];
let speed = 1;
let wallCol = colQnt - 1;
let wallPos = [];
let score = 0;

let intervalId;

const movePlayer = (vert, horz) => {
    const player = document.getElementById(`${playerPos[0]}-${playerPos[1]}`);
    let futurePos = playerPos;
    
    futurePos[0] = playerPos[0] + vert;
    if(futurePos[0] < 0) playerPos[0] = 53;
    else if(futurePos[0] >= 54) playerPos[0] = 0;
    
    futurePos[1] = playerPos[1] + horz;
    if(futurePos[1] < 0) playerPos[1] = 124;
    else if(futurePos[1] >= 125) playerPos[1] = 0;
    
    player.className = 'cell';

    const playerNextMove = document.getElementById(`${futurePos[0]}-${futurePos[1]}`);
    playerNextMove.className = 'cell player'
}

const handleArrowKeyPress = (event) => {
    switch (event.key) {
        case "ArrowUp":
            movePlayer(-1*speed, 0);
            break;
        case "ArrowDown":
            movePlayer(1*speed, 0);
            break;
        case "ArrowLeft":
            movePlayer(0, -1*speed);
            break;
        case "ArrowRight":
            movePlayer(0, 1*speed);
            break;
        default:
            break;
    }
}

const clearBoard = () => {
    for(let i = 0; i < linesQnt; i++) {
        for(let j = 0; j < colQnt; j++) {
            const cell = document.getElementById(`${i}-${j}`);
            cell.className = "cell";
        }
    }
}

const createNewWall = () => {
    const startPoint = Math.floor(Math.random() * 54);
    wallCol = colQnt - 1;
    wallPos = [];
    let j = 0;
    for(let i = startPoint; j < 45; i++) {
        if(i > 53) i = 0;
        const point = document.getElementById(`${i}-${wallCol}`);
        point.className = 'cell wall';
        wallPos.push([i, wallCol]);
        j++;
    }
    
}

const moveWall = () => {
    let newWallPos = [];
    if(wallCol == 0) {
        score = score + 1;
        document.getElementById('score').innerHTML = `Pontuação: ${score}`
        wallPos.forEach(elem => {
            const actualCell = document.getElementById(`${elem[0]}-${elem[1]}`);
            actualCell.className = 'cell';
            createNewWall();
            return;
        })
    } else {
        for(const elem of wallPos) {
            wallCol = elem[1] - 1;
            const actualCell = document.getElementById(`${elem[0]}-${elem[1]}`);
            const futureCell = document.getElementById(`${elem[0]}-${elem[1] - 1}`);
            if(futureCell.className == 'cell player') {
                endPlay();
                break;
            } else {
                actualCell.className = 'cell';
                futureCell.className = 'cell wall';
                newWallPos.push([elem[0], elem[1] - 1]);  
            }
        }
        wallPos = newWallPos;
    }   
    
}

const startPlay = (e) => {
    document.getElementById('score').innerHTML = `Pontuação: ${score}`
    score = 0;
    e.target.disabled = true;
    document.addEventListener("keydown", handleArrowKeyPress);
    const player = document.getElementById(`${playerPos[0]}-${playerPos[1]}`)
    player.className ="cell player";
    createNewWall();
    intervalId = setInterval(moveWall, 25);
}

const endPlay = () => {
    document.getElementById('score').innerHTML = `Pontuação: ${score}`
    clearInterval(intervalId);
    clearBoard();
    document.removeEventListener("keydown", handleArrowKeyPress);
    playerPos = [0, 0];
    alert('Você perdeu!');
}

const onLoad = () => {
    //Create Board
    for(let i = 0; i < linesQnt; i++) {
        const line = document.createElement('div');
        line.id=`L-${i}`
        line.className = 'line'
        document.getElementById(`mainField`).append(line);
        for(let j = 0; j < colQnt; j++) {
            const cell = document.createElement("div");
            cell.id = `${i}-${j}`;
            cell.className = "cell";
            document.getElementById(`L-${i}`).append(cell);
        }
    }
}

