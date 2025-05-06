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

const players = playerData.players;      // all players
const container = document.getElementById('cards-container');
const btn = document.getElementById('random-btn');

function renderPlayer(p, idx) {
  container.innerHTML = '';              // clear any existing card
  const colorClass = idx % 2 ? 'card-blue' : 'card-red';
  const card = document.createElement('div');
  card.className = `player-card ${colorClass}`;
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
  card.querySelector('.player-card');  // ensure layout
  // flip on click
  card.querySelector('.card-inner')
      .addEventListener('click', e => {
        e.currentTarget.classList.toggle('is-flipped');
      });
  container.appendChild(card);
}

function showRandom() {
  const idx = Math.floor(Math.random() * players.length);
  renderPlayer(players[idx], idx);
}

// wire up button
btn.addEventListener('click', showRandom);

// show one on load
showRandom();