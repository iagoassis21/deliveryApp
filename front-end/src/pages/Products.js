import React from 'react';
import DeliveryAppMock from '../Mocks/DeliveryAppMock';

export default function Products() {
  return (
    <div>
      {
        DeliveryAppMock.map((item) => (
          <div key={ item.id }>
            <span>{ item.image_url }</span>
            <span>{ item.name }</span>
            <span>{ item.price }</span>
          </div>))
      }
    </div>
  );
}
