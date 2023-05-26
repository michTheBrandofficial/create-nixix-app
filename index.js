#!/usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import configDirectories from './lib/configDirectories.js'
import configGitignore from './lib/configGitignore.js'
import configJS from './lib/configJS.js'
import configPackage from './lib/configPackage.js'
import configVite from './lib/configVite.js'
import { existsSync } from 'fs';

async function runLibrary() {
  console.log('Thank you for downloading the create-nixix-app package.');

  async function checkSrc() {
    if (existsSync(path.join('./src')) || existsSync(path.join('./public'))) {
      return true;
    } else {
      return false;
    }
  }

  
  const answer = await inquirer.prompt(await checkSrc() === true ?  {
    name: '(y/n)',
    type: 'input',
    message: 'It seems like you have the src and public directories in your project. Do you want to overwrite them? (y/n)'
  } :  {
    name: '(y/n)',
    type: 'input',
    message: 'Configure directories? '
  })

  const tsOrJs = await inquirer.prompt({
    name: '(ts/js)',
    type: 'list',
    choices: ['TypeScript', 'JavaScript'],
    message: 'Which template do you wish to use?'
  })

  /**
   * @type {{'TypeScript': 'ts','JavaScript': 'js'}}
   */
  const templateMap = {
    'TypeScript': 'ts',
    'JavaScript': 'js'
  };

  if ((answer['(y/n)'] === 'y') || (answer['(y/n)'] === 'yes') || (answer['(y/n)'] === 'YES')) {
    configDirectories(templateMap[tsOrJs['(ts/js)']])
  } else {
    console.log('You can setup the project on your own. Type "npm install nixix" in the terminal now to get started.');
  }

  create_nixix_app()
}

runLibrary();


function create_nixix_app() {
  const maybeNull = configPackage();
  if (maybeNull === null) {
    return null;
  }
  configGitignore();
  configJS();
  configVite()
  console.log('All done. Happy Coding ✔️ .', 'Type "npm install nixix" in the terminal now to get started.');  
}



