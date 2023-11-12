import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

/**
 * @typedef {import('../types/index').Dependencies} Dependencies
 * @param {Dependencies} [props]
 */
export default function configPackage(props) {
  const packagePath = path.join('./', 'package.json');
  let pkg;
  if (existsSync(packagePath)) {
    const file = readFileSync(packagePath, 'utf8');
    if (file !== undefined) {
      if (file === '') {
        console.log(
          'Please initialize this project with npm. Type `npm init -y` now, then try again.'
        );
        return null;
      } else if (typeof JSON.parse(file) === 'object') {
        pkg = JSON.parse(file);
      }
    }
  } else {
    console.log(
      'Please initialize this project with npm. Type `npm init -y` now, then try again.'
    );
    return null;
  }
  if (!props) {
    pkg['scripts']['build'] = 'vite build';
    pkg['scripts']['start'] = 'vite';
    pkg['scripts']['preview'] = 'vite preview';
    pkg['type'] = 'module';
  } else {
    const keys = Object.keys(props);
    keys.forEach((key) => {
      pkg[key] = props[key];
    });
    pkg['type'] = 'module';
    writeFileSync(
      path.join('./', 'package.json'),
      JSON.stringify(pkg, null, 2)
    );
    return;
  }
  writeFileSync(path.join('./', 'package.json'), JSON.stringify(pkg, null, 2));
}
