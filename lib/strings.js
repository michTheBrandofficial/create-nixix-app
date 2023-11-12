/**
 * @param {string} annotation
 */
export const ViewFile = (annotation) => {
  return `import { callSignal } from 'nixix/primitives';
  import ViteLogo from './vite.svg';
  import NixixLogo from './nixix.svg';
  
  const View = ()${annotation} => {
    const [count, setCount] = callSignal(0);
    return (
      <section className="app">
        <section className={'svg-links'}>
          <a
            target={'_blank'}
            href="https://github.com/michTheBrandofficial/NixixJS/blob/main/README.md"
          >
            <img
              src={NixixLogo}
              alt="Nixix Logo"
              className={'logo nixix'}
              width={100}
              height={100}
            />
          </a>
          <a target={'_blank'} href={'https://vitejs.dev'}>
            <img
              src={ViteLogo}
              className={'logo vite'}
              alt="Logo"
              width={100}
              height={100}
            />
          </a>
        </section>
  
        <section className="text">NixixJS + Vite</section>
        <button on:click={() => setCount(++count.value)}>count is {count}</button>
        <h3>Click on any of the logos to learn more</h3>
      </section>
    );
  };
  
  export default View;
  `;
};

export const CSSFile = () => {
  return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .app {
    width: 100vw;
    height: 100vh;
    background-color: #1f1f1f;
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-items: center;
    justify-content: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
  }
  
  .svg-links {
    width: fit-content;
    height: fit-content;
    padding: 0 20px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }
  
  a {
    width: fit-content;
    height: fit-content;
    text-decoration: none;
  }
  
  .logo {
    will-change: filter;
    transition: filter 300ms;
    cursor: pointer;
  }
  
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  
  .logo.nixix:hover {
    filter: drop-shadow(0 0 2em #dc143c);
  }
  
  .text {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-size: 40px;
    color: whitesmoke;
    font-weight: 900;
  }
  
  button {
    width: fit-content;
    height: fit-content;
    padding-inline: 12px;
    padding-block: 8px;
    font-size: medium;
    background-color: #171717;
    border: none;
    color: whitesmoke;
    font-weight: 500;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    border-radius: 7px;
    cursor: pointer;
  }
  
  button:focus {
    outline: none;
  }
  
  h3 {
    color: #888;
  }
  `;
};

export const OtherFiles = {
  'nixix.svg': () => {
    return `<?xml version="1.0" encoding="utf-8"?>
    <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path d="M100 0L100 0L100 100L0 100L0 0L100 0Z" id="path_1" />
        <clipPath id="clip_1">
          <use xlink:href="#path_1" clip-rule="evenodd" fill-rule="evenodd" />
        </clipPath>
      </defs>
      <g id="Frame Copy" clip-path="url(#clip_1)">
        <path d="M100 0L100 0L100 100L0 100L0 0L100 0Z" id="Frame-Copy" fill="#DC143C" stroke="none" />
        <g id="NixixJS" transform="translate(26 74)">
          <g id="NixixJS" fill="#FFFFFF">
            <path d="M1.26 20L1.26 6.06L4.2 6.06L10.48 16.24L9.74 16.24L9.74 6.06L12.62 6.06L12.62 20L9.66 20L3.4 9.8L4.12 9.8L4.12 20L1.26 20ZM15.02 20L15.02 10.14L17.76 10.14L17.76 20L15.02 20ZM14.98 8.7L14.98 6.06L17.84 6.06L17.84 8.7L14.98 8.7ZM19.26 20L22.56 15.02L19.26 10.14L22.5 10.14L24.4 13.24L26.32 10.14L29.54 10.14L26.22 15.02L29.54 20L26.32 20L24.4 16.82L22.48 20L19.26 20ZM31.04 20L31.04 10.14L33.78 10.14L33.78 20L31.04 20ZM31 8.7L31 6.06L33.86 6.06L33.86 8.7L31 8.7ZM35.28 20L38.58 15.02L35.28 10.14L38.52 10.14L40.42 13.24L42.34 10.14L45.56 10.14L42.24 15.02L45.56 20L42.34 20L40.42 16.82L38.5 20L35.28 20ZM51.1 20.34Q49.04 20.34 47.74 19.08Q46.44 17.82 46.28 15.56L49.12 15.26Q49.2 16.56 49.68 17.12Q50.16 17.68 51.1 17.68Q52.2 17.68 52.61 16.98Q53.02 16.28 53.02 15.04L53.02 8.62L47.9 8.62L47.9 6.06L55.9 6.06L55.9 15.2Q55.9 16.78 55.32 17.93Q54.74 19.08 53.66 19.71Q52.58 20.34 51.1 20.34ZM63.04 20.28Q60.76 20.28 59.31 19.1Q57.86 17.92 57.54 15.96L60.34 15.26Q60.56 16.5 61.3 17.12Q62.04 17.74 63.14 17.74Q63.7 17.74 64.16 17.55Q64.62 17.36 64.88 17Q65.14 16.64 65.14 16.14Q65.14 15.68 64.87 15.33Q64.6 14.98 64.02 14.68Q63.44 14.38 62.54 14.04Q61.18 13.5 60.28 12.89Q59.38 12.28 58.95 11.48Q58.52 10.68 58.52 9.62Q58.52 8.48 59.08 7.6Q59.64 6.72 60.65 6.22Q61.66 5.72 63 5.72Q64.44 5.72 65.54 6.38Q66.64 7.04 67.32 8.36L65.04 9.74Q64.64 9.02 64.1 8.64Q63.56 8.26 62.9 8.26Q62.48 8.26 62.14 8.42Q61.8 8.58 61.59 8.88Q61.38 9.18 61.38 9.56Q61.38 9.96 61.62 10.29Q61.86 10.62 62.45 10.94Q63.04 11.26 64.02 11.64Q65.34 12.12 66.21 12.71Q67.08 13.3 67.53 14.08Q67.98 14.86 67.98 15.96Q67.98 17.22 67.36 18.2Q66.74 19.18 65.63 19.73Q64.52 20.28 63.04 20.28Z" />
          </g>
        </g>
      </g>
    </svg>`;
  },
  'vite.svg': () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>`;
  },
};
