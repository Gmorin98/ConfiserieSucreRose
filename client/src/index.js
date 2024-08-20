// Necessary Imports
import React from 'react';
import ReactDOM from "react-dom/client";
import GlobalStyle from "./pages/Components/GlobalStyles";
import App from "./App";

// Provider and Context Import
import AllFiltreContext from './contexts/AllFiltreContext';
import AllProduitsContext from './contexts/AllProduitsContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <AllFiltreContext>
      <AllProduitsContext>
        <App />
      </AllProduitsContext>
    </AllFiltreContext>
  </>
);