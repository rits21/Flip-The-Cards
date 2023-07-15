const cards=document.querySelectorAll('.mem-card');

let hasFlippedCard=false;
let lockBoard=false;
let firstCard, secondCard;

cards.forEach(
    c=>c.addEventListener('click', flipCard)
);

function flipCard(){
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

