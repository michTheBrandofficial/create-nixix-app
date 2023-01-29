#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync, readFileSync, appendFileSync } from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import configBabel from './lib/configBabel.js'
import configDirectories from './lib/configDirectories.js'
import configGitignore from './lib/configGitignore.js'
import configJS from './lib/configJS.js'
import configPackage from './lib/configPackage.js'
import configWebpack from './lib/configWebpack.js'

async function runLibrary() {
  console.log('Thank you for downloading the create-nixix-app package.');

  const answer = await inquirer.prompt(
    {
      name: '(y/n)',
      type: 'input',
      message: 'Do you want to overwrite the src and public directories? '
    }
  )
  
  if ((answer['(y/n)'] === 'y') || (answer['(y/n)'] === 'yes') || (answer['(y/n)'] === 'YES')) {
    create_nixix_app();
    console.log('Type "npm install nixix" in the terminal now to get started.');
  } else {
    console.log('You can configure the library on your own. Type "npm install nixix" in the terminal now to get started.');
  }

}

runLibrary();


function create_nixix_app() {

  configPackage();
  configGitignore();
  configDirectories();
  configJS();
  configBabel();
  configWebpack()
  
}



