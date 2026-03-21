import React from 'react';
import ReactDOM from 'react-dom/client';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import App from './App';
import { GlobalStyles } from './components/app/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TDSMobileAITProvider>
      <GlobalStyles />
      <App />
    </TDSMobileAITProvider>
  </React.StrictMode>,
);
