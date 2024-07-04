/* eslint-disable react/prop-types */
import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  
  return (
    <li className="flex justify-between border-b-[1px] border-amber-800/10 px-2 py-4">
      <p>
        <span>{quantity}&times;</span> {name}
        <p className="text-sm font-light capitalize italic">
          {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
        </p>
      </p>

      <p>{formatCurrency(totalPrice)}</p>
    </li>
  );
}

export default OrderItem;
