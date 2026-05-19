const fs = require('fs');
const path = require('path');

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== 'linux') {
    return;
  }

  const executableName = context.packager.executableName;
  const executablePath = path.join(context.appOutDir, executableName);
  const binaryPath = `${executablePath}.bin`;

  if (!fs.existsSync(executablePath) || fs.existsSync(binaryPath)) {
    return;
  }

  fs.renameSync(executablePath, binaryPath);

  const launcher = `#!/bin/sh
set -eu
APPDIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
export ELECTRON_DISABLE_SANDBOX=1
exec "$APPDIR/${executableName}.bin" --no-sandbox "$@"
`;

  fs.writeFileSync(executablePath, launcher, { mode: 0o755 });
};
