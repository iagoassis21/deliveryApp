/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrderById, updateStatus } from '../Services/DeliveryAppApi';

export default function Tableproductss({ saleId }) {
  const [order, setOrder] = useState([]);
  // const [isDisabled, setIsDisabled] = useState(true);

  const dataTestDate = 'seller_order_details__element-order-details-label-order-date';
  const dTestStatus = 'seller_order_details__element-order-details-label-delivery-status';
  const dItemNum = 'seller_order_details__element-order-table-item-number';
  const dItemName = 'seller_order_details__element-order-table-name';
  const dItemQuantity = 'seller_order_details__element-order-table-quantity';
  const dUnityPrice = 'seller_order_details__element-order-table-unit-price';
  const dSubPrice = 'seller_order_details__element-order-table-sub-total';

  useEffect(() => {
    const data = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const { token } = userInfo;
      const saleDetails = await getOrderById(token, saleId);
      setOrder(saleDetails);
      console.log(order);
    };
    data();
  }, []);

  const dataa = order.map(({ saleDate }) => saleDate);
  const dataFunc = new Date(dataa);
  const dataFormatada = dataFunc.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

  const handleStatus = async (event) => {
    event.preventDefault();
    const { name } = event.target;
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const { token } = userInfo;
    if (name === 'Preparando') {
      const preparando = 'Preparando';
      await updateStatus(saleId, preparando, token);
      const update = await await getOrderById(token, saleId);
      setOrder(update);
    }
    if (name === 'Transito') {
      const transito = 'Em Trânsito';
      await updateStatus(saleId, transito, token);
      const update = await getOrderById(token, saleId);
      setOrder(update);
    }
  };

  const buttonAllowed = `px-1 h-12 rounded-md bg-darkGray border border-yellow
  font-bold flex text-center items-center justify-center gap-1 hover:bg-yellow text-yellow
  hover:text-black href="#"`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-2 h-12 rounded-md
  font-bold flex items-center gap-3 hover:text-black`;

  return (
    <div>
      {
        order && order.map((obj) => (
          <section className="grid grid-col justify-center" key={ obj.id }>
            <table
              className={ `w-full text-base text-left text-gray-500 
              dark:text-gray-400` }
              key={ obj.id }
            >
              <thead
                className={ `text-white h-12 py-3.5 uppercase border-b
     bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
              >
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-base"
                    data-testid={ `seller_order_details__
                    element-order-details-label-order-id` }
                  >
                    { `PEDIDO ${obj.id}`}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-base"
                    data-testid={ dataTestDate }
                  >
                    { dataFormatada }
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-base"
                    data-testid={ dTestStatus }
                  >
                    { obj.status }
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    <button
                      className={ obj.status !== 'Pendente'
                        ? buttonNotAllowed : buttonAllowed }
                      type="button"
                      data-testid="seller_order_details__button-preparing-check"
                      name="Preparando"
                      onClick={ handleStatus }
                      disabled={ obj.status !== 'Pendente' }
                    >
                      { obj.status !== 'Pendente' ? 'JÁ PREPARADO' : 'PREPARAR PEDIDO'}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    <button
                      className={ obj.status !== 'Preparando'
                        ? buttonNotAllowed : buttonAllowed }
                      type="button"
                      data-testid="seller_order_details__button-dispatch-check"
                      name="Transito"
                      onClick={ handleStatus }
                      disabled={ obj.status !== 'Preparando' }
                    >
                      { obj.status !== 'Preparando'
                        ? 'JÁ SAIU PARA ENTREGA' : 'SAIR PARA ENTREGA'}
                    </button>
                  </th>
                </tr>
              </thead>
              <thead
                className={ `text-white h-12 py-3.5 uppercase
                bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
              >
                <tr>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    Descrição
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    Quantidade
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    Valor Unitário
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-base">
                    Sub-total
                  </th>
                </tr>
              </thead>
              <tbody />
              {
                obj.products.map((products, index) => (
                  <tr
                    className={ `bg-white border-b dark:bg-gray-900
             dark:border-t-bgColorGrayThead` }
                    key={ index }
                  >
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      data-testid={ `${dItemNum}-${index}` }
                    >
                      {index}
                    </td>
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      data-testid={ `${dItemName}-${index}` }
                    >
                      {products.name}
                    </td>
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      data-testid={ `${dItemQuantity}-${index}` }
                    >
                      {products.SalesProduct.quantity}
                    </td>
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      data-testid={ `${dUnityPrice}${index}` }
                    >
                      { products.price }
                    </td>
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      data-testid={ `${dSubPrice}-${index}` }
                    >
                      { Number(products.SalesProduct.quantity
                      * products.price).toFixed(2).replace('.', ',') }
                    </td>
                  </tr>
                ))
              }
              <div className="flex justify-center pt-6">
                <p
                  className={ `inline-block font-medium border border-yellow rounded
                py-1 px-3 bg-darkGray hover:bg-yellow text-yellow hover:text-black
                href="#"` }
                  data-testid="seller_order_details__element-order-total-price"
                >
                  { `Valor total do pedido: ${obj.totalPrice?.replace('.', ',')}` }
                </p>
              </div>
            </table>
          </section>
        ))
      }
    </div>
  );
}

Tableproductss.propTypes = {
  saleId: PropTypes.string.isRequired,
};
