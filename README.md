<img src="https://raw.githubusercontent.com/nipunn1313/databronks/main/assets/databronks.png" alt="databronks logo" width="320">

# databronks

A tiny alias for the [Databricks CLI](https://docs.databricks.com/aws/en/dev-tools/cli/). Type `databronks` instead of `databricks`; all commands and options go to the Databricks CLI.

## Install

1. Install the [Databricks CLI](https://docs.databricks.com/aws/en/dev-tools/cli/install) and confirm `databricks` is on your `PATH`:

   ```sh
   databricks version
   ```

2. Install `databronks` with npm (Node.js 18 or newer):

   ```sh
   npm install --global databronks
   ```

This package does not install the Databricks CLI or set up Databricks authentication.

## Use

Run any Databricks CLI command with the new name:

```sh
databronks version
databronks workspace list /
databronks --help
```

For a project-local install, use `npm install --save-dev databronks`, then run `npx databronks version` or call `databronks` from an npm script.

`databronks` passes arguments directly to `databricks`. It shares the same working directory, environment, and terminal input/output, and returns the same exit status. If `databricks` is missing from `PATH`, it prints an error and exits with status 127.

## Development

```sh
npm test
npm pack --dry-run
```
