// filepath: [script.js](http://_vscodecontentref_/0)
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
      card.querySelector('.card-inner').classList.toggle('is-flipped');
    });
  });