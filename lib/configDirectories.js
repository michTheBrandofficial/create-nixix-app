import {
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync
} from 'fs';
import path from 'path';

/**
 * 
 * @param {'ts' | 'js'} template 
 */
export default function configDirectories(template) {
  const files = {
    src: [
      `index.${template}x`,
      `App.${template}x`,
    ],
    public: 'index.html',
    assets: [
      'images/',
      'fonts/'
    ],
    styles: [
      'App.css'
    ],
    components: null,
    utils: null
  }

  for (const directory of Object.keys(files)) {
    if (existsSync(`./${directory}`) === true) {
      rmSync(path.join(`./${directory}`), {recursive: true})
      mkdirSync(path.join(`./${directory}`))
    } else if (existsSync(`./${directory}`) !== true) {
      mkdirSync(path.join(`./${directory}`))
    }
  }
  
  // src 
  for (const fd of files.src) {
    if (/App/.test(fd)) {
      writeFileSync(path.join('./src/', fd), `function App() {\n\treturn (\n\t\t<div className="app">\n\t\t\t<h3>Hello Nixix</h3>\n\t\t</div>\n\t)\n};\n\nexport default App;`, 'utf8');
    } else if (/index/.test(fd)) {
      writeFileSync(path.join('./src/', fd), 
      `import { render } from 'nixix';\nimport App from './App.${template}x';\n\nrender(<App />, document.querySelector('div#root'));`, 'utf8');
    } 
    // commmented out because the components and utils directories shouldn't be in the src directory.
    // else if (fd[fd.length - 1] === '/') {
    //   mkdirSync(path.join(`./src/${fd.replace('/', '')}`))
    // }
  }
  
  // index.html
  writeFileSync(path.join('./', 'index.html'), /*html*/`<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8">\n\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t<script defer src="./src/index.${template}x" type="module"></script>\n\t\t<title>NixixJS App</title>\n\t</head>\n\t<body>\n\t\t<div id="root"></div>\n\t</body>\n</html>`, 'utf8');

  // assets
  for (const fd of files.assets) {
    if (fd[fd.length - 1] === '/') {
      mkdirSync(path.join(`./assets/${fd.replace('/', '')}`))
    }
  }

  // styles
  for (const fd of files.styles) {
    writeFileSync(path.join(`./styles/${fd}`), 'h3 {\n\tcolor: blue;\n}');
  }
};

