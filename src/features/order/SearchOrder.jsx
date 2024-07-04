import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-2 border-black bg-amber-100"
    >
      <input
        placeholder={'Search order #'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-32 bg-amber-100 px-2 py-1 text-sm font-normal transition-transform focus:outline-none duration-700 md:w-64 md:transition-transform md:duration-700`}
      />
      <span className="py-1 pr-2"> &#x1F50E;&#xFE0E;</span>
    </form>
  );
}

export default SearchOrder;
