// Necessary Import
import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

// Component Import
import Accueil from "./pages/Accueil/index.js";
import Produit from "./pages/Produits/index.js";
import BarABonbons from "./pages/BarABonbon/index.js";
import JujubeEmballage from "./pages/JujubeEtEmballage/index.js";
import NavigationBar from "./pages/Components/NavigationBar.js";
import Footer from "./pages/Components/Footer.js";
import Admin from "./pages/Admin/index.js";

const App = () => {

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produit />} />
        <Route path="/bar-a-bonbons" element={<BarABonbons />} />
        <Route path="/jujube-et-emballage" element={<JujubeEmballage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<Admin />} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
