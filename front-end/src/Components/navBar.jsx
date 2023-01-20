// import { useContext } from 'react';
// import DeliveryAppContext from '../Context/DeliveryAppContext';

export default function NavBar(item) {
  // const { user } = useContext(DeliveryAppContext)
  // deixei essas linhas comentadas pois mais para frente pensei em usa-las para pegar o nome do usuario pelo state

  return (
    <>
      <a>Produtos</a>
      <a>Meus Pedidos</a>
      <a>Cicrano da Silva</a>
      <a>Sair</a>
    </>
  );
}