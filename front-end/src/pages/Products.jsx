import React, { useEffect, useState } from 'react';
import CardCart from '../Components/CardCart';
import LoadingBar from '../Components/LoadingBar';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import { getDeliveryData } from '../Services/DeliveryAppApi';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const data = async () => {
      const response = await getDeliveryData(token);
      setProducts(response);
    };
    data();
  }, []);

  return (
    <div className="bg-bgColorWhiteIce">
      <NavBar />
      { products && products.length === 0 && <LoadingBar />}
      <div
        className={ `grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3
         sm:grid-cols-2 mb:grid-cols gap-4 mt-8 mx-12 rounded-lg` }
      >
        {
          products.map((item) => (
            <ProductCard key={ item.id } products={ item } />
          ))
        }
      </div>
      <div className="fixed bottom-10 right-5">
        <CardCart />
      </div>
    </div>
  );
}
