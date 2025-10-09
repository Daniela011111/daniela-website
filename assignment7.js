let deck = [];
let dealtCards = [];

function buildDeck() {
  deck = [];  // Clear deck before building
  const suits = ['S', 'H', 'D', 'C'];  // Spades, Hearts, Diamonds, Clubs
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

function dealCards() {
  const hand = document.getElementById('hand');
  hand.innerHTML = '';  // Clear previous cards
  dealtCards = [];

  buildDeck();
  shuffle(deck);

  // Deal 5 cards
  for (let i = 0; i < 5; i++) {
    const cardCode = deck.pop();
    dealtCards.push(cardCode);

    const img = document.createElement('img');
    img.src = `images/cards/${cardCode}.png`;  // Update path if needed
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
  discard.style.backgroundColor = '#ddd'; // Visual highlight on dragover
});

discard.addEventListener('dragleave', (e) => {
  discard.style.backgroundColor = ''; // Remove highlight when drag leaves
});

discard.addEventListener('drop', (e) => {
  e.preventDefault();
  discard.style.backgroundColor = '';
  const cardId = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  if (card) {
    card.remove(); // Remove card from hand
    discard.appendChild(card); // Add card to discard pile
  }
});
