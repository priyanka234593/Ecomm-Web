import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

export default function Product() {
  const { all_product, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find(e => e.id === Number(productId));

  const startTime = useRef(Date.now());
  const clickEvents = useRef([]);
  const suspiciousActions = useRef([]);

  useEffect(() => {
    if (!product) return;

    document.body.setAttribute("data-product-id", product.id);
    const reportedKey = `product-${product.id}`;
    const reportedProducts = JSON.parse(sessionStorage.getItem("reportedProducts") || "[]");

    // Report initial visit only once per session
    if (!reportedProducts.includes(reportedKey)) {
      const payload = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        action: `ProductPageVisit-${product.id}`,
      };

      fetch('https://zap-api-dev.shaeryldatatech.in/firewall/static', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Product page reported:", data);
          reportedProducts.push(reportedKey);
          sessionStorage.setItem("reportedProducts", JSON.stringify(reportedProducts));
        })
        .catch(err => {
          console.warn("⚠️ Product page reporting failed:", err);
        });
    }

    // 👀 Suspicious activity: rapid click detection
    const handleClick = () => {
      const now = Date.now();
      clickEvents.current.push(now);
      if (clickEvents.current.length > 5) clickEvents.current.shift();

      if (
        clickEvents.current.length === 5 &&
        clickEvents.current[4] - clickEvents.current[0] < 2000
      ) {
        suspiciousActions.current.push("⚠️ Rapid clicking detected");
      }
    };

    const handleAddToCart = () => {
      suspiciousActions.current.push(`🛒 Added to cart: product ${product.id}`);
    };

    window.addEventListener('click', handleClick);
    document.addEventListener('add-to-cart', handleAddToCart);

    return () => {
      // ✅ Cleanup: send behavior data
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTime.current) / 1000);

      const payload = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        productId: product.id,
        timeSpentSeconds: timeSpent,
        suspicious: suspiciousActions.current,
      };

      fetch('http://127.0.0.1:8000/firewall/static', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(res => res.json())
        .then(data => console.log("📦 Session reported:", data))
        .catch(err => console.warn("❌ Failed to report session:", err));

      window.removeEventListener('click', handleClick);
      document.removeEventListener('add-to-cart', handleAddToCart);
    };
  }, [product]);

  if (!product) return <div>Loading product...</div>;

  const handleAddToCartClick = () => {
    addToCart(product.id);
    const event = new Event('add-to-cart');
    document.dispatchEvent(event);
  };

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <button onClick={handleAddToCartClick}>Add to Cart</button>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}
