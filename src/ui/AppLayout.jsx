import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import Loader from './Loader.jsx';

function AppLayout() {
  const naviagtion = useNavigation();
  const isLoading = naviagtion.state === 'loading';

  return (
    <div
      className="grid h-dvh grid-rows-[auto_1fr_auto] bg-amber-100 font-source"
      // " grid h-screen grid-rows-[auto_1fr_auto] bg-amber-100 "
    >
      {isLoading && <Loader />}
      <Header />
      <main className="overflow-auto scroll-smooth">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
