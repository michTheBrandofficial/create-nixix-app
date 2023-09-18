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
    resolveJsonModule: boolean;
    moduleResolution: 'node' | 'Node';
    allowSyntheticDefaultImports: boolean;
    checkJs: boolean;
    types: [
      "nixix/router",
      "nixix/dom",
      "nixix/primitives",
      "nixix/hoc"
    ],
  };
}

export type FileDirStructure =  {
  src: string[];
  assets: string[];
  components: null;
  utils: null;
  pages: null;
  styles?: ['App.css'],
  types?: 'index.d.ts'
}

export interface Dependencies {
  dependencies: {
    "nixix": "^1.4.25" | (string & {})
  },
  devDependencies?: {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.22",
    "tailwindcss": "^3.3.1"
  }
}

export type CSSOptions = 'Vanilla CSS' | 'TailwindCSS';

export type TemplateMap = {'TypeScript': 'ts','JavaScript': 'js'}; 
