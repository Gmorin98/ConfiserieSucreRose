// Necessary Import
import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

// Component Import
import Accueil from "./pages/Accueil/index.js";
import Produit from "./pages/Produits/index.js";
import BarBonbon from "./pages/BarBonbon/index.js";
import CreeTonPot from "./pages/CreeTonPot/index.js";
import Checkout from "./pages/Checkout/index.js";
import Admin from "./pages/Admin/index.js";
import NavigationBar from "./pages/Components/NavigationBar.js";
import Footer from "./pages/Components/Footer.js";

const App = () => {

  // Gotta change the Route name for BarBonbon and CreerTonPot
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produit />} />
        <Route path="/barbonbon" element={<BarBonbon />} />
        <Route path="/creertonpot" element={<CreeTonPot />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<Admin />} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
