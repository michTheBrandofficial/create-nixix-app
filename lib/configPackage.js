import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default function configPackage() {
  const packagePath = path.join('./', 'package.json');
  let pkg;
  if (existsSync(packagePath)) {
    const file = readFileSync(packagePath, 'utf8');
    if (file !== undefined) {
      if (file === '') {
        console.log('Please initialize this project with npm. Type `npm init -y` now, then try again.')
        return null;
      } else if (typeof JSON.parse(file) === 'object') {
        pkg = JSON.parse(file);
      }
    }
  } else {
    console.log('Please initialize this project with npm. Type `npm init -y` now, then try again.')
    return null;
  }
  pkg['scripts']['build'] = "vite build";
  pkg['scripts']['start'] = "vite";
  pkg['scripts']['preview'] = "vite preview"
  writeFileSync(path.join('./', 'package.json'), JSON.stringify(pkg, null, 2));

};
