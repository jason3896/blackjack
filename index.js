let player = {
  name: "",
  chips: 100,
};

let dealer = {
  name: "Jack the Dealer",
  years: 42,
};

// Dealer
let dealerCards = [];
let dealerSum = 0;
let dealerHasBlackJack = false;
let dealerIsAlive = false;
let dealerCardsEl = document.getElementById("dealer-cards-el");
let dealerSumEl = document.getElementById("dealer-sum-el");

// Player
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

player.name = prompt("Enter your name: ");
playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
  let randomCardNumber = Math.floor(Math.random() * 13) + 1;

  if (randomCardNumber === 1) {
    let userpick = Number(prompt("ACE! Use it as 1 or 11?"));
    if (userpick === 1) {
      randomCardNumber = userpick;
      return randomCardNumber;
    } else if (userpick === 11) {
      randomCardNumber = userpick;
      return randomCardNumber;
    } else {
      userpick = Number(prompt("Dealer: Choose 1 or 11!!! Or else I will choose for you"));
      if (userpick !== 1 || userpick !== 11) {
        userpick = 11;
        randomCardNumber = userpick;
      } else {
        randomCardNumber = userpick;
        return randomCardNumber;
      }
      return (randomCardNumber = userpick);
    }
  } else if (randomCardNumber === 11 || randomCardNumber === 12 || randomCardNumber === 13) {
    return 10;
  } else {
    return randomCardNumber;
  }
}

function dealerRandomCard() {
  let randomDealerCardNumber = Math.floor(Math.random() * 13) + 1;
  if (randomDealerCardNumber === 1) {
    randomDealerCardNumber = 11;
    return randomDealerCardNumber;
  } else if (randomDealerCardNumber === 11 || randomDealerCardNumber === 12 || randomDealerCardNumber === 13) {
    randomDealerCardNumber = 10;
    return randomDealerCardNumber;
  } else {
    return randomDealerCardNumber;
  }
}

function startGame() {
  //Dealer
  dealerIsAlive = true;
  let dealerFirstCard = dealerRandomCard();
  let dealerSecondCard = dealerRandomCard();
  dealerCards = [dealerFirstCard, dealerSecondCard];
  dealerSum = dealerFirstCard + dealerSecondCard;
  dealerCardsEl.textContent = "Dealer Cards: ";

  for (let c = 0; c < dealerCards.length; c++) {
    dealerCardsEl.textContent += dealerCards[c] + " | ";
  }
  dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

  if (dealerSum === 21) {
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    messageEl.textContent = "You Lost, Dealer got BlackJack. Start Again?";
    player.chips -= 20;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    resetGame();
  } else if (dealerSum > 21) {
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    messageEl.textContent = "You Won, Dealer got a BUST. Start Again?";
    player.chips += 20;
    playerEl.textContent = `${player.name}: $${player.chips}`;
  } else {
    //Player
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let c = 0; c < cards.length; c++) {
    cardsEl.textContent += cards[c] + " | ";
  }

  sumEl.textContent = "Sum: " + sum;

  if (sum <= 20) {
    message = "Do you want to hit?";
  } else if (sum === 21) {
    message = "---->    BlackJack! You won!    <------";
    player.chips += 20;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    hasBlackJack = true;
    resetGame();
  } else {
    message = "Ouch, Maybe next time.  You Lost!";
    player.chips -= 10;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    isAlive = false;
    resetGame();
  }
  // messageEl.textContent = "Hi";
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let newerCard = getRandomCard();
    sum += newerCard;
    cards.push(newerCard);
    renderGame();
  }
}

function dealerNewCard() {
  if (dealerIsAlive === true && hasBlackJack === false && isAlive === true) {
    while (dealerSum <= sum) {
      let newerDealerCard = dealerRandomCard();
      dealerSum += newerDealerCard;
      dealerCards.push(newerDealerCard);
    }
    endGame();
  }
}

function endGame() {
  if (isAlive === true && hasBlackJack === false) {
    dealerCardsEl.textContent = "Dealer Cards: ";
    for (let c = 0; c < dealerCards.length; c++) {
      dealerCardsEl.textContent += dealerCards[c] + " | ";
    }
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

    if (dealerSum < sum && isAlive === true) {
      dealerNewCard();
    } else {
      if (dealerSum >= sum && dealerSum <= 21) {
        messageEl.textContent = "Dealer Wins";
        player.chips -= 10;
        playerEl.textContent = `${player.name}: $${player.chips}`;
      } else {
        messageEl.textContent = "You Win Congratulations!";
        player.chips += 10;
        playerEl.textContent = `${player.name}: $${player.chips}`;
      }
      resetGame();
    }
  }
}

function resetGame() {
  dealerCards = [];
  dealerSum = 0;
  cards = [];
  sum = 0;
  hasBlackJack = false;
  isAlive = false;
  dealerIsAlive = false;
  dealerHasBlackJack = false;
}
