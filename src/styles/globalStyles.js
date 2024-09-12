import { createGlobalStyle } from "styled-components";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/700.css";

const GlobalStyles = createGlobalStyle`
:root {
/* Colors */
  --white: #FFFFFF;
  --color-text: #021526;
  --color-primary: #F93B1D;
  --color-secondary: #DF3014;
  --color-very-light-gray: #F3F3F3;
  --color-light-gray: #DBDBDB;
  --color-border-input:#808A93;

  --color-text-secondary: #02152680;
  --color-text-dark: #021526b2;
  


  /* Font weights */
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;

  /* font size */
  --font-size-mini: 1rem;
  --font-size-tiny: 1.2rem;
  --font-size-small: 1.4rem;
  --font-size-medium: 1.6rem;
  --font-size-big: 1.8rem;
  --font-size-huge: 2.8rem;


  /* Site width  */
  --site-width: 160rem;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {

  font-family: "FiraGO";

  color: var(--color-text);

  /* transition: color 0.3s, background-color 0.3s; */
  min-height: 100vh;
  font-size: 1.6rem;
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

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


img {
  max-width: 100%;
}
`;

export default GlobalStyles;
