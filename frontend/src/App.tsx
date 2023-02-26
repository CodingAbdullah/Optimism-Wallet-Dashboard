import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import Sidebar from './Components/Sidebar/sidebar';
import Footer from './Components/Footer/footer';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Router>
        <Routes>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;