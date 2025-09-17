const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const sass = require('sass');

const SNAPSHOT_DIR = path.join(__dirname, '__snapshots__');
const SNAPSHOT_PATH = path.join(SNAPSHOT_DIR, 'sass.css');

function compileAllScss() {
  const dir = 'scss';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.scss')).sort();
  const parts = [];
  for (const fileName of files) {
    try {
      const result = sass.compile(path.join(dir, fileName));
      const css = (result.css || '').toString().trim();
      parts.push(`/* ${fileName} */\n${css}`);
    } catch (err) {
      throw new Error(`failed compiling ${fileName}: ${err.message}`);
    }
  }
  return parts.join('\n\n') + '\n';
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

test('SCSS compiles without errors', (t) => {
	assert.doesNotThrow(
		compileAllScss
	)
})

test('Compiled SCSS matches snapshot', (t) => {
  const compiled = compileAllScss();
  ensureDir(SNAPSHOT_DIR);

  const shouldUpdate = process.env.UPDATE_SNAPSHOTS === '1' || process.env.UPDATE_SNAPSHOTS === 'true';

  if (!fs.existsSync(SNAPSHOT_PATH) || shouldUpdate) {
    fs.writeFileSync(SNAPSHOT_PATH, compiled, 'utf8');
    t.diagnostic(`Snapshot ${!fs.existsSync(SNAPSHOT_PATH) ? 'created' : 'updated'} at ${SNAPSHOT_PATH}`);
    assert.ok(true, 'Snapshot written');
    return;
  }

  const expected = fs.readFileSync(SNAPSHOT_PATH, 'utf8');
  assert.equal(compiled, expected, 'Compiled CSS changed. If intentional, run UPDATE_SNAPSHOTS=1 npm test to update the snapshot.');
});
