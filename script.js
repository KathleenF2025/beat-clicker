document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  const scoreDisplay = document.getElementById("score");
  const target = document.getElementById("target");
  const gameArea = document.getElementById("game-area");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");

  let lastSpawnTime = 0;
  let gameInterval = null;

  const visibleDuration = 1200;
  let spawnInterval = 2000; // now adjustable

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  function playBeat() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
  }

  function showTarget() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetSize = 50;

    const randomX = Math.floor(Math.random() * (areaWidth - targetSize));
    const randomY = Math.floor(Math.random() * (areaHeight - targetSize));

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
    target.style.display = "block";

    lastSpawnTime = Date.now();

    playBeat();

    setTimeout(() => {
      target.style.display = "none";
    }, visibleDuration);
  }

  startBtn.addEventListener("click", function () {
    score = 0;
    spawnInterval = 2000; // reset difficulty
    scoreDisplay.textContent = score;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (!gameInterval) {
      gameInterval = setInterval(showTarget, spawnInterval);
    }
  });

  stopBtn.addEventListener("click", function () {
    clearInterval(gameInterval);
    gameInterval = null;
    target.style.display = "none";
  });

  target.addEventListener("click", function () {
    const now = Date.now();
    const timeSinceSpawn = now - lastSpawnTime;

    if (timeSinceSpawn <= visibleDuration) {
      score += 2;
      scoreDisplay.textContent = score;
      target.style.display = "none";

      // 🎯 Difficulty increases every 10 points
      if (score % 10 === 0 && spawnInterval > 800) {
        spawnInterval -= 200;

        clearInterval(gameInterval);
        gameInterval = setInterval(showTarget, spawnInterval);
      }
    }
  });

});
