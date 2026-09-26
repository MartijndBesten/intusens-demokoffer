/* Rendert de animatic frame-voor-frame met Playwright (Chromium).
 * Gebruik:
 *   node render.js --stills 1.2,3.0,7.5 --out ../out/stills      → losse PNG's (compositiecheck)
 *   node render.js --out ../out/frames --scale 0.5               → alle frames (960x540 bij scale 0.5)
 * Vereist: playwright (globaal via NODE_PATH) en een http-server op de repo-root (poort 8765).
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const T = require('./timeline.js');

const args = process.argv.slice(2);
const opt = { out: '../out/frames', scale: 0.5, stills: null, port: 8765 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') opt.out = args[++i];
  else if (args[i] === '--scale') opt.scale = +args[++i];
  else if (args[i] === '--stills') opt.stills = args[++i].split(',').map(Number);
  else if (args[i] === '--port') opt.port = +args[++i];
  else if (args[i] === '--pipe') opt.pipe = args[++i];      // final: frames direct naar ffmpeg (geen PNG's op schijf)
  else if (args[i] === '--audio') opt.audio = args[++i];
}
const outDir = path.resolve(__dirname, opt.out);
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: opt.scale });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:${opt.port}/video/animatic/index.html?render=1`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__ready === true);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const shot = async (t, file) => {
    await page.evaluate((tt) => window.seek(tt), t);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.screenshot({ path: file, type: 'png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  };

  if (opt.pipe) {
    // final: H.264 High, CRF 16, yuv420p, faststart; audio = het bevroren mix-bestand, alleen AAC-gecodeerd (256 kbit/s)
    const { spawn, execSync } = require('child_process');
    const ff = execSync("python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'").toString().trim();
    const outFile = path.resolve(process.cwd(), opt.pipe);
    const ffArgs = ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(T.fps), '-i', '-'];
    if (opt.audio) ffArgs.push('-i', path.resolve(process.cwd(), opt.audio));
    ffArgs.push('-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart');
    if (opt.audio) ffArgs.push('-c:a', 'aac', '-b:a', '256k', '-shortest');
    ffArgs.push(outFile);
    const proc = spawn(ff, ffArgs, { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(T.duration * T.fps), t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await page.evaluate((tt) => window.seek(tt), i / T.fps);
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      if (!proc.stdin.write(buf)) await new Promise((r) => proc.stdin.once('drain', r));
      if (i % 48 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    proc.stdin.end(); await new Promise((r) => proc.on('close', r));
    console.log('final geschreven:', outFile);
  } else if (opt.stills) {
    for (const t of opt.stills) {
      const f = path.join(outDir, `still-${t.toFixed(2).replace('.', '_')}.png`);
      await shot(t, f); console.log('still', t, f);
    }
  } else {
    const n = Math.round(T.duration * T.fps);
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      await shot(i / T.fps, path.join(outDir, String(i).padStart(5, '0') + '.png'));
      if (i % 48 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    console.log('frames', n, 'in', outDir);
  }
  await browser.close();
})();
