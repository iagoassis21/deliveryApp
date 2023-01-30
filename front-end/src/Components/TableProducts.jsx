import React, { useState, useEffect } from 'react';
import { getProductbyId,
  getProductsBySaleId,
  getOrderById } from '../Services/DeliveryAppApi';

export default function TableProducts({ saleId }) {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = async () => {
      const myProducts = await getProductsBySaleId(saleId);
      const saleDetails = await getOrderById(saleId);
      const productsDetails = await getProductbyId(myProducts.productId);
      setProducts([...productsDetails, ...myProducts]);
      setOrder(saleDetails);
      // setOrder([...saleDetails, ...products, ...productsDetails]);
    };
    data();
    console.log(order, products);
  }, []);

  return (
    <table className="table-responsive">
      <thead>
        <tr>
          <th>
            { `PEDIDO ${order.id}`}
          </th>
          <th>
            { order.saleDate }
          </th>
          <th>
            { order.status }
          </th>
          {/* <th className="table"> {  } </th>
            <th className="table"> Moeda </th> */}
        </tr>
      </thead>
      <thead>
        <tr>
          <th>
            Item
          </th>
          <th>
            Descrição
          </th>
          <th>
            Quantidade
          </th>
          <th>
            Valor Unitário
          </th>
          <th>
            Sub-total
          </th>
          {/* <th className="table"> {  } </th>
            <th className="table"> Moeda </th> */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={ product.id }>
            <td>{product.id}</td>
            <td>{product.name }</td>
            <td>{ product.quant }</td>
            <td>{ product.value }</td>
            <td>{ product.subTotal}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
