#!/usr/bin/env bash
set -euo pipefail
SRC="assets/Video-533.mp4"
OUT="public/frames"
mkdir -p "$OUT"
# Extract ~90 frames, scaled to 1280 wide, sequential numbering.
ffmpeg -y -i "$SRC" -vf "fps=15,scale=1280:-2" -q:v 4 "$OUT/frame_%04d.jpg"
COUNT=$(ls "$OUT" | wc -l | tr -d ' ')
echo "extracted $COUNT frames"
# Use a mid-sequence frame as the static poster / mobile fallback.
MID=$(printf "frame_%04d.jpg" $(( COUNT / 2 )))
cp "$OUT/$MID" public/hero-poster.jpg
echo "poster: $MID"
