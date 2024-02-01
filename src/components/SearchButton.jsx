import { Search as SearchIcon } from '../icons/Search';

export const SearchButton = ({ search }) => {
  return (
    <div className='group gap-2 items-center justify-center bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full flex'>
      <SearchIcon className='size-4' />
      <input
        onChange={search}
        type='text'
        placeholder='Buscar en tu biblioteca'
        className='bg-zinc-800 w-[150px] h-[20px] sm:w-[300px] sm:h-[30px] px-1 group-hover:bg-zinc-700 focus:outline-none text-sm font-normal'
      />
    </div>
  );
};
