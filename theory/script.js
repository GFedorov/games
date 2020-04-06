const canvas = document.querySelector('.canvas canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.ellipse(160, 75, 50, 50, 0, 0, Math.PI * 2);
ctx.fill();