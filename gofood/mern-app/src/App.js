import './App.css';
import Home from './screen/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screen/MyOrder';



function App() {
  return (
    <CartProvider>
      <Router>
        <div className="">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
