#!/usr/bin/env bash
# Encodeert de gerenderde frames + placeholder-audio naar een low-res mp4 (animatic).
# Gebruik: ./encode.sh [frames-map] [audio.wav] [uit.mp4]
set -euo pipefail
cd "$(dirname "$0")"
FRAMES="${1:-../out/frames}"
AUDIO="${2:-../out/animatic-audio.wav}"
OUT="${3:-../out/intusens-animatic-v0.1.mp4}"
FFMPEG="${FFMPEG:-$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())' 2>/dev/null || echo ffmpeg)}"
"$FFMPEG" -y -hide_banner -loglevel error \
  -framerate 24 -i "$FRAMES/%05d.png" -i "$AUDIO" \
  -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k -shortest "$OUT"
echo "geschreven: $OUT"
