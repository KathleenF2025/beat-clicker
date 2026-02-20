document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  const scoreDisplay = document.getElementById("score");
  const target = document.getElementById("target");
  const gameArea = document.getElementById("game-area");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const bgMusic = document.getElementById("bgMusic");

  let lastSpawnTime = 0;
  let gameInterval = null;

  const visibleDuration = 1200;
  const spawnInterval = 2000;

  function showTarget() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetSize = 80;

    const randomX = Math.floor(Math.random() * (areaWidth - targetSize));
    const randomY = Math.floor(Math.random() * (areaHeight - targetSize));

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
    target.style.display = "block";

    lastSpawnTime = Date.now();

    setTimeout(() => {
      target.style.display = "none";
    }, visibleDuration);
  }

  startBtn.addEventListener("click", function () {
    score = 0;
    scoreDisplay.textContent = score;

    if (!gameInterval) {
      gameInterval = setInterval(showTarget, spawnInterval);
      bgMusic.play();
    }
  });

  stopBtn.addEventListener("click", function () {
    clearInterval(gameInterval);
    gameInterval = null;
    target.style.display = "none";
    bgMusic.pause();
    bgMusic.currentTime = 0;
  });

  target.addEventListener("click", function () {
    const now = Date.now();
    const timeSinceSpawn = now - lastSpawnTime;

    if (timeSinceSpawn <= visibleDuration) {
      score += 2;
      scoreDisplay.textContent = score;
      target.style.display = "none";
    }
  });

});
