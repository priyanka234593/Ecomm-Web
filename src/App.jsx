import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import TrafficReporter from './Components/TestFirewall/TestFirewall';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const productPageMatch = location.pathname.match(/^\/product\/(\d+)/);
    if (productPageMatch) {
      const productId = productPageMatch[1];
      document.body.setAttribute('data-product-id', productId);
    } else {
      document.body.removeAttribute('data-product-id');
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <TrafficReporter />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="men" banner={men_banner} />} />
        <Route path='/womens' element={<ShopCategory category="women" banner={women_banner} />} />
        <Route path='/kids' element={<ShopCategory category="kid" banner={kid_banner} />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
