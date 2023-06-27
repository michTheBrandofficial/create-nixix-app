import { existsSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import path from "path";

export default function configSnippets() {
  const pathToSnippets = path.join('./', '.vscode')
  const generatedSnippets = readFileSync('./lib/snippets.jsonc', 'utf8');
  function makeSnippets() {
    writeFileSync(path.join('./', '.vscode/', 'nixix.code-snippets'), generatedSnippets, 'utf8');
  }

  if (existsSync(pathToSnippets)) {
    makeSnippets()
  } else {
    mkdirSync(path.join('./', '.vscode'));
    makeSnippets()
  }
}