import React, { useEffect, useState, useContext } from 'react';
import CardCart from '../Components/CardCart';
import LoadingBar from '../Components/LoadingBar';
import NavBar from '../Components/navBar';
import ProductCard from '../Components/ProductCard';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import { getDeliveryData } from '../Services/DeliveryAppApi';

export default function Products() {
  const { cartItems } = useContext(DeliveryAppContext);
  const getUserToken = JSON.parse(localStorage.getItem('user'));
  const { token } = getUserToken;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('cart'))) {
      return localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    const data = async () => {
      const response = await getDeliveryData(token);
      setProducts(response);
    };
    data();
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [token, cartItems]);

  return (
    <div>
      <NavBar />
      { products && products.length === 0 && <LoadingBar />}
      <div className="grid grid-cols-4 gap-4 mt-4 rounded-lg">
        {
          products.map((item) => (
            <ProductCard key={ item.id } products={ item } />
          ))
        }
        <CardCart />
      </div>
    </div>
  );
}
