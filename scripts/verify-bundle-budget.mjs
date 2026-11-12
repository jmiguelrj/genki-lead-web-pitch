// @genki-alias: [GENKI-SCRIPT-BUDGET]
// Enforces uncompressed bundle budgets across apps/pitch-site/dist/_astro/.

import { existsSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_DIST_DIR = path.resolve(
  SCRIPT_DIR,
  '../apps/pitch-site/dist/_astro',
);

const BUDGET_RULES = [
  ['Island #1: MigrationBlueprint (*.js)', /^MigrationBlueprint.*\.js$/, 25],
  ['Island #2: SafeAgentSimulator (*.js)', /^SafeAgentSimulator.*\.js$/, 25],
  [
    'Island #3: ClaimPreflightWidget (*.js)',
    /^ClaimPreflightWidget.*\.js$/,
    25,
  ],
  ['Compiled Design Tokens & CSS (index*.css)', /^index.*\.css$/, 40],
];

async function main() {
  if (!existsSync(ASTRO_DIST_DIR)) {
    console.error(
      `[BUDGET FAILURE] Missing ${ASTRO_DIST_DIR}. Run pnpm build.`,
    );
    process.exit(1);
  }

  const files = await readdir(ASTRO_DIST_DIR);
  const rows = [];
  const breaches = [];

  for (const [label, pattern, maxKb] of BUDGET_RULES) {
    const matched = files.filter((name) => pattern.test(name));
    if (matched.length === 0) {
      rows.push([
        label,
        '(missing)',
        'N/A',
        `< ${maxKb.toFixed(2)} KB`,
        'FAIL',
      ]);
      breaches.push(`${label}: missing matching artifact in dist/_astro/`);
      continue;
    }

    for (const artifact of matched) {
      const { size } = await stat(path.join(ASTRO_DIST_DIR, artifact));
      const kb = (size / 1024).toFixed(2);
      const ok = size < maxKb * 1024;
      rows.push([
        label,
        artifact,
        `${kb} KB`,
        `< ${maxKb.toFixed(2)} KB`,
        ok ? 'PASS' : 'FAIL',
      ]);
      if (!ok) {
        breaches.push(`${artifact} (${kb} KB) exceeds ${maxKb} KB ceiling`);
      }
    }
  }

  const div =
    '+-------------------------------------------+----------------------------------+-----------+------------+--------+';
  console.log(
    '\nGenki Bundle Budget Verification Report (apps/pitch-site/dist/_astro)',
  );
  console.log(div);
  console.log(
    '| Budget Target                             | Emitted Artifact                 | Actual    | Ceiling    | Status |',
  );
  console.log(div);
  for (const [target, file, actual, ceiling, status] of rows) {
    console.log(
      `| ${target.padEnd(41)} | ${file.padEnd(32)} | ${actual.padStart(9)} | ${ceiling.padStart(10)} | ${status.padEnd(6)} |`,
    );
  }
  console.log(div);

  if (breaches.length > 0) {
    console.error(`\n[BUDGET FAILURE] ${breaches.length} budget breach(es):`);
    for (const msg of breaches) console.error(`  - ${msg}`);
    process.exit(1);
  }

  console.log(
    '\n[BUDGET PASS] All island JS and CSS bundles within strict ceilings.\n',
  );
}

main().catch((err) => {
  console.error('[BUDGET INTERNAL ERROR]', err);
  process.exit(1);
});
