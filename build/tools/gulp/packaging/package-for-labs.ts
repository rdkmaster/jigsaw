import {writeFileSync} from 'fs';
import {join} from 'path';
import {buildConfig} from './build-config';

/** Version of the project that will be used to replace the placeholder. */
const {projectVersion} = buildConfig;

/** Updates the `package.json` file of the specified package. Replaces the version placeholder. */
export function updatePackageForLabs(packageDir: string) {
  const packagePath = join(packageDir, 'package.json');
  const packageConfig = require(packagePath);

  // Replace the `0.0.0-PLACEHOLDER` version name with the version of the root package.json file.
  packageConfig.version = packageConfig.version.replace('0.0.0-PLACEHOLDER', projectVersion);
  packageConfig.name = "@rdkmaster/jigsaw-labs";
  packageConfig.main = "./public_api.ts";
  packageConfig.module = "./public_api.ts";
  packageConfig.es2015 = "";
  packageConfig.typings = "./index.d.ts";

  writeFileSync(packagePath, JSON.stringify(packageConfig, null, 2));
}
