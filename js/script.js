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
            "team": "Al Hilal",
            "image": "images/neymar.jpg",
            "clubLogo": "images/logos/hilal.png",
            "stats": { "goals": 20, "assists": 10, "matches": 28 }
        },
        {
            "name": "Kylian Mbappé",
            "position": "ST",
            "team": "Paris SG",
            "image": "images/mbappe.jpg",
            "clubLogo": "images/logos/psg.png",
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

const players = playerData.players;  // your array of players
const maxPerArea = 2;

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
  const a1 = document.getElementById('cards-container-1').childElementCount;
  const a2 = document.getElementById('cards-container-2').childElementCount;
  if (a1 >= maxPerArea && a2 >= maxPerArea) {
    document.getElementById('show-winner').style.display = 'inline-block';
  }
}

// called when “Open” clicked for area #1 or #2
function addRandomCard(areaId) {
  const container = document.getElementById(`cards-container-${areaId}`);
  if (container.childElementCount >= maxPerArea) return;

  // pick random player & build card
  const idx = Math.floor(Math.random() * players.length);
  const card = createCardElement(players[idx], idx);

  // 1) mark as revealing, append immediately
  card.classList.add('revealing');
  container.appendChild(card);

  // 2) after animation duration, remove the class so card behaves normally
  setTimeout(() => {
    card.classList.remove('revealing');
  }, 1000); // match the 1s in CSS

  // new: check if we can now show the winner button
  updateWinnerButton();
}

// wire both buttons
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    addRandomCard(btn.dataset.area);
  });
});

// replace the show‐winner logic with group‐summing per area
document.getElementById('show-winner').addEventListener('click', () => {
  const area1Cards = document.querySelectorAll('#cards-container-1 .player-card');
  const area2Cards = document.querySelectorAll('#cards-container-2 .player-card');

  // sum points (goals + assists) in each area
  const sumPoints = cards => Array.from(cards).reduce((sum, c) => {
    return sum + (+c.dataset.goals) + (+c.dataset.assists);
  }, 0);

  const score1 = sumPoints(area1Cards);
  const score2 = sumPoints(area2Cards);
  let resultText = '';

  if (score1 > score2) {
    resultText = `Winner: Player Area 1 (${score1} vs ${score2})`;
  } else if (score2 > score1) {
    resultText = `Winner: Player Area 2 (${score2} vs ${score1})`;
  } else {
    resultText = `Tie: ${score1} vs ${score2}`;
  }

  document.getElementById('winner-text').textContent = resultText;
});

// wire up Restart button
document.getElementById('restart-btn').addEventListener('click', () => {
  // clear both areas
  document.getElementById('cards-container-1').innerHTML = '';
  document.getElementById('cards-container-2').innerHTML = '';
  // clear winner text
  document.getElementById('winner-text').textContent = '';
});