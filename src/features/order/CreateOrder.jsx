import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartOverview from '../cart/CartOverview';
import { clearCart, getCart, getTotalCartPrice } from '../cart/CartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="grid h-full grid-rows-[1fr]">
      <div className="mt-10 flex flex-col items-center gap-5 p-4">
        <h2 className="text-lg font-bold">Ready to order? Let's go!</h2>

        <Form method="post" className="flex w-[22rem] flex-col gap-2 sm:w-96">
          <Input
            type={'text'}
            label={'First Name'}
            name={'customer'}
            defaultValue={username}
          />

          <Input type={'text'} label={'Phone number'} name={'phone'} />
          {formErrors?.phone && (
            <p className="error w-full bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
          <Input
            defaultValue={address}
            type={'text'}
            name={'address'}
            label={'Address'}
            disabled={isLoadingAddress}
          >
            {!position.latitude && !position.longitude && (
              <Button
                disabled={isLoadingAddress}
                color={'dark'}
                onClick={(e) => {
                  e.preventDefault(), dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            )}
          </Input>
          {addressStatus === 'error' && (
            <p className="error w-full bg-red-100 p-2 text-xs text-red-700">
              {errorAddress}
            </p>
          )}

          <div className="flex gap-2 py-2">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="w-4 accent-amber-500"
              checked={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="text-sm">
              Want to yo give your order priority?
            </label>
          </div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}} `
                : ''
            }
          />
          <Button
            primary={true}
            color={'dark'}
            type="submit"
            disabled={isSubmitting || isLoadingAddress}
          >
            <span className="uppercase">
              {isSubmitting
                ? 'Placing order now..'
                : `Order now from ${formatCurrency(totalPrice)}`}
            </span>
          </Button>
        </Form>
      </div>
      <CartOverview to={'/menu'}> &larr; Back to menu </CartOverview>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };


  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Invalid phone number. Please give correct phone number. We might need to contact you.';
  if (Object.keys(errors).length) return errors;

  //if no errors create order
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
