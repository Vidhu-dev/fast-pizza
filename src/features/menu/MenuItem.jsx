import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/CartSlice';
import UpdateItem from '../cart/UpdateItem';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      ingredients,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li
      className={`flex w-96 gap-4 border border-black ${soldOut && 'text-gray-400 grayscale'}`}
    >
      <img className="w-32" src={imageUrl} alt={name} />
      <div className="flex flex-col">
        <p className="font-bold">{name}</p>
        <p className="font-thin capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between px-1 py-1 text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font uppercase">Sold out</p>
          )}
          {!soldOut &&
            (currentQuantity === 0 ? (
              <Button primary={true} color={'dark'} onClick={handleAddToCart}>
                Add to cart
              </Button>
            ) : (
              <UpdateItem pizzaId={id} />
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
