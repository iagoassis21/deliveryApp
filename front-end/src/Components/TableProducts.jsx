import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProductbyId,
  getProductsBySaleId,
  getOrderById } from '../Services/DeliveryAppApi';

export default function TableProducts({ saleId, token }) {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = async () => {
      const myProducts = await getProductsBySaleId(token, saleId);
      const saleDetails = await getOrderById(token, saleId);
      // const productsDetails = await myProducts.forEach((product) => {
      //   getProductbyId(token, product.productId);
      // });
      setOrder(saleDetails);
      // setProducts([...productsDetails, ...myProducts]);
      console.log(token);
      console.log('myProducts - lista de produtos com quantidade -->', myProducts);
      console.log('saleDetails - detalhes da venda -->', saleDetails);
      // console.log(
      //   'productsDetails - nome e preço do produto -->',
      //   productsDetails,
      // );
    };
    data();
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

TableProducts.propTypes = {
  saleId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
