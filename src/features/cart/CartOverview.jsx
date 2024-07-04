import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from './CartSlice';

function CartOverview({ children, to }) {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return;
  return (
    <div className="sticky bottom-0 flex w-full cursor-default items-center justify-around bg-black py-3 text-white">
      <p>
        <span>{totalCartQuantity} pizzas</span>
        <span className="ml-2 underline underline-offset-1">
          ${totalCartPrice}
        </span>
      </p>
      <Button to={to} isLink={true}>
        {children}
      </Button>
    </div>
  );
}

export default CartOverview;
