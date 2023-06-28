<style>
  * {
    font-size: 16px;
  }
  h2 {
    font-size: 25px;
  }
  ul, h3, h4 {
    color: lightblue;
  }
  span {
    color: purple;
  }
  
</style>  

<h2>
  create-nixix-app
</h2>
<hr>
<h3>
  This package is an executable for configuring workspaces for Nixix apps.
</h3>
<h4>
  To install it, type the following in your terminal:
</h4>

``` bash
  npm install create-nixix-app
```


To run it, type the following: 
``` bash
  npx create-nixix-app
```
<h3 class="x">
  This will prompt you to overwrite the src and public directories. When answered 'y' or 'yes' or 'YES', it will add some npm scripts to the scripts property in the package.json file and it will make the following directories and files:
</h3>

<ul>
  <li> src [ <span>directory</span> ] </li>
  <li> public [ <span>directory</span> ] </li>
  <li> .vscode [ <span>directory</span> ] </li>
  <li> assets [ <span>directory</span> ] </li>
  <li> components [ <span>directory</span> ] </li>
  <li> .gitignore [ <span>file</span> ] </li>
  <li> vite.config.js [ <span>file</span> ] </li>
  <li> jsconfig.json [ <span>file</span> ] </li>
  <li> declarations.d.ts [ <span>file</span> ] </li>
  <li> index.html [ <span>file</span> ] </li>
  <li> postcss.config.js [ <span>file</span> ] </li>
  <li> tailwind.config.js [ <span>file</span> ] </li>
</ul>

<h4>
  The final step is to download the nixix library, type: 
</h4> 

```bash
  npm install nixix
```

<h4>
  There may be additional steps for configuring the styling option for your project.
</h4>

<h4>
  Thank you for downloading this package and happy coding 😁!!!
</h4>


