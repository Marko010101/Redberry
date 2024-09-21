import { createGlobalStyle } from "styled-components";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/700.css";

const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: "Helvetica Neue";
    src: url("/src/assets/helvetica-neue.ttf") format("opentype");
  }

:root {
/* Colors */
  --white: #FFFFFF;
  --color-text: #021526;
  --color-text-secondary: #02152680;
  --color-text-helvetica: #1A1A1F;
  --color-text-dark: #021526b2;
  --color-primary: #F93B1D;
  --color-secondary: #DF3014;
  --color-green:#45A849;
  --color-very-light-gray: #F3F3F3;
  --color-light-gray: #DBDBDB;
  --color-storm-gray: #676E76;
  --color-cloudy-gray:#808A93;
  --color-midnight-blue: #02152657;
  --color-midnight-navy: #02152614;
  --color-midnight-slate:#2D3648;
  --color-charcoal-navy:#354451;
  


  /* Font weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* font size */
  --font-size-mini: 1rem;
  --font-size-tiny: 1.2rem;
  --font-size-small: 1.4rem;
  --font-size-medium: 1.6rem;
  --font-size-big: 2rem;
  --font-size-large: 2.4rem;
  --font-size-huge: 2.8rem;
  --font-size-extra-huge: 3.2rem;
  --font-size-largest: 4.8rem;


  /* Site width  */
  --site-width: 159.6rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.2s, border 0.2s, box-shadow 0.2s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "FiraGO", "Helvetica Neue", sans-serif;

  color: var(--color-text);

  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s ;
  min-height: 100vh;
  font-size: 1.6rem;
}

body.overflow-hidden {
  overflow: hidden;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  border:none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}


img {
  max-width: 100%;
}



.isRental{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  padding: 0.6rem;
  letter-spacing: 0.04em;
  font-weight: var(--font-weight-medium);
  background-color: var(--color-text-secondary);
}

`;

export default GlobalStyles;
