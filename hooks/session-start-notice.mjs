#!/usr/bin/env node
// Emits a small reminder at session start so the agent knows the before-exit
// pattern + automated transcript export are active in this project.
// Invoked by the SessionStart hook (see .claude/settings.local.json).

const payload = {
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: [
      'Before-exit checklist is active in this project.',
      'Auto-memory file: task_before_exit.md.',
      'Session transcript export is automated: PreCompact and SessionEnd hooks copy the active transcript into private/sessions/.',
      'When wrapping up a session that did real work, update projects/index.md + chulls/PROJECTS.md + chulls/LEARNINGS.md per the checklist, and surface open questions before exiting.',
    ].join(' '),
  },
};

process.stdout.write(JSON.stringify(payload));
