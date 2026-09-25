#!/usr/bin/env node

const { spawnSync } = require('node:child_process');

const result = spawnSync('databricks', process.argv.slice(2), {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd(),
});

if (result.error) {
  if (result.error.code === 'ENOENT') {
    console.error('databronks: databricks was not found on PATH. Install the Databricks CLI first.');
    process.exit(127);
  }

  console.error(`databronks: could not run databricks: ${result.error.message}`);
  process.exit(result.error.code === 'EACCES' ? 126 : 1);
}

if (result.signal) {
  process.kill(process.pid, result.signal);
}

process.exit(result.status ?? 1);
