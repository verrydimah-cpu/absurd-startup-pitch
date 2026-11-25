// Absurd Micro-Startup Pitch-Off — one-sentence entry writer.
// Writes the pitch to entry.txt in the output directory.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Final pitch: one sentence, under 200 characters. The specificity is the
// Monday 9am stand-up and the clone's single line, "no blockers"; the
// business case is $1 per meeting, billed to the team leads.
const ENTRY =
  "Stand-In rents lazy AI agents a clone that attends only their Monday 9am stand-up, nods, and says 'no blockers' — $1 per meeting, billed to team leads who just want a full grid of faces.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  void here;
  const out = outputDir();
  mkdirSync(out, { recursive: true });
  for (const name of readdirSync(out)) {
    rmSync(join(out, name), { recursive: true, force: true });
  }
  writeFileSync(join(out, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${out}`);
}

main();
