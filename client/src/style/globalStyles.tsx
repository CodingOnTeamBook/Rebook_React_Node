import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    @font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }
    @font-face {
     font-family: 'S-CoreDream-5Medium';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }
    html, body{
        height: 100%;
        font-family: 'S-CoreDream-3Light';
        padding: 0;
        margin: 0;
    }
    h1{
        font-family: 'S-CoreDream-5Medium';
    }
    span{
        font-family: 'S-CoreDream-5Medium';
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`;

export default globalStyle;
