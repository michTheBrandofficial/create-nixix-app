import {
  readFileSync,
  appendFileSync,
  existsSync,
  writeFileSync
} from 'fs';
import path from 'path';

export default function configGitignore() {
  const gitignoreFile = path.join('./', '.gitignore');
  if (existsSync(gitignoreFile)) {
    const gitignoreContent = readFileSync(gitignoreFile, 'utf8');
    const ignores = [
      'node_modules',
      'dist',
      'firebase.json',
      '.firebaserc'
    ]
    for (const ignore of ignores) {
      if (gitignoreContent.includes(ignore) !== true) {
        appendFileSync(gitignoreFile, `\n${ignore}`, 'utf8');
      }
    }
  } else {
    const gitignore = 'node_modules/\ndist/\nfirebase.json\n.firebaserc';
    writeFileSync(gitignoreFile, gitignore, 'utf8');
  }
};


/**
 * node_modules/
public/
src/
assets/
styles/
index.html
vite.config.js
 */
