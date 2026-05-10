#!/usr/bin/env node
// Copies the active Claude Code session transcript into private/sessions/
// Invoked by PreCompact and SessionEnd hooks (see .claude/settings.local.json).
// The private/sessions/ folder is gitignored — exports never leak public.

import fs from 'node:fs';
import path from 'node:path';

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  raw += chunk;
});
process.stdin.on('end', () => {
  try {
    const data = raw.trim() ? JSON.parse(raw) : {};
    const src = data.transcript_path;
    if (!src) {
      console.error('[copy-transcript] no transcript_path in hook input — nothing to copy');
      process.exit(0);
    }
    if (!fs.existsSync(src)) {
      console.error(`[copy-transcript] transcript not found at ${src}`);
      process.exit(0);
    }

    const projectRoot = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const outDir = path.join(projectRoot, 'private', 'sessions');
    fs.mkdirSync(outDir, { recursive: true });

    const ts = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .slice(0, 19);
    const event = (data.hook_event_name || 'session').toLowerCase();
    const sid = (data.session_id || '').slice(0, 8);
    const fname = sid
      ? `${ts}-${event}-${sid}.jsonl`
      : `${ts}-${event}.jsonl`;
    const dest = path.join(outDir, fname);

    fs.copyFileSync(src, dest);
    console.error(`[copy-transcript] saved ${dest}`);
  } catch (err) {
    console.error(`[copy-transcript] error: ${err.message}`);
  }
});
