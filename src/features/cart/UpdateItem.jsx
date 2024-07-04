/* eslint-disable react/prop-types */
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  deleteItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from './CartSlice';

function UpdateItem({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        color={'dark'}
        primary={true}
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        &minus;
      </Button>

      <span className="font-semibold">{currentQuantity}</span>

      <Button
        color={'dark'}
        primary={true}
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        &#43;
      </Button>
      <Button color={'dark'} onClick={() => dispatch(deleteItem(pizzaId))}>
        Delete
      </Button>
    </div>
  );
}

export default UpdateItem;
