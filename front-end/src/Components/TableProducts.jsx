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

  const buttonAllowed = `flex w-full p-1 justify-center rounded-md bg-darkGray border border-yellow
  font-bold justify-center hover:bg-yellow text-yellow
  hover:text-black`;

  const buttonNotAllowed = `flex w-full p-1 justify-center bg-yellow cursor-not-allowed border rounded-md
  font-bold hover:text-black`;

  return (
    <div>
      {
        order && order.map((obj) => (
          <section className="flex flex-col justify-center" key={ obj.id }>
            <div
              className={ `flex p-2 items-center font-semibold text-white
               uppercase border-b-2 border-y-yellow bg-bgColorGrayThead dark:bg-bgColorGrayThead gap-2` }
            >
              <div className="flex flex-col md:flex-row md:justify-evenly flex-grow gap-1">
                <div
                  className="text-white text-base text-center"
                  data-testid={ `seller_order_details__
                    element-order-details-label-order-id` }
                >
                  { `PEDIDO ${obj.id}`}
                </div>
                <div
                  className="text-white text-base text-center"
                  data-testid={ dataTestDate }
                >
                  { dataFormatada }
                </div>
                <div
                  className="text-white text-base text-center"
                  data-testid={ dTestStatus }
                >
                  {`Status: ${obj.status}`}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-1">
                <div className="text-white text-base">
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
                </div>
                <div className="text-white text-base">
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
                      ? 'SAIU PARA ENTREGA' : 'SAIR PARA ENTREGA'}
                  </button>
                </div>
              </div>
            </div>
            <table
              className={ `table-fixed text-base text-left text-gray-500 
              dark:text-gray-400 border-none` }
              key={ obj.id }
            >
              <thead
                className={ `text-white h-12 py-3.5 uppercase
                bg-bgColorGrayThead dark:bg-bgColorGrayThead` }
              >
                <tr>
                  <th scope="col" className="py-3 text-white text-base text-center sm:table-cell hidden">
                    Item
                  </th>
                  <th scope="col" className="py-3 max-w-[200px] text-white text-base text-center">
                    Descrição
                  </th>
                  <th scope="col" className="py-3 text-white text-base text-center">
                    Qtd
                  </th>
                  <th scope="col" className="py-3 text-white text-base text-center">
                    Valor
                  </th>
                  <th scope="col" className="py-3 text-white text-base text-center">
                    total
                  </th>
                </tr>
              </thead>
              <tbody />
              {
                obj.products.map((products, index) => (
                  <tr
                    className={ `bg-white dark:bg-gray-900
             dark:border-t-bgColorGrayThead odd:bg-bgColorWhiteIce even:bg-bgColorLightGray` }
                    key={ index }
                  >
                    <td
                      className={ `py-4 font-medium text-gray-900
                       whitespace-nowrap text-center sm:table-cell hidden` }
                      data-testid={ `${dItemNum}-${index}` }
                    >
                      {index}
                    </td>
                    <td
                      className={ `max-w-[200px] py-4 text-[15px] text-gray-900
                       whitespace-nowrap text-center` }
                      data-testid={ `${dItemName}-${index}` }
                    >
                      {products.name}
                    </td>
                    <td
                      className={ `py-4 font-medium text-gray-900
                       whitespace-nowrap text-center` }
                      data-testid={ `${dItemQuantity}-${index}` }
                    >
                      {products.SalesProduct.quantity}
                    </td>
                    <td
                      className={ `py-4 font-medium text-gray-900
                       whitespace-nowrap text-center` }
                      data-testid={ `${dUnityPrice}${index}` }
                    >
                      { products.price }
                    </td>
                    <td
                      className={ `py-4 font-medium text-gray-900
                       whitespace-nowrap text-center` }
                      data-testid={ `${dSubPrice}-${index}` }
                    >
                      { Number(products.SalesProduct.quantity
                      * products.price).toFixed(2).replace('.', ',') }
                    </td>
                  </tr>
                ))
              }
            </table>
            <div className="flex justify-start py-6">
              <p
                className={ `font-medium border border-yellow rounded
                py-1 px-3 bg-darkGray hover:bg-yellow text-yellow hover:text-black
                fixed bottom-3 right-5` }
                data-testid="seller_order_details__element-order-total-price"
              >
                { `Valor total do pedido: ${obj.totalPrice?.replace('.', ',')}` }
              </p>
            </div>
          </section>
        ))
      }
    </div>
  );
}

Tableproductss.propTypes = {
  saleId: PropTypes.string.isRequired,
};
