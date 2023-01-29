import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default function configPackage() {
  const pkg = JSON.parse(readFileSync(path.join('./', 'package.json'), 'utf8'));

  pkg['scripts']['build'] = "npx webpack --config ./webpack.config.cjs";
  pkg['scripts']['start'] = "webpack serve --config ./webpack.config.cjs --open --hot";
  writeFileSync(path.join('./', 'package.json'), JSON.stringify(pkg, null, 2));
  console.log('done')
};

configPackage()