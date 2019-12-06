import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyle from './components/GlobalStyle';
import { Theme } from './Theme';
import Router from './components/Router';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyle />
        <div className="App">
          <Router />
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
