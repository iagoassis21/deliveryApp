/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Package } from 'phosphor-react';
import { getSaleById, updateStatus } from '../Services/DeliveryAppApi';
import TableHeaderCheckout from '../Components/TableHeaderCheckout';
import TableBodyCheckout from '../Components/TableBodyCheckout';
import DeliveryAppContext from '../Context/DeliveryAppContext';
import NavBar from '../Components/NavBar';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { setCart } = useContext(DeliveryAppContext);
  const [saleData, setSalaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const COD = 'customer_order_details';
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const resultOrder = async () => {
      const orderData = await getSaleById(orderId, token);
      setSalaData(orderData);
      setLoading(false);
      return setCart(orderData.products);
    };
    resultOrder();
  }, [setCart, orderId]);

  const getDateFormated = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    return `0${day}/0${month}/${year}`;
  };

  const handleStatus = async (event) => {
    const { name } = event.target;
    const { token } = JSON.parse(localStorage.getItem('user'));
    await updateStatus(orderId, name, token);
    const orderData = await getSaleById(orderId, token);
    setSalaData(orderData);
  };

  const handleTextButton = (status) => {
    if (status === 'Pendente') {
      return 'O pedido está pendente';
    }
    if (status === 'Preparando') {
      return 'O pedido está sendo preparado';
    }
    if (status === 'Entregue') {
      return 'O pedido já foi entregue';
    }
    return 'Marcar como Entregue';
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const buttonAllowed = `px-1 h-12 rounded-md bg-darkGray border border-yellow
  font-bold flex text-center items-center justify-center gap-1 hover:bg-yellow text-yellow
  hover:text-black href="#"`;

  const buttonNotAllowed = `bg-yellow cursor-not-allowed px-2 h-12 rounded-md
  font-bold flex items-center gap-3 hover:text-black`;

  const emTransito = 'Em Trânsito';

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols gap-3 mt-2 py-12 px-36 rounded-lg">
        <h1 className="text-center font-bold">Detalhes de Pedido</h1>
        <section
          className={ `flex justify-center text-center border-4 bg-bgColorGrayThead
       border-darkGray hover:bg-darkGray text-white font-semibold
         shadow-2xl rounded-lg href="#"` }
          key={ saleData.id }
        >
          <div className="flex space-x-24 py-4">
            <div className="grid justify-center">
              <p className="pb-2">Número do Pedido</p>
              <div
                data-testid={ `${COD}__element-order-details-label-order-id` }
              >
                {`${saleData.id}`}
              </div>
            </div>
            <div className="grid justify-center">
              <p className="pb-2">Vendedor</p>
              <div data-testid={ `${COD}__element-order-details-label-seller-name` }>
                {`${saleData?.seller?.name}`}
              </div>
            </div>
            <div className="grid justify-center">
              <p className="pb-2">Data do pedido</p>
              <div data-testid={ `${COD}__element-order-details-label-order-date` }>
                {`${getDateFormated(saleData.saleDate)}`}
              </div>
            </div>
            <div className="grid justify-center">
              <p>Status do Pedido</p>
              <div
                data-testid={ `${COD}__element-order-details-label-delivery-status${0}` }
              >
                {`${saleData.status}`}
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <p className="pb-2">O pedido Chegou?</p>
              <button
                className={ saleData.status !== emTransito
                  ? buttonNotAllowed : buttonAllowed }
                data-testid="customer_order_details__button-delivery-check"
                name="Entregue"
                type="button"
                disabled={ saleData.status !== emTransito }
                onClick={ handleStatus }
                title={ saleData.status !== emTransito
                  ? 'O pedido não está em trânsito' : 'Marque como Entregue' }
              >
                <Package size={ 32 } />
                {handleTextButton(saleData.status)}
              </button>
            </div>
          </div>
        </section>
      </div>
      <section className="grid grid-col justify-center">
        <table>
          <TableHeaderCheckout />
          <TableBodyCheckout />
        </table>
        <div className="flex justify-center pt-6">
          <p
            className={ `inline-block font-medium border border-yellow rounded
            py-1 px-3 bg-darkGray hover:bg-yellow text-yellow hover:text-black
            href="#"` }
            data-testid="customer_order_details__element-order-total-price"
          >
            { `Valor total do pedido: ${saleData?.totalPrice?.replace('.', ',')}` }
          </p>
        </div>
      </section>
    </div>
  );
}
