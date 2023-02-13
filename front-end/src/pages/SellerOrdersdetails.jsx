/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { useParams } from 'react-router-dom';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import NavBar from '../Components/NavBar';
import TableProducts from '../Components/TableProducts';

export default function SellerOrdersdetails() {
  const { id } = useParams();

  return (
    <div>
      <NavBar />
      <div className="border-t-2 border-y-yellow">
        <ScrollArea.Root className="w-full h-full">
          <ScrollArea.Viewport className="w-full h-full">
            <section className="justify-center">
              <TableProducts saleId={ id } />
            </section>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className={ `flex select-none touch-none p-0.5 bg-blackA6
                transition-colors duration-[160ms] ease-out hover:bg-blackA8
                data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col
                data-[orientation=horizontal]:h-2.5` }
            orientation="horizontal"
          >
            <ScrollArea.Thumb
              className={ ` flex-1 bg-mauve10 rounded-[10px]
                relative before:content-[''] before:absolute before:top-1/2
                before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]` }
            />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-blackA8" />
        </ScrollArea.Root>
      </div>
    </div>
  );
}
