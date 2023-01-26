#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import inquirer from 'inquirer';

/**
 * show a thank you message.
 * ask whether to overwrite the current src and public directories
 * if yes, call the create-nixix-app function to do that.
 */
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

/**
 * create two directories: src and public
 * then add files with contents into the two directories
 */
function create_nixix_app() {

  const directories = [
    'src',
    'public'
  ]
  for (const directory of directories) {
    if (existsSync(`./${directory}`) === true) {
      console.log(`./${directory} already exists`);
    } else if (existsSync(`./${directory}`) != true) {
      mkdirSync(path.join(`./${directory}`), (err) => {
        if (err) throw err;
        // remove
        console.log('Made directory')
      })
    }
  }
  /**
   * files in the src and public directories
   */
  
  const files = {
    src: [
      'index.js',
      'App.js'
    ],
    public: [
      'index.html'
    ]
  }
  
  for (const file of files.src) {
    if (file === 'App.js') {
      writeFileSync(path.join('./src/', file), `import Nixix from '../js-lib/nixix.js';
  
      const App = () => {
        return (
          <div className="app">
            <h3>Hello Nixix</h3>
          </div>
        )
      }
    
      export default App;`, 'utf8');
    } else if (file === 'index.js') {
      writeFileSync(path.join('./src/', file), `import App from './App.js';
  
      render(<App />, document.querySelector('div#root'));`, 'utf8');
    }
  }
  

  for (const file of files.public) {
    if (file === 'index.html') {
      writeFileSync(path.join('./public/', file), `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script defer src="./dist/index.js"></script>
        <title>NixixJS App</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>`, 'utf8');
    }
  }
}



