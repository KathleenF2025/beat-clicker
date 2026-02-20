document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  const scoreDisplay = document.getElementById("score");
  const target = document.getElementById("target");

  let isVisible = false;

  
  function showTarget() {
  const gameArea = document.getElementById("game-area");


  // Get area dimensions
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const targetSize = 80; // matches CSS size

  // Generate random position inside container
  const randomX = Math.floor(Math.random() * (areaWidth - targetSize));
  const randomY = Math.floor(Math.random() * (areaHeight - targetSize));

  target.style.left = randomX + "px";
  target.style.top = randomY + "px";

  target.style.display = "block";
  isVisible = true;

  setTimeout(() => {
    target.style.display = "none";
    isVisible = false;
  }, 800);
}

  

  setInterval(showTarget, 2000);

  target.addEventListener("click", () => {
    if (isVisible) {
      score += 2;
      scoreDisplay.textContent = score;
    }
  });

});
