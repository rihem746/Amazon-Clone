import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/login" element={<h1><Login/> </h1>} />
          <Route path="/checkout" element={<div><Header/><Checkout/></div>} />
          <Route path="/" element={<div><Header/><Home /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
