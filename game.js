const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector("#info")
const restartBtn = document.querySelector("#restartBtn")
const startCells = [
    "","","","","","","","",""
]
let go = "cross"
infoDisplay.textContent = "' X ' goes first"

function createBoard() {
    startCells.forEach((_cell,index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click',addGo)
        gameBoard.append(cellElement)
    })
}

function addGo(e){
    console.log(e.target)
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go == "circle" ? "cross" : "circle"
    if(go == "circle"){
        infoDisplay.textContent = " ' O '  Turn"
        document.getElementById("catRO").className = "smallHand"
        document.getElementById("catRO").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9399147_883.png";
        document.getElementById("catLX").className = "smallPaw"
        document.getElementById("catLX").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9384067_127.png";
    }
    else{
        infoDisplay.textContent = " ' X '  Turn"
        document.getElementById("catRO").className = "smallPaw"
        document.getElementById("catRO").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9303117_670.png";
        document.getElementById("catLX").className = "smallHand"
        document.getElementById("catLX").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9302596_887.png";
    }
    e.target.removeEventListener("click",addGo)
    console.log(checkScore())
}

function checkScore(){
    const allSqure = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    const allPos = [0,1,2,3,4,5,6,7,8]
    let circleWins
    let crossWins
    let checkOwin = false, checkXwin =false

    const isDrawe = allPos.every(cell =>
        allSqure[cell].firstChild?.classList.contains('circle') ||
            allSqure[cell].firstChild?.classList.contains('cross'))

    winningCombos.forEach(array => {
        circleWins = array.every(cell =>
            allSqure[cell].firstChild?.classList.contains('circle'))

        crossWins = array.every(cell =>
                allSqure[cell].firstChild?.classList.contains('cross'))

        console.log(array+" circleWins "+circleWins)
        console.log(array+" crossWins "+crossWins)
        if (circleWins){
            checkOwin = true
            array.forEach(cell =>
                allSqure[cell].style.backgroundColor = "gray")
            infoDisplay.textContent = "' O ' Wins"
            allSqure.forEach(square => square.replaceWith(square.cloneNode(true)))
            return "circleWins"
        }
        else if (crossWins){
            checkXwin = true
            array.forEach(cell =>
                allSqure[cell].style.backgroundColor = "gray")
            infoDisplay.textContent = "' X ' Wins"
            allSqure.forEach(square => square.replaceWith(square.cloneNode(true)))
            return "crossWins"
        }
    })

    console.log("isDrawe "+isDrawe)
    if(isDrawe && !checkOwin && !checkXwin){
        infoDisplay.textContent = "Draw"
        allSqure.forEach(square => square.replaceWith(square.cloneNode(true)))
        document.getElementById("catRO").className = "smallHand"
        document.getElementById("catRO").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9399147_883.png";
        document.getElementById("catLX").className = "smallHand"
        document.getElementById("catLX").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9302596_887.png";
        return "Draw";
    }
    else if(checkOwin){
        document.getElementById("catRO").className = "smallKitty"
        document.getElementById("catRO").src="./src/img/vecteezy_kitty-cat-clipart-design-illustration_9342564_860.png";
        document.getElementById("catLX").className = "smallKitty"
        document.getElementById("catLX").src="./src/img/vecteezy_gothic-tombstones-and-stone-crosses_22277570_272.png";
    }
    else if(checkXwin){
        document.getElementById("catLX").className = "smallKitty"
        document.getElementById("catLX").src="./src/img/vecteezy_kitty-cat-clipart-design-illustration_9398914_199.png";
        document.getElementById("catRO").className = "smallKitty"
        document.getElementById("catRO").src="./src/img/vecteezy_gothic-tombstones-and-stone-crosses_22277570_272.png";
    }
    setTimeout(checkScore, 3000);

}

function restart() {
    console.log("restart")
    const allSqure = document.querySelectorAll(".square")
    allSqure.forEach(div => {
        div.remove()
    })
    go = "cross"
    infoDisplay.textContent = "' X ' goes first"
    document.getElementById("catRO").className = "smallPaw"
    document.getElementById("catRO").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9303117_670.png";
    document.getElementById("catLX").className = "smallHand"
    document.getElementById("catLX").src="./src/img/vecteezy_cat-paw-clipart-design-illustration_9302596_887.png";
    createBoard()
}

createBoard()
restartBtn.addEventListener('click',restart);