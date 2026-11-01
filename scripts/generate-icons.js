import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function generatePng(width, height, isMaskable = false) {
  const rawRows = [];
  const cx = width / 2;
  const cy = height / 2;
  const rOuter = (width / 2) * (isMaskable ? 0.75 : 0.88);
  const rCard = (width / 2) * (isMaskable ? 0.55 : 0.65);

  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0;

    for (let x = 0; x < width; x++) {
      const idx = 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Clean Black/Zinc background (#18181b)
      let r = 24;
      let g = 24;
      let b = 27;
      let a = 255;

      // Outer border circle or squircle
      if (Math.abs(dist - rOuter) < width * 0.02) {
        r = 255; g = 255; b = 255;
      } else if (dist < rOuter && dist > rCard) {
        r = 39; g = 39; b = 42;
      } else if (dist <= rCard) {
        // Inner white/black symbols: Plus on left, Minus on right
        if (Math.abs(dy) < rCard * 0.7 && Math.abs(dx) < rCard * 0.7) {
          // Vertical and horizontal divider
          if (Math.abs(dx) < width * 0.015) {
            r = 113; g = 113; b = 122;
          } else if (dx < -width * 0.08) {
            // Left: Plus (+) in white
            const cpx = cx - width * 0.22;
            const cpy = cy;
            const inVertical = Math.abs(x - cpx) < width * 0.03 && Math.abs(y - cpy) < width * 0.12;
            const inHorizontal = Math.abs(y - cpy) < width * 0.03 && Math.abs(x - cpx) < width * 0.12;
            if (inVertical || inHorizontal) {
              r = 255; g = 255; b = 255;
            } else {
              r = 24; g = 24; b = 27;
            }
          } else if (dx > width * 0.08) {
            // Right: Minus (-) in white
            const cmx = cx + width * 0.22;
            const cmy = cy;
            const inMinus = Math.abs(y - cmy) < width * 0.03 && Math.abs(x - cmx) < width * 0.12;
            if (inMinus) {
              r = 255; g = 255; b = 255;
            } else {
              r = 24; g = 24; b = 27;
            }
          }
        }
      }

      row[idx] = r;
      row[idx + 1] = g;
      row[idx + 2] = b;
      row[idx + 3] = a;
    }
    rawRows.push(row);
  }

  const rawData = Buffer.concat(rawRows);
  const compressed = zlib.deflateSync(rawData, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    signature,
    createChunk('IHDR', ihdrData),
    createChunk('IDAT', compressed),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePng(48, 48, false));

console.log('Minimalist B&W icons regenerated!');
