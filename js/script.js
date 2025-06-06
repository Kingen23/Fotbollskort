const playerData = {
    "players": [
        {
            "name": "Lionel Messi",
            "position": "RW",
            "team": "Inter Miami",
            "image": "images/pepsi.jpg",
            "clubLogo": "images/logos/miami.png",
            "stats": { "goals": 24, "assists": 18, "matches": 30 }
        },
        {
            "name": "Cristiano Ronaldo",
            "position": "ST",
            "team": "Al Nassr",
            "image": "images/penaldo.jpg",
            "clubLogo": "images/logos/al-nassr.png",
            "stats": { "goals": 28, "assists": 5, "matches": 32 }
        },
        {
            "name": "Neymar Jr",
            "position": "LW",
            "team": "Santos",
            "image": "images/neymar.jpg",
            "clubLogo": "images/logos/santos.png",
            "stats": { "goals": 20, "assists": 10, "matches": 28 }
        },
        {
            "name": "Kylian Mbappé",
            "position": "ST",
            "team": "Real Madrid",
            "image": "images/mbappe.jpg",
            "clubLogo": "images/logos/real madrid.jpg",
            "stats": { "goals": 30, "assists": 12, "matches": 35 }
        },
        {
            "name": "Kevin De Bruyne",
            "position": "CM",
            "team": "Manchester City",
            "image": "images/kevin.jpg",
            "clubLogo": "images/logos/city.png",
            "stats": { "goals": 10, "assists": 15, "matches": 30 }
        },
        {
            "name": "Erling Haaland",
            "position": "ST",
            "team": "Manchester City",
            "image": "images/haaland.jpg",
            "clubLogo": "images/logos/city.png",
            "stats": { "goals": 35, "assists": 5, "matches": 30 }
        },
        {
            "name": "Mohamed Salah",
            "position": "RW",
            "team": "Liverpool",
            "image": "images/salah.jpg",
            "clubLogo": "images/logos/liverpool.png",
            "stats": { "goals": 22, "assists": 9, "matches": 33 }
          }
      
        

    ]
};

document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
        card.querySelector('.card-inner').classList.toggle('is-flipped');
    });
});

const players = playerData.players;      // full deck
let availablePlayers = [...players];     // will remove dealt cards
const maxPerArea = 2;
const replaceUsed = { 1: false, 2: false };

