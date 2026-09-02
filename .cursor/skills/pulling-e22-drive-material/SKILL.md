---
name: pulling-e22-drive-material
description: Use when the user asks to pull, trække, or copy E22/62581 Google Drive lesson slides or exercises into docs/background/ or the baggrundsfolder (Lektion NN from the old course).
---

# Pulling E22 Drive material

Verbatim text from the old course Drive folder into `docs/background/lektionN/`, matching Lektion 01.

**Do not fetch Drive files ad hoc** (PowerShell `curl`, browser download, gws CLI). Run the script.

## Run

From the repo root:

```bash
node .cursor/skills/pulling-e22-drive-material/scripts/pull.mjs 3
```

`--force` overwrites existing files. Lesson number may be `3` or `03`.

The script reads folder IDs from `docs/background/e22-drive-materials.md`, lists the public Drive folder, exports Google Slides and Google Docs as plain text, and writes:

- `docs/background/lektionN/forelaesning.md`
- `docs/background/lektionN/oevelser.md`
- `docs/background/lektionN/README.md`

## After the script

1. Read both files. Replace the README **Contents** column with a one-line topic summary (see `docs/background/lektion1/README.md`).
2. Add a row to `docs/background/README.md` if missing.
3. Stop. Do not rewrite student-facing `lektionN/` in the same step, and do not add `#NYT` annotations during the pull.

If the script exits non-zero, report the folder URL and error. Do not invent file IDs.

## When not to use

Student-facing lesson pages (`lektionN/forelaesning.md` etc.) are a later rewrite, not this pull.
