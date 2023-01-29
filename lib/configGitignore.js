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
    if (/node_modules/.test(gitignoreContent) != true) {
      appendFileSync(gitignoreFile, 'node_modules/', 'utf8');
    }
  } else {
    writeFileSync(gitignoreFile, 'node_modules/', 'utf8');
  }
};
