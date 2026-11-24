// The One-Line Cat Joke That Lands — make.fun bounty
// u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
// Writes exactly one cat joke (one line, 1-200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. No network, no secrets, no dependencies.
const fs = require("node:fs");
const path = require("node:path");

// The joke: setup (cat knocks phone off) + turn (the cat blames the human).
// Short on purpose — the tie-break favours fewer bytes, and a joke that
// lands in one breath is the one a person retells the same day.
const JOKE =
  "My cat knocked my phone off the table, then looked at me like I was the clumsy one.";

function main() {
  const codePoints = [...JOKE];
  if (codePoints.length < 1 || codePoints.length > 200) {
    throw new Error("joke must be 1-200 characters, got " + codePoints.length);
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be whitespace-only");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, JOKE, "utf8");
  // Round-trip validation of exactly what was just written.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== JOKE) {
    throw new Error("round-trip validation failed: output differs from joke");
  }
}

main();
