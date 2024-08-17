let boxes = document.querySelectorAll(".box");
let RestartBtn = document.querySelector("#Restart-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
  

//1. for alternate turn:
let turnO = true; //playerX, playerO

let count = 0; //To Track Draw

const winPatterns = [       //2. winning patterns
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


const RestartGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  //so that result will be not displayed while playing again 

};


//3. click action will be performed, adding event listner to button
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {  //here turnO is true
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; 
    //4. here disabled so that clicking again in same button will not change innerText

    count++;

    let isWinner = checkWinner();/* 5.  whenever button clicked check winner and check winner pattern 
    according to it*/


    //when game draws
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});


//when game draws
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {  
  //to restart game and disable the previous one
  for (let box of boxes) {
    box.disabled = true;
  }
};

//again enabling the boxes to play again empty all boxes values 
const enableBoxes = () => {  
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


//7. declaring winner
const showWinner = (winner) => {
  msg.innerText = `🎊Congratulations, Winner is 🥳${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//6. check winning pattern
const checkWinner = () => {
  for (let pattern of winPatterns) { //winPattern is array
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;


    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
    //here checking all position have same value i.e 000 or xxx(matchinf pattern in all position) 
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);//7. declaring winner
        return true;
      }
    }
  }
};


//to start new game by clicking restartgame button
newGameBtn.addEventListener("click", RestartGame);
//to restart game whenever we need to start again
RestartBtn.addEventListener("click", RestartGame);