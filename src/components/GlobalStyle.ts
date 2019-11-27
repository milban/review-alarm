import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Do+Hyeon|Noto+Sans+KR:300,400&display=swap&subset=korean');
  ${reset}

  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
`;

export default GlobalStyle;
