import {writeFileSync} from 'fs';
import path from 'path'

export default function configBabel() {
  const babelConfig = {
    "plugins": [
      [
        "@babel/plugin-transform-react-jsx",
        {
          "pragma": "Nixix",
          "pragmaFrag": "fragment"
        }
      ]
    ],
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  };

  writeFileSync(path.join('./', '.babelrc'), JSON.stringify(babelConfig, null, 2), 'utf8');
}

