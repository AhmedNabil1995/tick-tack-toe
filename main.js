
const chooseScreen = document.querySelector('.choose_player');
const boardGameScreen = document.querySelector('.board_game');
const resultScreen = document.querySelector('.result');
const cols = Array.from(document.querySelectorAll('.col'));
const winDiv = document.querySelector('.win');
const playAginBtn = document.querySelector('#play_agin');

const players = Array.from(document.querySelector('.btn_container').children);
let yourPlayer;
let ComputerPlayer;

const colsIndexArr = [];



function openBoardGameScreen(){
    boardGameScreen.classList.remove('hide_Component')
}

function openResultScreen(player){
    resultScreen.classList.remove('hide_Component')
    if(player){
        winDiv.innerHTML = `Player (${player}) is the Winner`;
    }
}

function openChooseScreen(){
    chooseScreen.classList.remove('hide_Component')
}

function closeBoardGameScreen(){
    boardGameScreen.classList.add('hide_Component')
}

function closeResultScreen(){
    resultScreen.classList.add('hide_Component')
}

function closeChooseScreen(){
    chooseScreen.classList.add('hide_Component')
}

function addClickEventOnChoosenPlayer(){
    players.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            yourPlayer = btn.id;
            ComputerPlayer = (yourPlayer==='X') ?'O':'X';
            closeChooseScreen();
            openBoardGameScreen();
            if(yourPlayer=='O'){
                disableClickOnCols();
                computerTurn();
            }
        })
    })
}

function addCliCKEventOnCols(){
    cols.forEach((col)=>{
        col.addEventListener('click',()=>{
            drawInBoardGame(col);
        })
    })
}

window.onload = function(){
    addClickEventOnChoosenPlayer();
    addCliCKEventOnCols();
    playAginBtn.addEventListener('click',()=>{
        window.location.reload();
    })
}

function drawInBoardGame(col){
    col.textContent = yourPlayer;
    col.style.pointerEvents = 'none'
    colsIndexArr.push(+(col.id));
    col.id = yourPlayer;
    disableClickOnCols();
    if(!win(yourPlayer))
    computerTurn()
}


function computerTurn(){
    let randomIndex;
    do{
        randomIndex = Math.round(Math.random()*(cols.length-1))+1;
        if(colsIndexArr.length==9){
            return;
        }
    }while(colsIndexArr.includes(randomIndex))
  
    setTimeout(()=>{
        cols[randomIndex-1].textContent = ComputerPlayer;
        cols[randomIndex-1].style.pointerEvents = 'none';
        colsIndexArr.push(randomIndex);
        cols[randomIndex-1].id = ComputerPlayer;
        if(!win(ComputerPlayer))
        enableClickOnCols();
    },500)
}

function disableClickOnCols(){
    cols.forEach((col)=>{
        col.classList.add('disable_click');
    })
}

function enableClickOnCols(){
    cols.forEach((col)=>{
        col.classList.remove('disable_click');
    })
}

function win(player){
    if((cols[0].id==player&&cols[1].id==player&&cols[2].id==player)||(cols[3].id==player&&cols[4].id==player&&cols[5].id==player)||(cols[6].id==player&&cols[7].id==player&&cols[8].id==player||(cols[0].id==player&&cols[3].id==player&&cols[6].id==player)||(cols[1].id==player&&cols[4].id==player&&cols[7].id==player)||(cols[2].id==player&&cols[5].id==player&&cols[8].id==player)||(cols[0].id==player&&cols[4].id==player&&cols[8].id==player)||(cols[2].id==player&&cols[4].id==player&&cols[6].id==player))){
        closeBoardGameScreen();
        openResultScreen(player);
        return true;
    }else if(colsIndexArr.length===9){
        closeBoardGameScreen();
        openResultScreen();
        return true;
    }
}