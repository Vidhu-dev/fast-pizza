import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import CartOverview from '../cart/CartOverview';


function Menu() {
  const menu = useLoaderData();
  
  return (
    <div className="">
      <h1 className="sticky top-0 z-10 border-b-2 border-black py-3 text-center text-2xl font-medium backdrop-blur-3xl">
        Menu
      </h1>
      <ul className="mx-4 my-4 z-0 flex flex-wrap justify-center gap-2 lg:mx-28">
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
      <CartOverview to={'/cart'}> Open cart &rarr;</CartOverview>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
