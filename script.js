document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  const scoreDisplay = document.getElementById("score");
  const target = document.getElementById("target");
  const gameArea = document.getElementById("game-area");

  let isVisible = false;
  let hideTimeout = null;

  function showTarget() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const targetSize = 80;

    const randomX = Math.floor(Math.random() * (areaWidth - targetSize));
    const randomY = Math.floor(Math.random() * (areaHeight - targetSize));

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";

    target.style.display = "block";
    isVisible = true;

    // Clear any previous hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    hideTimeout = setTimeout(() => {
      target.style.display = "none";
      isVisible = false;
    }, 800);
  }

  setInterval(showTarget, 2000);

  target.addEventListener("click", function () {
    if (isVisible) {
      score += 2;
      scoreDisplay.textContent = score;

      // Immediately hide after successful click
      target.style.display = "none";
      isVisible = false;
    }
  });

});

