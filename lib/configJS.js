// @ts-check
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

/**
 * @typedef {import('../types/index').Json} Json
 */

/**
 * @type {Json['compilerOptions']}
 */
const myJson = {
  paths: {
    '@styles/*': ['./styles/*'],
    '@components/*': ['./components/*'],
    '@assets/*': ['./assets/*'],
    '@utils/*': ['./utils/*'],
    '@pages/*': ['./pages/*'],
  },
  resolveJsonModule: true,
  baseUrl: '.',
  jsx: 'react-jsxdev',
  jsxImportSource: 'nixix/types',
  module: 'es2022',
  target: 'es2022',
  types: ['nixix/router', 'nixix/dom', 'nixix/primitives', 'nixix/hoc'],
  checkJs: true,
  allowSyntheticDefaultImports: true,
  moduleResolution: 'node',
};

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
    json['compilerOptions'] = myJson;
    writeFileSync(
      path.join('./', 'jsconfig.json'),
      JSON.stringify(json, null, 2)
    );
  } else {
    const jsconfig = {};
    jsconfig['compilerOptions'] = myJson;
    writeFileSync(
      path.join('./', 'jsconfig.json'),
      JSON.stringify(jsconfig, null, 2)
    );
  }

  const declarations = `declare module "*.webp";\ndeclare module "*.css";\ndeclare module "*.jpg";\ndeclare module "*.jpg";\ndeclare module "*.png";\ndeclare module "*.svg";\ndeclare module "*.scss";`;
  writeFileSync(path.join('./', 'declarations.d.ts'), declarations);
}

/**
 * @type {Json['compilerOptions']}
 */
const myTson = {
  paths: {
    '@styles/*': ['./styles/*'],
    '@components/*': ['./components/*'],
    '@assets/*': ['./assets/*'],
    '@utils/*': ['./utils/*'],
    '@pages/*': ['./pages/*'],
  },
  resolveJsonModule: true,
  baseUrl: '.',
  jsx: 'react-jsxdev',
  jsxImportSource: 'nixix/types',
  module: 'es2022',
  target: 'es2022',
  strict: true,
  types: ['nixix/router', 'nixix/dom', 'nixix/primitives', 'nixix/hoc'],
  allowSyntheticDefaultImports: true,
  moduleResolution: 'node',
};

export function configTS() {
  const pathToConfig = path.join('./', 'tsconfig.json');
  if (existsSync(pathToConfig)) {
    const tsconfigJson = readFileSync(pathToConfig, 'utf8');
    /**
     * @type {Json} json
     */
    const json = JSON.parse(tsconfigJson === '' ? '{}' : tsconfigJson);
    if (json === null || json === undefined) {
      return;
    }
    json['compilerOptions'] = myTson;
    writeFileSync(pathToConfig, JSON.stringify(json, null, 2));
  } else {
    const tsconfig = {};
    tsconfig['compilerOptions'] = myTson;
    writeFileSync(pathToConfig, JSON.stringify(tsconfig, null, 2));
  }

  const declarations = `declare module "*.webp";\ndeclare module "*.css";\ndeclare module "*.jpg";\ndeclare module "*.jpg";\ndeclare module "*.png";\ndeclare module "*.svg";\ndeclare module "*.scss";`;
  writeFileSync(path.join('./', 'declarations.d.ts'), declarations);
}
