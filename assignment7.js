let deck = [];
let dealtCards = [];

function buildDeck() {
  deck = [];
  const suits = ['S', 'H', 'D', 'C'];
  for (let s of suits) {
    for (let i = 1; i <= 13; i++) {
      deck.push(`${s}${i}`);
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function convertCardCodeToFilename(code) {
  const suitMap = {
    'S': 'spades',
    'H': 'hearts',
    'D': 'diamonds',
    'C': 'clubs'
  };

  const rankMap = {
    '1': 'ace',
    '11': 'jack',
    '12': 'queen',
    '13': 'king'
  };

  const suit = suitMap[code[0]];
  const rankNumber = code.slice(1);
  const rank = rankMap[rankNumber] || rankNumber;

  return `${rank}_of_${suit}.png`;
}

function dealCards() {
  const hand = document.getElementById('hand');
  hand.innerHTML = '';
  dealtCards = [];

  buildDeck();
  shuffle(deck);

  for (let i = 0; i < 5; i++) {
    const cardCode = deck.pop();
    dealtCards.push(cardCode);

    const img = document.createElement('img');
    img.src = `images/${convertCardCodeToFilename(cardCode)}`;
    img.classList.add('card');
    img.draggable = true;
    img.id = cardCode;
    img.alt = `Card ${cardCode}`;
    img.addEventListener('dragstart', dragStart);

    hand.appendChild(img);
  }
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

const discard = document.getElementById('discard');

discard.addEventListener('dragover', (e) => {
  e.preventDefault();
  discard.style.backgroundColor = '#ddd';
});

discard.addEventListener('dragleave', () => {
  discard.style.backgroundColor = '';
});

discard.addEventListener('drop', (e) => {
  e.preventDefault();
  discard.style.backgroundColor = '';
  const cardId = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  if (card) {
    card.remove(); // Remove from hand
    discard.appendChild(card); // Move to discard pile
    alert(`Discarded: ${card.alt}`);
  }
});
