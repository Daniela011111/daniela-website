// Get canvas and context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: '#0077cc',
  dx: 3, // speed in x
  dy: 3  // speed in y
};

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Update ball position
function updateBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off left/right
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }

  // Bounce off top/bottom
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  requestAnimationFrame(updateBall);
}

// Click event: change color and direction
canvas.addEventListener('click', function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Detect click inside the ball
  const dist = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
  if (dist < ball.radius) {
    // Random color
    ball.color = `hsl(${Math.random() * 360}, 80%, 50%)`;

    // Random new direction
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 2;
    ball.dx = Math.cos(angle) * speed;
    ball.dy = Math.sin(angle) * speed;
  }
});

// Start animation
updateBall();
