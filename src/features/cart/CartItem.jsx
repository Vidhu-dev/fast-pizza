import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem } from './CartSlice';
import UpdateItem from './UpdateItem';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="border-amber-800/10 px-2 py-4">
      <div className="sm:flex sm:justify-between">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold">{formatCurrency(totalPrice)}</p>{' '}
          <UpdateItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
