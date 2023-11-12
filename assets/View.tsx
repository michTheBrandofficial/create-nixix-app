import { callSignal } from 'nixix/primitives';
import ViteLogo from './vite.svg';

const NixixLogo = (): someView => {
  return (
    <div className="logo nixix">
      <p>NixixJS</p>
    </div>
  );
};

const View = (): someView => {
  const [count, setCount] = callSignal(0);
  return (
    <section className="app">
      <section className={'svg-links'}>
        <a target={'_blank'} href={'https://vitejs.dev'}>
          <img
            src={ViteLogo}
            className={'logo vite'}
            alt="Logo"
            width={100}
            height={100}
          />
        </a>

        <a
          target={'_blank'}
          href="https://github.com/michTheBrandofficial/NixixJS/blob/main/README.md"
        >
          <NixixLogo />
        </a>
      </section>

      <section className="text">Vite + NixixJS</section>
      <button on:click={() => setCount(++count.value)}>count is {count}</button>
      <h3>Click on any of the logos to learn more</h3>
    </section>
  );
};

export default View;
