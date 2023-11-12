#!/usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import configDirectories from './lib/configDirectories.js';
import configGitignore from './lib/configGitignore.js';
import configJS, { configTS } from './lib/configJS.js';
import configPackage from './lib/configPackage.js';
import configVite from './lib/configVite.js';
import configSnippets from './lib/configSnippets.js';
import { existsSync } from 'fs';

async function runLibrary() {
  console.log('Thank you for downloading the create-nixix-app package.');

  // checks if the src and public dirs already exist.
  async function dirsExist() {
    if (existsSync(path.join('./src')) || existsSync(path.join('./public'))) {
      return true;
    } else {
      return false;
    }
  }

  const answer = await inquirer.prompt(
    (await dirsExist()) === true
      ? {
          name: '(y/n)',
          type: 'input',
          message:
            'It seems like you have the src and public directories in your project. Do you want to overwrite them? (y/n)',
        }
      : {
          name: '(y/n)',
          type: 'input',
          message: 'Configure directories? (y/n)',
        }
  );

  // get the template for the project
  /**
   * @typedef {import('./types/index').TemplateMap} TemplateMap
   * @type {{'(ts/js)': keyof TemplateMap}}
   */
  const tsOrJs = await inquirer.prompt({
    name: '(ts/js)',
    type: 'list',
    choices: ['TypeScript', 'JavaScript'],
    message: 'Which template do you wish to use?',
  });

  // get the css styling option for the project
  /**
   * @typedef {import('./types/index').CSSOptions} CSSOptions
   * @type {{'(css)': CSSOptions}}
   */
  const cssOptions = await inquirer.prompt({
    name: '(css)',
    type: 'list',
    choices: ['Vanilla CSS', 'TailwindCSS'],
    message: 'Which styling option do you wish to use?',
  });

  /**
   * @type {import('./types/index').TemplateMap}
   */
  const templateMap = {
    TypeScript: 'ts',
    JavaScript: 'js',
  };

  if (!create_nixix_app(tsOrJs['(ts/js)'], cssOptions['(css)'])) {
    return;
  }
  if (
    answer['(y/n)'] === 'y' ||
    answer['(y/n)'] === 'yes' ||
    answer['(y/n)'] === 'YES'
  ) {
    // pass the template and the css options as args.
    configDirectories(templateMap[tsOrJs['(ts/js)']], cssOptions['(css)']);
  } else {
    console.log(
      'You can setup the project on your own. Type "npm install nixix" in the terminal now to get started.'
    );
  }
}

runLibrary();

/**
 * @typedef {import('./types/index').CSSOptions} CSSOptions
 * @typedef {import('./types/index').TemplateMap} TemplateMap
 * @param {keyof TemplateMap} template
 * @param {CSSOptions} cssOptions
 */
function create_nixix_app(template, cssOptions) {
  /**
   * @type {import('./types').Dependencies}
   */
  const installMap = {
    dependencies: {
      nixix: 'latest',
    },
  };

  if (cssOptions === 'TailwindCSS') {
    installMap['devDependencies'] = {
      tailwindcss: 'latest',
      postcss: 'latest',
      autoprefixer: 'latest',
    };
  }
  const maybeNull = configPackage(installMap);
  if (maybeNull === null) {
    return null;
  }

  configGitignore();
  template === 'JavaScript' ? configJS() : configTS();
  configVite();
  configSnippets();
  console.log(
    `All done. Happy Coding ✔️ .', 'Run the "npm i" command in the terminal now to install all Dependencies.`
  );
  return 'Done';
}
