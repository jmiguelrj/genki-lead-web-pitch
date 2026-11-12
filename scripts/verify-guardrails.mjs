// @genki-alias: [GENKI-SCRIPT-GUARDRAILS]
/**
 * Genki Deterministic AI Guardrail Engine (`scripts/verify-guardrails.mjs`)
 *
 * Recursively scans `packages/` and `apps/` to enforce:
 *  - Rule 1 (Token Enforcement): Zero raw hex (`#...`), `rgb(`, or `hsl(` colors in `*.module.scss`.
 *  - Rule 2 (Type & XSS Safety): Zero `dangerouslySetInnerHTML`, `set:html`, `@ts-ignore`,
 *    `@ts-expect-error`, or explicit `: any` in `.ts`, `.tsx`, and `.astro` files.
 */

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const TARGET_DIRS = ['packages', 'apps'];
const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  '.astro',
  '.wrangler',
  '.git',
]);

const SCSS_RULES = [
  {
    id: 'TOKEN-NO-HEX',
    label: 'Raw hex color literal (use var(--genki-*))',
    regex: /#[0-9a-fA-F]{3,8}\b/g,
  },
  {
    id: 'TOKEN-NO-RGB-HSL',
    label: 'Raw rgb()/hsl() color function (use var(--genki-*))',
    regex: /\b(?:rgba?|hsla?)\s*\(/g,
  },
];

const CODE_RULES = [
  {
    id: 'XSS-NO-DANGEROUS-HTML',
    label: 'Forbidden dangerouslySetInnerHTML usage',
    regex: /\bdangerouslySetInnerHTML\b/g,
  },
  {
    id: 'XSS-NO-ASTRO-SET-HTML',
    label: 'Forbidden Astro set:html directive',
    regex: /\bset:html\b/g,
  },
  {
    id: 'TS-NO-IGNORE',
    label: 'Forbidden @ts-ignore directive',
    regex: /@ts-ignore\b/g,
  },
  {
    id: 'TS-NO-EXPECT-ERROR',
    label: 'Forbidden @ts-expect-error directive',
    regex: /@ts-expect-error\b/g,
  },
  {
    id: 'TS-NO-EXPLICIT-ANY',
    label: 'Forbidden explicit `: any` type annotation',
    regex: /:\s*any\b/g,
  },
];

/**
 * Recursively collects all file paths inside `dirPath`, returning `[]` if missing/empty.
 */
async function collectFiles(dirPath) {
  if (!existsSync(dirPath)) {
    return [];
  }

  const entries = await readdir(dirPath, { withFileTypes: true });
  const collected = [];

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectFiles(fullPath);
      collected.push(...nested);
    } else if (entry.isFile()) {
      collected.push(fullPath);
    }
  }

  return collected;
}

/**
 * Strips SCSS block/line comments while preserving newlines for accurate line numbers.
 */
function stripScssComments(source) {
  const withoutBlocks = source.replace(/\/\*[\s\S]*?\*\//g, (match) =>
    match.replace(/[^\n]/g, ' '),
  );
  return withoutBlocks.replace(/(^|[^:])\/\/.*$/gm, (_, prefix) => `${prefix}`);
}

/**
 * Scans file content line-by-line against a list of regex rules.
 */
function scanContent(relPath, content, rules) {
  const violations = [];
  const lines = content.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? '';
    for (const rule of rules) {
      rule.regex.lastIndex = 0;
      const match = rule.regex.exec(line);
      if (match) {
        violations.push({
          file: relPath,
          line: index + 1,
          ruleId: rule.id,
          message: rule.label,
          token: match[0],
        });
      }
    }
  }

  return violations;
}

async function main() {
  const allFiles = [];
  for (const dir of TARGET_DIRS) {
    const dirFiles = await collectFiles(path.join(ROOT_DIR, dir));
    allFiles.push(...dirFiles);
  }

  const scssModuleFiles = allFiles.filter((f) => f.endsWith('.module.scss'));
  const codeFiles = allFiles.filter(
    (f) => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.astro'),
  );

  const scssViolations = [];
  for (const filePath of scssModuleFiles) {
    const raw = await readFile(filePath, 'utf8');
    const sanitized = stripScssComments(raw);
    const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    scssViolations.push(...scanContent(relPath, sanitized, SCSS_RULES));
  }

  const codeViolations = [];
  for (const filePath of codeFiles) {
    const raw = await readFile(filePath, 'utf8');
    const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    codeViolations.push(...scanContent(relPath, raw, CODE_RULES));
  }

  const rows = [
    {
      gate: 'Rule 1: Design Token Enforcement (*.module.scss)',
      scanned: scssModuleFiles.length,
      violations: scssViolations.length,
      status: scssViolations.length === 0 ? 'PASS' : 'FAIL',
    },
    {
      gate: 'Rule 2: Type & XSS Safety (.ts, .tsx, .astro)',
      scanned: codeFiles.length,
      violations: codeViolations.length,
      status: codeViolations.length === 0 ? 'PASS' : 'FAIL',
    },
  ];

  const divider =
    '+---------------------------------------------------+---------+------------+--------+';
  console.log('\nGenki AI Guardrail Verification Report');
  console.log(divider);
  console.log(
    '| Guardrail Gate                                    | Scanned | Violations | Status |',
  );
  console.log(divider);
  for (const row of rows) {
    const gateCol = row.gate.padEnd(49);
    const scannedCol = String(row.scanned).padStart(7);
    const violationsCol = String(row.violations).padStart(10);
    const statusCol = row.status.padEnd(6);
    console.log(
      `| ${gateCol} | ${scannedCol} | ${violationsCol} | ${statusCol} |`,
    );
  }
  console.log(divider);

  const allViolations = [...scssViolations, ...codeViolations];
  if (allViolations.length > 0) {
    console.error(
      `\n[GUARDRAIL FAILURE] Found ${allViolations.length} violation(s):`,
    );
    for (const v of allViolations) {
      console.error(
        `  - ${v.file}:${v.line} [${v.ruleId}] ${v.message} (matched: "${v.token}")`,
      );
    }
    process.exit(1);
  }

  console.log('\n[GUARDRAIL PASS] Zero architectural violations detected.\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('[GUARDRAIL INTERNAL ERROR]', err);
  process.exit(1);
});
