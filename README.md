<img src="https://raw.githubusercontent.com/nipunn1313/databronks/main/assets/databronks.png" alt="databronks logo" width="320">

# databronks

CLI for [Databronks](https://www.databronks.com).

## Install

1. Install the [Databricks CLI](https://docs.databricks.com/aws/en/dev-tools/cli/install) and confirm `databricks` is on your `PATH`:

   ```sh
   databricks version
   ```

2. Install `databronks` with npm:

   ```sh
   npm install --global databronks
   ```

## Use

Run any Databronks CLI command:

```sh
databronks version
databronks workspace list /
databronks --help
```

## Development

```sh
npm test
npm pack --dry-run
```
