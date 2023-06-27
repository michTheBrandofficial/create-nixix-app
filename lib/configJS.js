// @ts-check
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

/**
 * @typedef {import('../types').Json} Json
 */

/**
 * @type {Json['compilerOptions']} myJson
 */
const myJson = {
  paths: {}, 
  resolveJsonModule: true,
  baseUrl: '.',
  jsx: 'react-jsxdev',
  jsxImportSource: 'nixix/types',
  typeRoots: ["nixix", "nixix/router"],
  module: 'es2022',
  target: 'es2022',
  types: [
    "nixix/types"
  ],
  checkJs: true,
  allowSyntheticDefaultImports: true,
  moduleResolution: "node"
}

export default function configJS() {
  if (existsSync(path.join('./', 'jsconfig.json'))) {
    const jsconfigJson = readFileSync(path.join('./', 'jsconfig.json'), 'utf8');
    /**
     * @type {Json} json
     */
    const json = JSON.parse(jsconfigJson === '' ? '{}' : jsconfigJson);
    if (json === null || json === undefined) {
      return;
    }
    json['compilerOptions'] = myJson
    writeFileSync(path.join('./', 'jsconfig.json'), JSON.stringify(json, null, 2));
  } else {
    const jsconfig = {}
    jsconfig['compilerOptions'] = myJson;
    writeFileSync(path.join('./', 'jsconfig.json'), JSON.stringify(jsconfig, null, 2));
  }

  const declarations = `declare module "*.webp";\ndeclare module "*.css";\ndeclare module "*.jpg";\ndeclare module "*.jpg";\ndeclare module "*.png";\ndeclare module "*.svg";\ndeclare module "*.scss";`
  writeFileSync(path.join('./', 'declarations.d.ts'), declarations);  
}

