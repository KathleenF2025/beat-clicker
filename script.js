document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  const scoreDisplay = document.getElementById("score");
  const target = document.getElementById("target");
  const gameArea = document.getElementById("game-area");

  let lastSpawnTime = 0;
  const visibleDuration = 1200;   // how long it counts as valid click
  const spawnInterval = 2000;     // how often target appears

  function showTarget() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetSize = 80; // must match CSS size

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

  setInterval(showTarget, spawnInterval);

  target.addEventListener("click", function () {

    const now = Date.now();
    const timeSinceSpawn = now - lastSpawnTime;

    if (timeSinceSpawn <= visibleDuration) {
      score += 2;
      scoreDisplay.textContent = score;

      // optional: hide immediately after successful click
      target.style.display = "none";
    }

  });

});
