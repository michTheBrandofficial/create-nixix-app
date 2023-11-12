import { writeFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { configCSS } from './configCSS.js';
import { CSSFile, OtherFiles, ViewFile } from './strings.js';

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
    src: [`index.${template}x`, `View.${template}x`, 'nixix.svg', 'vite.svg'],
    assets: ['images/', 'fonts/'],
    pages: null,
    components: null,
    utils: null,
  };

  if (template === 'ts') {
    files['types'] = 'index.d.ts';
  }

  if (cssOptions === 'Vanilla CSS') {
    files['styles'] = ['View.css'];
  } else {
    // tailwind and other css frameworks
    configCSS(cssOptions);
  }

  for (const directory of Object.keys(files)) {
    if (existsSync(`./${directory}`) === true) {
      rmSync(path.join(`./${directory}`), { recursive: true });
      mkdirSync(path.join(`./${directory}`));
    } else if (existsSync(`./${directory}`) !== true) {
      mkdirSync(path.join(`./${directory}`));
    }
  }

  const styleImport =
    cssOptions === 'Vanilla CSS'
      ? `\nimport '@styles/View.css';`
      : `\nimport './index.css';`;

  const someViewAnnotation = template === 'ts' ? ': someView' : '';

  // ? src dir
  for (const file of files.src) {
    if (/View/.test(file)) {
      writeFileSync(
        path.join('./src/', file),
        ViewFile(someViewAnnotation),
        'utf8'
      );
    } else if (/index/.test(file)) {
      writeFileSync(
        path.join('./src/', file),
        `import { render } from 'nixix/dom';\nimport View from './View';${styleImport}\n\n/* @module-refresh */\nconst root = document.querySelector('body');\nconst Mount = () => {\n\trender(<View />,root);\n};\n\nMount();\nexport default Mount;`,
        'utf8'
      );
    } else if (file in OtherFiles) {
      const fileContent = OtherFiles[file]?.();
      writeFileSync(path.join('./src/', file), fileContent, 'utf8');
    }
  }

  // ? index.html
  writeFileSync(
    path.join('./', 'index.html'),
    /*html*/ `<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8">\n\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t\t<script defer src="./src/index.${template}x" type="module"></script>\n\t\t<title>NixixJS App</title>\n\t</head>\n\t<body></body>\n</html>`,
    'utf8'
  );

  // ? assets dir
  for (const fd of files.assets) {
    if (fd[fd.length - 1] === '/') {
      mkdirSync(path.join(`./assets/${fd.replace('/', '')}`));
    }
  }

  // ? types dir
  if (files.types) {
    writeFileSync(
      path.join(`./types/${files.types}`),
      `// write types here`,
      'utf8'
    );
  }

  // ? styles dir
  if (files.styles) {
    for (const fd of files.styles) {
      writeFileSync(path.join(`./styles/${fd}`), CSSFile());
    }
  }
}
