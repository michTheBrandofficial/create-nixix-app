import {writeFileSync} from 'fs';
import path from 'path';

/**
 * @todo keep checking with the tests on Nixix to see what you can update
 */
export default function configVite() {
  const viteConfig = `
    import { defineConfig } from "vite";
    import viteJsconfigPaths from 'vite-jsconfig-paths';
    import path from 'path';

    function resolve(string) {
      return path.resolve(__dirname, (string));
    }

    export default defineConfig({
      plugins: [viteJsconfigPaths()],
      resolve: {
        alias: {
          "@styles": resolve('./styles'),
          "@components": resolve('./src/components'),
          "@assets": resolve('./assets'),
          "@utils": resolve('./src/utils')
        }
      },
      esbuild: {
        jsxFactory: 'Nixix.create',
        jsxFragment: '"fragment"',
        jsxImportSource: 'nixix',
        jsxInject: "import Nixix from 'nixix'", 
        minifyIdentifiers: true
      }
    });
  `;  
  

  writeFileSync(path.join('./', 'vite.config.js'), viteConfig);
};