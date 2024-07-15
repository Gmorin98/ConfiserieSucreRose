// Necessary Import
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";

// Component Import
import Accueil from "./pages/Accueil/index.js";
import Produit from "./pages/Produits/index.js";
import BarBonbon from "./pages/BarBonbon/index.js";
import CreeTonPot from "./pages/CreeTonPot/index.js";
import NavigationBar from "./pages/Other/NavigationBar.js";
import Footer from "./pages/Other/Footer.js";

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
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