// helper: build a card element (front + back + flip handler)
function createCardElement(p, idx) {
  const colorClass = idx % 2 ? 'card-blue' : 'card-red';
  const card = document.createElement('div');
  card.className = `player-card ${colorClass}`;
  // attach stats & name onto dataset
  card.dataset.goals   = p.stats.goals;
  card.dataset.assists = p.stats.assists;
  card.dataset.name    = p.name;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${p.image}" alt="${p.name}" class="player-image">
        <div class="player-info">
          <h2 class="player-name">${p.name}</h2>
          <p class="player-position">${p.position}</p>
          <p class="player-team">${p.team}</p>
          <img src="${p.clubLogo}" alt="${p.team} Logo" class="club-logo">
        </div>
      </div>
      <div class="card-back">
        <div class="stats">
          <div><span>${p.stats.goals}</span><small>Goals</small></div>
          <div><span>${p.stats.assists}</span><small>Assists</small></div>
          <div><span>${p.stats.matches}</span><small>Matches</small></div>
        </div>
      </div>
    </div>`;
  // flip on click
  card.querySelector('.card-inner')
      .addEventListener('click', e => e.currentTarget.classList.toggle('is-flipped'));
  return card;
}

function updateWinnerButton() {
  const btn = document.getElementById('show-winner');
  const a1 = document.getElementById('cards-container-1').childElementCount;
  const a2 = document.getElementById('cards-container-2').childElementCount;
  if (a1 >= maxPerArea && a2 >= maxPerArea) {
    if (btn.style.display !== 'inline-block') {
      btn.style.display = 'inline-block';
      btn.classList.add('bounce');
      // remove bounce class after animation completes
      setTimeout(() => btn.classList.remove('bounce'), 800);
    }
  }
}

// called when “Open” clicked for area #1 or #2
function addRandomCard(areaId) {
  const container = document.getElementById(`cards-container-${areaId}`);
  if (container.childElementCount >= maxPerArea) return;

  // nothing left
  if (availablePlayers.length === 0) return;

  // pick and remove from availablePlayers to avoid duplicates
  const rnd = Math.floor(Math.random() * availablePlayers.length);
  const p = availablePlayers.splice(rnd, 1)[0];
  // find original index for colorClass
  const idx = players.indexOf(p);

  const card = createCardElement(p, idx);
  container.appendChild(card);
  card.classList.add('revealing');
  setTimeout(() => card.classList.remove('revealing'), 1000);

  updateWinnerButton();

  // only after the *second* card is in place...
  if (container.childElementCount === maxPerArea) {
    // hide Open
    document.querySelector(`.add-btn[data-area="${areaId}"]`)
            .style.display = 'none';
    // show Replace once
    if (!replaceUsed[areaId]) {
      document.querySelector(`.replace-btn[data-area="${areaId}"]`)
              .style.display = 'inline-block';
    }
  }
}

// wire both buttons
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    addRandomCard(btn.dataset.area);
  });
});

// wire replace buttons
document.querySelectorAll('.replace-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const areaId = btn.dataset.area;
    if (replaceUsed[areaId]) return;

    const container = document.getElementById(`cards-container-${areaId}`);
    const cards = container.querySelectorAll('.player-card');
    // pick a random existing card to replace
    const removeIdx = Math.floor(Math.random() * cards.length);
    const oldCard = cards[removeIdx];
    const oldName = oldCard.dataset.name;
    // return old player to deck
    const oldPlayer = players.find(p => p.name === oldName);
    availablePlayers.push(oldPlayer);

    // remove old card
    container.removeChild(oldCard);

    // draw new card
    if (availablePlayers.length) {
      const rnd = Math.floor(Math.random() * availablePlayers.length);
      const newP = availablePlayers.splice(rnd, 1)[0];
      const idx = players.indexOf(newP);
      const newCard = createCardElement(newP, idx);
      newCard.classList.add('revealing');
      container.appendChild(newCard);
      setTimeout(() => newCard.classList.remove('revealing'), 1000);
    }

    // disable Replace button
    btn.style.display = 'none';
    replaceUsed[areaId] = true;
  });
});

// replace the show‐winner logic with group‐summing per area
document.getElementById('show-winner').addEventListener('click', () => {
  const area1Cards = document.querySelectorAll('#cards-container-1 .player-card');
  const area2Cards = document.querySelectorAll('#cards-container-2 .player-card');

  const sumPoints = cards => Array.from(cards).reduce((sum, c) =>
    sum + (+c.dataset.goals) + (+c.dataset.assists), 0
  );

  const score1 = sumPoints(area1Cards);
  const score2 = sumPoints(area2Cards);
  let resultText = '';
  let winnerContainerId = '';

  if (score1 > score2) {
    resultText = `Winner: Player Area 1 (${score1} vs ${score2})`;
    winnerContainerId = 'cards-container-1';
  } else if (score2 > score1) {
    resultText = `Winner: Player Area 2 (${score2} vs ${score1})`;
    winnerContainerId = 'cards-container-2';
  } else {
    resultText = `Tie: ${score1} vs ${score2}`;
  }

  document.getElementById('winner-text').textContent = resultText;

  // fire confetti on the winning area only
  if (winnerContainerId) {
    const container = document.getElementById(winnerContainerId);
    const rect = container.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 150,
      spread: 60,
      origin: { x: originX, y: originY }
    });
  }

  // spawn balloons (optional)
  const colors = ['🎈','🎉','🎊','🥳'];
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.textContent = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.position = 'absolute';
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.bottom = '0';
    balloon.style.fontSize = '2rem';
    balloon.style.animation = `float-up ${Math.random() * 2 + 3}s ease-in forwards`;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 5000);
  }
});

// wire up Restart button
document.getElementById('restart-btn').addEventListener('click', () => {
  // reset deck & clear cards…
  availablePlayers = [...players];
  replaceUsed[1] = replaceUsed[2] = false;
  document.getElementById('cards-container-1').innerHTML = '';
  document.getElementById('cards-container-2').innerHTML = '';

  // hide winner…
  document.getElementById('winner-text').textContent = '';
  document.getElementById('show-winner').style.display = 'none';

  // re-show both Open buttons
  document.querySelectorAll('.add-btn')
    .forEach(btn => btn.style.display = 'inline-block');
  document.querySelectorAll('.replace-btn')
    .forEach(btn => btn.style.display = 'none');
});