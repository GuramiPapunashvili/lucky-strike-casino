const deck = [];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

function createDeck() {
    deck.length = 0; 
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand) {
    if (deck.length > 0) {
        const card = deck.pop();
        hand.push(card);
        return card;
    }
    return null;
}

function getHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    hand.forEach(card => {
        if (card.rank === 'A') {
            value += 11;
            aceCount++;
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            value += 10;
        } else {
            value += parseInt(card.rank);
        }
    });

    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }

    return value;
}

function displayHand(hand, elementId) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = '';  

    hand.forEach(card => {
        const img = document.createElement('img');
        img.src = `cards/${card.rank}_of_${card.suit}.png`;
        img.alt = `${card.rank} of ${card.suit}`;
        handElement.appendChild(img);
    });
}

function checkGameStatus() {
    const playerValue = getHandValue(playerHand);
    const dealerValue = getHandValue(dealerHand);
    
    if (playerValue === 21) {
        document.getElementById('status-text').innerText = 'Blackjack! You win!';
        gameOver = true;
    } else if (playerValue > 21) {
        document.getElementById('status-text').innerText = 'Bust! You lose.';
        gameOver = true;
    } else if (dealerValue === 21) {
        document.getElementById('status-text').innerText = 'Dealer has Blackjack! You lose.';
        gameOver = true;
    } else if (dealerValue > 21) {
        document.getElementById('status-text').innerText = 'Dealer busts! You win!';
        gameOver = true;
    } else if (dealerValue >= 17 && playerValue <= 21 && dealerValue >= playerValue) {
        document.getElementById('status-text').innerText = 'Dealer wins!';
        gameOver = true;
    } else if (dealerValue >= 17 && playerValue > dealerValue) {
        document.getElementById('status-text').innerText = 'You win!';
        gameOver = true;
    }
}

document.getElementById('hit').addEventListener('click', function () {
    if (!gameOver) {
        dealCard(playerHand);
        displayHand(playerHand, 'player-hand');
        checkGameStatus();
    }
});

document.getElementById('stand').addEventListener('click', function () {
    if (!gameOver) {
        while (getHandValue(dealerHand) < 17) {
            dealCard(dealerHand);
        }
        displayHand(dealerHand, 'dealer-hand');
        checkGameStatus();
    }
});

document.getElementById('new-game').addEventListener('click', function () {
    gameOver = false;
    playerHand = [];
    dealerHand = [];
    createDeck();
    dealCard(playerHand);
    dealCard(playerHand);
    dealCard(dealerHand);
    document.getElementById('status-text').innerText = 'Game started!';
    displayHand(playerHand, 'player-hand');
    displayHand(dealerHand, 'dealer-hand');
});

