import { writeFileSync } from 'fs';
import path from 'path';

/**
 * @typedef {import('../types/index').CSSOptions} CSSOptions
 * @param {CSSOptions} response
 */
export const configCSS = async (response) => {
  await Promise.resolve();

  const frameworksMap = {
    'TailwindCSS': () => {
      // make the index.css file 
      writeFileSync(path.join('./', 'src/', 'index.css'), '@tailwind base;\n@tailwind components;\n@tailwind utilities;', 'utf8');
      // make the tailwind config file 
      writeFileSync(path.join('./', 'tailwind.config.js'), `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n\tcontent: [\n\t\t'./index.html',\n\t\t'./src/**/*.{js,ts,tsx,jsx}',\n\t\t'./components/**/*.{js,ts,tsx,jsx}',\n\t\t'./pages/**/*.{js,ts,tsx,jsx}',\n\t],\n\ttheme: {\n\t\textend: {\n\t\t\tcolors: {}\n\t\t},\n\t},\n\tplugins: [],\n}`, 'utf8');
      // make postcss config file
      writeFileSync(path.join('./', 'postcss.config.js'), `module.exports = {\n\tplugins: {\n\t\ttailwindcss: {},\n\t\tautoprefixer: {},\n\t},\n}`, 'utf8');
    }
  };

  if (response in frameworksMap) {
    frameworksMap[response]();
  }
};
