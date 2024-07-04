/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';

function Button({ children, to, isLink, color, onClick, primary, disabled }) {
  const className = `border px-2 py-1 text-xs`;
  const primaryColor = `${color === 'dark' ? 'border-black bg-amber-500 hover:bg-black hover:text-white' : 'text-white hover:bg-white hover:text-black'}`;
  const secondaryColor = `${color === 'dark' ? 'border-black bg-gray-300 hover:bg-black hover:text-white' : 'text-white hover:bg-white hover:text-black'}`;
  const navigate = useNavigate();

  if (isLink)
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`${className} border-none text-blue-500`}
      >
        {children}
      </Link>
    );
  return (
    <button
      className={` ${className} ${primary ? primaryColor : secondaryColor} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
