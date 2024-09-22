const canvas = document.getElementById('signature');

// Get the 2D context for drawing
const ctx = canvas.getContext('2d');

let drawing = false;
export let hasSignature = false;

// Set the canvas style
ctx.lineWidth = 1;
ctx.strokeStyle = '#212529';

/**
 * Get the mouse coordinates adjusted to the canvas.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element where drawing occurs.
 * @param {MouseEvent} e - The mouse event.
 * @returns {{x: number, y: number}} - An object containing the adjusted X and Y coordinates.
 */
const getMousePos = (canvas, e) => {
  const rect = canvas.getBoundingClientRect(); // Get the canvas position relative to the window
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX, // Adjusted X coordinate with scaling
    y: (e.clientY - rect.top) * scaleY, // Adjusted Y coordinate with scaling
  };
};

/**
 * Clear the canvas.
 * This function is called when the "Clear" button is clicked.
 */
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasSignature = false;
};

// Add an event listener to the "Clear" button
document.getElementById('clearBtn').addEventListener('click', clearCanvas);

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const pos = getMousePos(canvas, e);
  ctx.beginPath(); // Begin a new path
  ctx.moveTo(pos.x, pos.y); // Move the pen to the starting position
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const pos = getMousePos(canvas, e);
    ctx.lineTo(pos.x, pos.y); // Draw a line to the new point
    ctx.stroke(); // Stroke the path
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false; // Stop drawing
  hasSignature = true;
});
