import { writeFileSync } from 'fs';
import path from 'path';

/**
 * @todo keep checking with the tests on Nixix to see what you can update
 */
export default function configVite() {
  const viteConfig = /**js */ `
    import { defineConfig } from "vite";
    import { esbuildOptions } from 'nixix/vite-plugin';
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
          "@components": resolve('./components'),
          "@assets": resolve('./assets'),
          "@utils": resolve('./utils'),
          "@pages": resolve('./pages')
        }
      },
      esbuild: {
        ...esbuildOptions,
      }
    });
  `;
  // all done

  writeFileSync(path.join('./', 'vite.config.js'), viteConfig);
}
