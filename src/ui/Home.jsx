import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from '../components/Button';
function Home() {
  const usernname = useSelector((state) => state.user.username);
  return (
    <>
      <div className="mx-4 mt-[10%] flex flex-col items-center justify-center gap-20 md:mt-[5%]">
        <h1 className="text-black-900 text-center text-2xl font-bold text-amber-500 md:text-4xl">
          <span className="text-black">The best pizza.</span>
          <br />
          Straight out of the oven,
          <br />
          straight to you
        </h1>
        {usernname ? (
          <Button isLink={true} to="/menu">
            continue ordering, {usernname} &rarr;{' '}
          </Button>
        ) : (
          <CreateUser />
        )}
      </div>
    </>
  );
}

export default Home;
