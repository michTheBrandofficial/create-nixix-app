import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default function configJS() {
  if (existsSync(path.join('./', 'jsconfig.json'))) {
    const json = JSON.parse(readFileSync(path.join('./', 'jsconfig.json'), 'utf8'));
    json['compilerOptions']['baseUrl'] = "./";
    json['compilerOptions']['paths'] = {
      "@nixix": ["node_modules/nixix/js-lib/nixix.js"],
      "@nixix-render": ["node_modules/nixix/js-lib/render.js"],
      "@nixix-hooks": ["node_modules/nixix/js-lib/hooks.js"]
    }
    writeFileSync(path.join('./', 'jsconfig.json'), JSON.stringify(json, null, 2));
  } else {
    const jsconfig = {
      "compilerOptions": {
        "module": "es2022",
        "target": "es2022",
        "baseUrl": "./",
        "paths": {
          "@nixix": ["node_modules/nixix/js-lib/nixix"],
          "@nixix-render": ["node_modules/nixix/js-lib/render"],
          "@nixix-hooks": ["node_modules/nixix/js-lib/hooks"]
        },
      },
      "exclude": [
        "node_modules",
        "**/node_modules/*"
      ]
    }
    writeFileSync(path.join('./', 'jsconfig.json'), JSON.stringify(jsconfig, null, 2));
  }
  console.log('Done configuring jsconfig.json ')
}
