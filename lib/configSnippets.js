import { existsSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const generatedSnippets = {
  'Nixix default Functional Component': {
    prefix: 'edfc',
    body: 'const ${1:${TM_FILENAME_BASE}} = (${2:props}) => {\n\treturn (\n\t\t${3:<div />}\n\t)\n}\n\nexport default ${1:${TM_FILENAME_BASE}};',
    scope: 'javascriptreact',
    description: 'Functional Component to return JSX.',
  },
  'Nixix default Functional Component Typescript': {
    prefix: 'edfc',
    body: 'const ${1:${TM_FILENAME_BASE}} = (${2:props}): someView => {\n\treturn (\n\t\t${3:<div />}\n\t)\n}\n\nexport default ${1:${TM_FILENAME_BASE}};',
    scope: 'typescriptreact',
    description: 'Functional Component to return JSX.',
  },
  'Nixix Functional Component': {
    prefix: 'efc',
    body: 'const ${1:${TM_FILENAME_BASE}} = (${2:props}) => {\n\treturn (\n\t\t${3:<div />}\n\t)\n}\n\nexport default ${1:${TM_FILENAME_BASE}};',
    scope: 'javascriptreact',
    description: 'Functional Component to return JSX.',
  },
  'Nixix Functional Component Typescript': {
    prefix: 'efc',
    body: 'const ${1:${TM_FILENAME_BASE}} = (${2:props}): someView => {\n\treturn (\n\t\t${3:<div />}\n\t)\n}\n\nexport default ${1:${TM_FILENAME_BASE}};',
    scope: 'typescriptreact',
    description: 'Functional Component to return JSX.',
  },
  callSignalSnippet: {
    prefix: 'callSignalSnippet',
    body: 'const [${1:initValue}, set${1/(.*)/${1:/capitalize}/}] = callSignal(${2:value});',
    scope: 'javascriptreact,javascript',
    description: 'callSignal snippet',
  },
  callStoreSnippet: {
    prefix: 'callStoreSnippet',
    body: 'const [${1:initValue}, set${1/(.*)/${1:/capitalize}/}] = callStore(${2:objectOrArray});',
    scope: 'javascriptreact,javascript',
    description: 'callStore snippet',
  },
  memoSnippet: {
    prefix: 'memoSnippet',
    body: 'const ${1:derivedSignal} = memo(() => {\n\treturn ${2:initValue};\n}, [${3:deps}])',
    scope: 'typescriptreact,javascriptreact,javascript,typescript',
    description: 'memo snippet',
  },
  callRefSnippet: {
    prefix: 'callRefSnippet',
    body: 'const ${1:ref} = callRef($2)$0',
    scope: 'javascriptreact,javascript',
    description: 'callRef snippet',
  },
  callSignalSnippetTS: {
    prefix: 'callSignalSnippetTS',
    body: 'const [${1:initValue}, set${1/(.*)/${1:/capitalize}/}] = callSignal<${2:type}>(${3:value});',
    scope: 'typescriptreact,typescript',
    description: 'callSignal snippet typescript',
  },
  callStoreSnippetTS: {
    prefix: 'callStoreSnippetTS',
    body: 'const [${1:initValue}, set${1/(.*)/${1:/capitalize}/}] = callStore<${2:type}>(${3:objectOrArray});',
    scope: 'typescriptreact,typescript',
    description: 'callStore snippet typescipt',
  },
  callRefSnippetTS: {
    prefix: 'callRefSnippetTS',
    body: 'const ${1:ref} = callRef<${2:HTMLElement}>($3)$0',
    scope: 'typescriptreact,typescript',
    description: 'callRef snippet typescript',
  },
  effectSnippet: {
    prefix: 'effectSnippet',
    body: "effect(() => {\n\t\t$1\n\t},\n\t${2|'once',null|},\n\t[${3:furtherDeps}]\n)",
    scope: 'typescriptreact,javascriptreact,typescript,javascript',
    description: 'effect snippet',
  },
  renderEffectSnippet: {
    prefix: 'renderEffectSnippet',
    body: "renderEffect(() => {\n\t\t$1\n\t},\n\t${2|'once',null|},\n\t[${3:furtherDeps}]\n)",
    scope: 'typescriptreact,javascriptreact,typescript,javascript',
    description: 'renderEffect snippet',
  },
  callEffectSnippet: {
    prefix: 'callEffectSnippet',
    body: 'callEffect(() => {\n\t\t$1\n\t},\n[${2:deps}]\n)',
    scope: 'typescriptreact,javascriptreact,javascript,typescript',
    description: 'call effect snippet',
  },
  callReactionSnippet: {
    prefix: 'callReactionSnippet',
    body: 'callReaction(() => {\n\t\t$1\n\t},\n[${2:deps}]\n)',
    scope: 'typescriptreact,javascriptreact,javascript,typescript',
    description: 'call reaction snippet',
  },

  // HOC

  // async values
  asyncComponentTS: {
    prefix: 'asyncComponent',
    body: 'type AsyncProps = {$1};\n\nconst ${2:Component} = asyncComponent<AsyncProps>(${3:async} (${4:props}) => {\n\treturn $5\n});',
    scope: 'typescriptreact',
    description: 'Component that asynchronously returns some JSX',
  },
  asyncComponentJS: {
    prefix: 'asyncComponent',
    body: 'const ${1:Component} = asyncComponent((${2:props}) => {\n\treturn $3\n});',
    scope: 'javsscriptreact',
    description: 'Component that asynchronously returns some JSX',
  },
  Suspense: {
    prefix: 'Suspense',
    body: '<Suspense fallback={$1} onError={$2}>\n\t${3:<div />}\n</Suspense>',
    scope: 'typescriptreact,javascriptreact',
    description: 'Suspense Component',
  },
  // Loops
  For: {
    prefix: 'For',
    body: '<For each={${1:storeArray}} fallback={${3:fallback}}>\n\t{\n\t\t(storeArray, i) => {\n\t\t\treturn (\n\t\t\t\t${5:<div />}\n\t\t\t)\n\t\t}\n\t}\n</For>',
    scope: 'typescriptreact,javascriptreact',
    description: 'For Component',
  },
  // Conditional
  Show: {
    prefix: 'Show',
    body: '<Show when={${1:signal}} fallback={${2:fallback}}>\n\t<div />\n</Show>',
    scope: 'typescriptreact,javascriptreact',
    description: 'Show Component',
  },
};
export default function configSnippets() {
  const vsCodeDir = path.join('./', '.vscode');

  function makeSnippets() {
    writeFileSync(
      path.join('./', '.vscode/', 'nixix.code-snippets'),
      JSON.stringify(generatedSnippets, null, 2),
      'utf8'
    );
  }

  if (existsSync(vsCodeDir)) {
    makeSnippets();
  } else {
    mkdirSync(path.join('./', '.vscode'));
    makeSnippets();
  }
}
