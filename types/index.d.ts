export interface Json {
  compilerOptions: {
    paths: {
      [index: string]: Array<string>;
    };
    baseUrl: string;
    jsx: 'react-jsxdev' | 'react' | 'preserve';
    jsxImportSource: 'nixix/types';
    module: string;
    target: string;
    strict?: boolean;
    resolveJsonModule: boolean;
    moduleResolution: 'node' | 'Node';
    allowSyntheticDefaultImports: boolean;
    checkJs?: boolean;
    types: ['nixix/router', 'nixix/dom', 'nixix/primitives', 'nixix/hoc'];
  };
}

export type FileDirStructure = {
  src: string[];
  assets: string[];
  components: null;
  utils: null;
  pages: null;
  styles?: ['View.css'];
  types?: 'index.d.ts';
};

export interface Dependencies {
  dependencies: {
    nixix: 'latest' | (string & {});
  };
  devDependencies?: {
    autoprefixer: 'latest' | (string & {});
    postcss: 'latest' | (string & {});
    tailwindcss: 'latest' | (string & {});
  };
}

export type CSSOptions = 'Vanilla CSS' | 'TailwindCSS';

export type TemplateMap = { TypeScript: 'ts'; JavaScript: 'js' };
