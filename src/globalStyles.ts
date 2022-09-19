import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Madreu';
        src: url('../fonts/Madreu.otf');
        font-weight: 500;
        font-display: swap;
    }

    @font-face {
        font-family: 'Segoe UI';
        src: url('../fonts/Segoe UI.ttf');
        font-weight: 500;
        font-display: swap;
    }

    :root {
        --color-text: hsl(222deg, 22%, 5%);
        --color-background: hsl(0deg, 0%, 100%);
        --color-blurred-background: hsla(0deg, 0%, 100%, 0.85);
        --color-primary: hsl(245deg, 100%, 60%);
        --color-info: hsl(245deg, 100%, 60%);
        --color-success: hsl(160deg, 100%, 40%);
        --color-success-background: hsla(160deg, 100%, 40%, 0.1);
        --color-error: hsl(340deg, 95%, 50%);
        --color-error-background: hsla(340deg, 95%, 43%, 0.1);
        --color-alert: hsl(37deg, 100%, 50%);
        --color-alert-background: hsla(52deg, 100%, 50%, 0.25);
        --color-gray-100: hsl(225deg, 25%, 95%);
        --color-gray-200: hsl(225deg, 16%, 90%);
        --color-gray-300: hsl(225deg, 8%, 80%);
        --color-gray-400: hsl(225deg, 8%, 70%);
        --color-gray-500: hsl(225deg, 7%, 60%);
        --color-gray-600: hsl(225deg, 15%, 50%);
        --color-gray-700: hsl(225deg, 12%, 40%);
        --color-gray-900: hsl(225deg, 25%, 20%);
        --color-gray-1000: hsl(225deg, 15%, 15%);
        --color-subtle-background: hsl(225deg, 25%, 95%);
        --font-weight-bold: 600;
        --font-weight-medium: 500;
        --font-weight-light: 400;
        --font-headings: "Madreu",-apple-system,sans-serif;
        --font-contents: "Segoe UI",-apple-system,sans-serif;
    }
    *, *::before, *::after {
    box-sizing: border-box;
    }
    * {
    margin: 0;
    }

    html, body {
    height: 100%;
    }
    body {
    line-height: 1.666;
    -webkit-font-smoothing: antialiased;
    }

    img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    }

    input, button, textarea, select {
        font: inherit;
    }

    p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    }

    #root, #__next {
    isolation: isolate;
    }
`;

export default GlobalStyle;
