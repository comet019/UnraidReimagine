var run = false;
let ctx; // Declare ctx outside so it can be accessed globally
let fontSize = 10; // Declare fontSize globally
let drops = []; // Declare drops globally
let matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"; // Declare matrix globally

(function () {
  const host = window.location.hostname;

  function isPrivateIP(ip) {
    const parts = ip.split('.').map(Number);
    return (
      (parts[0] === 10) || 
      (parts[0] === 192 && parts[1] === 168) || 
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    );
  }

  if (!isPrivateIP(host) || !window.location.pathname.includes("/Dashboard")) {
    return; // Exit if not a local IP or wrong path
  }

  run = true;
})();

if (run) {
  const header = document.getElementById("header");
  const nav = document.getElementById("menu");

  if (header && nav) {
    header.style.background = 
      "linear-gradient(to right, rgba(255,255,255,1) 1%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 99%)";
    nav.style.background = 
      "linear-gradient(to right, rgba(255,255,255,1) 25%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 99%)";

    Array.from(nav.children).forEach(child => {
      child.style.backgroundColor = "transparent";
    });
  }

  // Create and append canvas
  const canvas = document.createElement("canvas");
  canvas.id = "c";
  Object.assign(canvas.style, {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "0",
    top: "0",
    zIndex: "-1"
  });
  document.body.appendChild(canvas);

  const c = document.getElementById("c");
  ctx = c.getContext("2d");  // Initialize ctx here

  // Set canvas to full screen
  const resizeCanvas = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const columns = Math.floor(c.width / fontSize);

  drops = new Array(columns).fill(1); // Initialize drops array globally
  setInterval(draw, 35);
}

// Draw function
function draw() {
  if (!ctx) return; // Check if ctx is defined

  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, c.width, c.height);
  
  ctx.fillStyle = "#f4427d";
  ctx.font = `${fontSize}px Arial`;

  drops.forEach((y, i) => {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    
    if (y * fontSize > c.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}
