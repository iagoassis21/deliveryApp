import React, { useEffect, useState } from 'react';
import LoadingBar from '../Components/LoadingBar';
import NavBar from '../Components/navBar';
import ProductCard from '../Components/ProductCard';
import { getDeliveryData } from '../Services/DeliveryAppApi';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const data = async () => {
      const response = await getDeliveryData();
      setProducts(response);
    };
    data();
  }, []);

  return (
    <div>
      <NavBar />
      { products && products.length === 0 && <LoadingBar />}
      {
        products.map((item) => (
          <ProductCard key={ item.id } products={ item } />
        ))
      }
    </div>
  );
}
