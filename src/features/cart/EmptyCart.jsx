import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function EmptyCart() {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] pt-2 md:mx-[20%]">
      <Button to="/menu" color={'dark'} isLink={true}>
        &larr; Back to menu
      </Button>

      <p className="mx-4 my-4 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
