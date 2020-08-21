import React from 'react';
import GlobalStyle from './styles/global'
import AppProvider from './hooks/index'
import Routes from './routes/index'
import {BrowserRouter} from 'react-router-dom'

const App: React.FC = () => (
  <>
  <AppProvider>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </AppProvider>

  <GlobalStyle/>
  </>
)
export default App;
