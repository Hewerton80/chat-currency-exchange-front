import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './dimensions';

export const GlobalStyle = createGlobalStyle`
    @font-face{
        src: url('/fonts/Segoe UI.ttf');
        font-family: 'Segoe UI';    
        font-weight: 400;
    }

    html{
        scroll-behavior: smooth;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    @media (max-width: ${breakpoints.lg}px) {
        html {
            font-size: 93.75%; // 15px
        }
    }

    @media (max-width: ${breakpoints.md}px) {
        html {
            font-size: 87.5%; // 14px
        }
    }

    p,
    span,
    a,
    button,
    label,
    input,
    input::placeholder,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Segoe UI', Helvetica;
        font-weight: 400;
    }

    ul {
        list-style: none;
    }

`;