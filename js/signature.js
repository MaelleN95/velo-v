const canvas = document.getElementById('signature');

// Get the 2D context for drawing
const ctx = canvas.getContext('2d');

let drawing = false; // Indicates whether the user is currently drawing
export let hasSignature = false; // Indicates whether a signature has been drawn

// Set initial drawing styles for the canvas
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
  const rect = canvas.getBoundingClientRect(); // Get the canvas position relative to the viewport
  const scaleX = canvas.width / rect.width; // Calculate horizontal scaling factor
  const scaleY = canvas.height / rect.height; // Calculate vertical scaling factor

  return {
    x: (e.clientX - rect.left) * scaleX, // Adjusted X coordinate
    y: (e.clientY - rect.top) * scaleY, // Adjusted Y coordinate
  };
};

/**
 * Clear the canvas and reset the signature status.
 * This function is triggered when the "Clear" button is clicked.
 */
export const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hasSignature = false;
};

// Add an event listener to the "Clear" button to clear the canvas
document.getElementById('clearBtn').addEventListener('click', clearCanvas);

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  // Get the mouse position on the canvas
  const pos = getMousePos(canvas, e);
  ctx.beginPath(); // Begin a new path
  ctx.moveTo(pos.x, pos.y); // Move the pen to the starting position
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    // Get the mouse position on the canvas
    const pos = getMousePos(canvas, e);
    ctx.lineTo(pos.x, pos.y); // Draw a line to the new point
    ctx.stroke(); // Stroke the path
  }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  drawing = false;
  hasSignature = true;
});
