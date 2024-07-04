import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useSelector } from 'react-redux';

function Header() {
  const username = useSelector((state) => state.user.username);
  return (
    <header className="flex items-center justify-between border-b-2 border-b-black bg-amber-500 px-4 py-4 text-lg font-bold">
      <Link to={'/'} className="text-xl font-normal">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      {username && (
        <span className="hidden sm:block">
          <Username />
        </span>
      )}
    </header>
  );
}

export default Header;
