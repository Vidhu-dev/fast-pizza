import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import CartOverview from './CartOverview';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './CartSlice';
import EmptyCart from './EmptyCart';
function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleProceed() {
    navigate('/order/new');
  }
  function handleClick() {
    console.log('clear cart ....');
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <div className="pt-2 md:mx-[20%]">
        <Button to="/menu" color={'dark'} isLink={true}>
          &larr; Back to menu
        </Button>
        <div className="mx-4 my-4">
          <h2 className="py-2">Your cart, {username}</h2>
          <ul className="my-4 divide-y divide-amber-800/10 border-y border-amber-800/10">
            {cart.map((pizza) => (
              <CartItem key={pizza.pizzaId} item={pizza} />
            ))}
          </ul>
          <div className="my-4 flex gap-2 text-sm">
            <Button color={'dark'} onClick={handleProceed} primary={true}>
              Order pizzas
            </Button>

            <Button color={'dark'} onClick={handleClearCart}>
              {' '}
              Clear cart
            </Button>
          </div>
        </div>
      </div>
      <CartOverview to={'/menu'}> &larr; Back to menu </CartOverview>
    </div>
  );
}

export default Cart;
