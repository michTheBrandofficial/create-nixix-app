export interface Json {
  compilerOptions: {
    "paths": {
      [index: string]: Array<string>
    },
    "baseUrl": string,
    "jsx": 'react-jsxdev' | 'react' | 'preserve',
    "jsxImportSource": "nixix-types",
    "typeRoots": ["nixix", "nixix/router", "nixix-types"],
    "module": string,
    "target": string,
    "resolveJsonModule": boolean;
    "moduleResolution": "node" | "Node";
    "allowSyntheticDefaultImports": boolean;
    "checkJs": boolean;
    "types": [
      "nixix-types"
    ];
  }
}