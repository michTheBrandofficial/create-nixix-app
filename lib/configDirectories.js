import {
  writeFileSync,
  existsSync,
  mkdirSync
} from 'fs';
import path from 'path';

export default function configDirectories() {
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
      writeFileSync(path.join('./src/', file), `import Nixix from '@nixix';
  
      const App = () => {
        return (
          <div className="app">
            <h3>Hello Nixix</h3>
          </div>
        )
      }
    
      export default App;`, 'utf8');
    } else if (file === 'index.js') {
      writeFileSync(path.join('./src/', file), `import Nixix from '@nixix';
import render from '@nixix-render';
import App from './App.js';
  
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
        <script defer src="./build/output.js"></script>
        <title>NixixJS App</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>`, 'utf8');
    }
  }
};
