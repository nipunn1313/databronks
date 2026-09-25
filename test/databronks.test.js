const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, chmodSync, rmSync, realpathSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { delimiter, join, resolve } = require('node:path');
const test = require('node:test');

const cli = resolve(__dirname, '../bin/databronks.js');

test('forwards arguments, input, environment, output, and exit status', { skip: process.platform === 'win32' }, (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'databronks-test-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));

  const fakeDatabricks = join(directory, 'databricks');
  writeFileSync(fakeDatabricks, `#!${process.execPath}\nconst fs = require('node:fs');\nprocess.stdout.write(JSON.stringify({ args: process.argv.slice(2), input: fs.readFileSync(0, 'utf8'), marker: process.env.DATABRONKS_TEST_MARKER, cwd: process.cwd() }));\nprocess.stderr.write('error output\\n');\nprocess.exit(23);\n`);
  chmodSync(fakeDatabricks, 0o755);

  const result = spawnSync(process.execPath, [cli, 'workspace', 'list', 'a b', '$(echo untouched)'], {
    cwd: directory,
    env: { ...process.env, PATH: `${directory}${delimiter}${process.env.PATH || ''}`, DATABRONKS_TEST_MARKER: 'forwarded' },
    input: 'input data',
    encoding: 'utf8',
  });

  assert.equal(result.status, 23);
  assert.equal(result.stderr, 'error output\n');
  assert.deepEqual(JSON.parse(result.stdout), {
    args: ['workspace', 'list', 'a b', '$(echo untouched)'],
    input: 'input data',
    marker: 'forwarded',
    cwd: realpathSync(directory),
  });
});

test('reports when databricks is missing', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'databronks-test-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));

  const result = spawnSync(process.execPath, [cli, 'version'], {
    env: { ...process.env, PATH: directory },
    encoding: 'utf8',
  });

  assert.equal(result.status, 127);
  assert.match(result.stderr, /databricks was not found on PATH/);
});
