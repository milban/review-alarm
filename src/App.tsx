import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyle from './components/GlobalStyle';
import { Theme } from './Theme';
import { Card, Button } from 'rebass';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyle />
        <div className="App">
          <Card fontSize={[1, 2, 3]} margin={[2, 3, 4]}>
            hi
          </Card>
          <Button variant="secondary">Button</Button>
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
