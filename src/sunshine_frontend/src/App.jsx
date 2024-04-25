import { useState } from 'react';
import { sunshine_backend } from 'declarations/sunshine_backend';
import { canisterId } from "../../../declarations/HireVerse_frontend";

function canisterInjector(url) {
    return `${url}?canisterId=${canisterId}`;
}

const fonts = [
  {
      fontFamily: "Bebas Neue",
      src: `url(${canisterInjector("/fonts/Bebas_Neue/BebasNeue-Regular.ttf")}) format("truetype")`,
  },
  {
      fontFamily: "Lato",
      src: `url(${canisterInjector("/fonts/Lato/Lato-Regular.ttf")}) format("truetype")`,
  },
  {
      fontFamily: "Lato",
      fontWeight: "bold",
      src: `url(${canisterInjector("/fonts/Lato/Lato-Bold.ttf")}) format("truetype")`,
  },
  {
      fontFamily: "Lato",
      fontWeight: 300,
      src: `url(${canisterInjector("/fonts/Lato/Lato-Light.ttf")}) format("truetype")`,
  },
  {
      fontFamily: "Lato",
      fontWeight: 400,
      src: `url(${canisterInjector("/fonts/Lato/Lato-Regular.ttf")}) format("truetype")`,
  },
];

const fontLoader = () => {
  for (const font of fonts) {
      const style = document.createElement("style");
      style.innerHTML = `
          @font-face {
              font-family: '${font.fontFamily}';
              src: ${font.src};
              font-weight: ${font.fontWeight || 400};
              font-style: normal;
          }
      `;
      document.head.appendChild(style);
  }
};

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    sunshine_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  useLayoutEffect(() => {
    fontLoader();
  }, []);

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
