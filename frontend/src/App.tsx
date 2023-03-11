import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import HomePage from './Components/HomePage/HomePage';
import Footer from './Components/Footer/footer';
import MetricsNavbar from './Components/MetricsNavbar/MetricsNavbar';
import AboutPage from './Components/AboutPage/AboutPage';
import OpPriceLookupPage from './Components/OpPriceLookupPage/OpPriceLookupPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MetricsNavbar />
      <Router>
        <Routes>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="op-price-lookup" element={<OpPriceLookupPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;