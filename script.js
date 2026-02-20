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
  const spawnInterval = 2000;

  // 🎵 Create Audio Context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  function playBeat() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle";   // change to "sine" or "triangle" if softer
    oscillator.frequency.value = 600; // pitch

    gainNode.gain.value = 0.2; // volume

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // short beep
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

    playBeat(); // 🎵 Play generated beat when target appears

    setTimeout(() => {
      target.style.display = "none";
    }, visibleDuration);
  }

  startBtn.addEventListener("click", function () {
    score = 0;
    scoreDisplay.textContent = score;

    // Resume audio context (required by browsers)
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
    }
  });

});

