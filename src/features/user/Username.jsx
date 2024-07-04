import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);

  return <>{ <p>{username}</p> }</>;
}

export default Username;
