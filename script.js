const cards=document.querySelectorAll('.mem-card');
const controls = document.querySelector(".controls-container");
let hasFlippedCard=false;
let lockBoard=false;
let firstCard, secondCard;
let move=0;

cards.forEach(
    c=>c.addEventListener('click', flipCard)
);
document.getElementById("start").addEventListener("click", () => {
    timer();
    //controls amd buttons visibility
    controls.classList.add("hide");
    document.getElementById("start").classList.add("hide");
    //Start timer
    interval = setInterval(timeGenerator, 1000);
    //initial moves
    document.getElementById("moves").innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
  });

// new part start
function moves() {
    move++;
    document.getElementsByClassName("moves")[0].innerHTML = "Moves:" +move;
    console.log("hii");
  }
  
  function timer() {
    let secs = 0;
    let mins = 0;
    setInterval(() => {
        secs = secs + 1;
        if(secs>=60){
            mins++;
            secs=0;
        }    
        let secondsValue = secs < 10 ? `0${secs}` : secs;
        let minutesValue = mins < 10 ? `0${mins}` : mins;
        document.getElementsByClassName("timer")[0].innerHTML = "Time: " + minutesValue + ":" + secondsValue;
    }, 1000);
  }
  
  // new part finish

function flipCard(){
    // moves()
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
        return;
    }
    hasFlippedCard=false;
    secondCard=this;
    // do cards match?
    checkForMatch();
}

function checkForMatch(){
    moves();
    let isMatch=firstCard.dataset.name===secondCard.dataset.name;
    isMatch? displayCards() : unflipCards();
}

function displayCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


function unflipCards(){
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1300);
}

function resetBoard(){
    [hasFlippedCard, lockBoard]=[false, false];
    [firstCard, secondCard]=[null, null];
}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 20);
      card.style.order = randomPos;
    });
  })();

