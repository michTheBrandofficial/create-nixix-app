import {
  writeFileSync,
  existsSync,
  mkdirSync,
  rmSync
} from 'fs';
import path from 'path';
import { configCSS } from './configCSS.js';

/**
 * 
 * @typedef {import('../types/index').CSSOptions} CSSOptions
 * @param {'ts' | 'js'} template 
 * @param {CSSOptions} cssOptions
 */
export default function configDirectories(template, cssOptions) {
  /**
   * @type {import('../types/index').FileDirStructure}
   */
  const files = {
    src: [
      `index.${template}x`,
      `App.${template}x`,
    ],
    assets: [
      'images/',
      'fonts/'
    ],
    pages: null,
    components: null,
    utils: null
  }

  if (template === 'ts') {
    files['types'] = 'index.d.ts';
  }

  if (cssOptions === 'Vanilla CSS') { 
    files['styles'] = ['App.css'];
  } else {
    // tailwind and other css frameworks
    configCSS(cssOptions);
  }

  for (const directory of Object.keys(files)) {
    if (existsSync(`./${directory}`) === true) {
      rmSync(path.join(`./${directory}`), {recursive: true})
      mkdirSync(path.join(`./${directory}`))
    } else if (existsSync(`./${directory}`) !== true) {
      mkdirSync(path.join(`./${directory}`))
    }
  }
  
  const styleImport = cssOptions === 'Vanilla CSS' ? `\nimport 'styles/App.css';` : `\nimport './index.css';`;
  const tailWindStyle = cssOptions === 'Vanilla CSS' ? { app: '', button: '' } : {
    app: ' w-screen h-screen bg-white grid place-content-center',
    button: ' w-fit h-fit px-3 py-2 bg-gray-200 rounded-md font-bold'
  }
  // src 
  for (const fd of files.src) {
    if (/App/.test(fd)) {
      writeFileSync(path.join('./src/', fd), `import { callSignal } from 'nixix/primitives';\n\nconst App = () => {\n\tconst [count, setCount] = callSignal(0);\n\n\treturn (\n\t\t<div className="app${tailWindStyle.app}">\n\t\t\t<button on:click={() => setCount(++count.value)} className="button${tailWindStyle.button}" >count is {count}</button>\n\t\t</div>\n\t)\n};\n\nexport default App;`, 'utf8');
    } else if (/index/.test(fd)) {
      writeFileSync(path.join('./src/', fd), 
      `import { render } from 'nixix/dom';\nimport App from './App';${styleImport}\n\nrender(<App />, document.querySelector('div#root'));`, 'utf8');
    } 
  }
  
  // index.html
  writeFileSync(path.join('./', 'index.html'), /*html*/`<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8">\n\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t<script defer src="./src/index.${template}x" type="module"></script>\n\t\t<title>NixixJS App</title>\n\t</head>\n\t<body>\n\t\t<div id="root"></div>\n\t</body>\n</html>`, 'utf8');

  // assets
  for (const fd of files.assets) {
    if (fd[fd.length - 1] === '/') {
      mkdirSync(path.join(`./assets/${fd.replace('/', '')}`))
    }
  }

  // types 
  if (files.types) {
    writeFileSync(path.join(`./types/${files.types}`), ` `, 'utf8');
  }

  // styles
  if (files.styles) {
    for (const fd of files.styles) {
      writeFileSync(path.join(`./styles/${fd}`), '* {\n\tmargin: 0;\n\tbox-sizing: border-box;\n}\n\n.app {\n\theight: 100vh;\n\twidth: 100vw;\n\tbackground-color: white;\n\tdisplay: grid;\n\tjustify-content: center;\n\talign-content: center;\n}\n\n.button {\n\twidth: fit-content;\n\theight: fit-content;\n\tpadding: 8px 12px 8px 12px;\n\tbackground: rgb(229, 231, 235);\n\tborder: none;\n\tborder-radius: 6px;\n\tfont-weight: 700;\n\tfont-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n\tfont-size: 16px;\n}');
    }
  }
};

