import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import MetricsNavbar from './Components/MetricsNavbar/MetricsNavbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MetricsNavbar />
      <Router>
        <Routes>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;