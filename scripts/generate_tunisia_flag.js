const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Official Tunisia Flag SVG: 1200 x 800 (ratio 3:2)
// Red field: #E70013
// White disc: cx=600, cy=400, r=200
// Crescent outer circle: cx=600, cy=400, r=150
// Crescent inner cutout: cx=650, cy=400, r=120
// 5-point star: centered at x=660, y=400, outer r=60, inner r=25, pointing right (0 rad)

function getStarPoints(cx, cy, rOuter, rInner) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5; // 0, 36, 72...
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(' ');
}

const starPoints = getStarPoints(660, 400, 60, 24);

const svgContent = `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="crescent-cutout">
      <!-- White reveals, Black conceals -->
      <rect width="1200" height="800" fill="white" />
      <circle cx="650" cy="400" r="120" fill="black" />
    </mask>
  </defs>

  <!-- Red background matching the Spain flag red and official red -->
  <rect width="1200" height="800" fill="#C62828" />

  <!-- White Central Disc -->
  <circle cx="600" cy="400" r="200" fill="#FFFFFF" />

  <!-- Red Crescent -->
  <circle cx="600" cy="400" r="150" fill="#C62828" mask="url(#crescent-cutout)" />

  <!-- Red 5-Pointed Star -->
  <polygon points="${starPoints}" fill="#C62828" />
</svg>`;

async function main() {
  const targetSvg = path.resolve('public/images/about/tunisia.svg');
  const targetPng = path.resolve('public/images/about/tunisia.png');
  const targetJpg = path.resolve('public/images/about/tunisia.jpeg');

  fs.writeFileSync(targetSvg, svgContent, 'utf8');
  console.log('Saved SVG to:', targetSvg);

  const buffer = Buffer.from(svgContent);
  await sharp(buffer).png().toFile(targetPng);
  console.log('Saved PNG to:', targetPng);

  await sharp(buffer).jpeg({ quality: 95 }).toFile(targetJpg);
  console.log('Saved JPEG to:', targetJpg);
}

main().catch(console.error);
