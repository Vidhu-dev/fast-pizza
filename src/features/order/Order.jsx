
import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load(`/menu`);
    },
    [fetcher],
  );


  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-3 py-2 sm:mx-[10%] md:mx-[20%]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Order #{id} status </h2>
        <div className="flex gap-3">
          {priority && (
            <span className="bg-red-500 px-2 py-1 font-bold text-red-50">
              Priority
            </span>
          )}
          <span className="bg-green-500 px-2 py-1 font-bold text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="my-2 bg-gray-400/30 p-4">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="my-8 border-t-[1px] border-amber-800/10">
        {cart.map((pizza) => (
          <OrderItem
            key={pizza.pizzaId}
            item={pizza}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((element) => element.id === pizza.pizzaId)
                .ingredients || []
            }
          />
        ))}
      </ul>

      <div className="bg-gray-400/30 p-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
     {!priority &&  <UpdateOrder /> }
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
