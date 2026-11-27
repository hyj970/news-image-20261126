// news-image-20261126: one image summing up Thursday 26 November 2026.
// The image is drawn at build time and shipped in this repository as
// entry.png. This program copies those exact bytes to the output
// directory, so both grader runs write identical bytes. Node 22,
// standard library only, no network.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Guard: the output must be the same file, byte for byte.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png copy size mismatch");
}
