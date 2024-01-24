import { Home as HomeIcon } from '../icons/Home.jsx';
import { Search as SearchIcon } from '../icons/Search.jsx';
import { Library as LibraryIcon } from '../icons/Library.jsx';
import { SideMenuItem } from './SideMenuItem.jsx';
import { SideMenuCard } from './SideMenuCard.jsx';
import { useState, useEffect } from 'react';
import { getPlaylists } from '../services/playlist';
import debounce from 'just-debounce-it';

export const AsideMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPlaylist, setSearchPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const search = debounce(async (e) => {
    e.preventDefault();
    const lowerCaseQuery = e.target.value.toLowerCase();
    setSearchQuery(lowerCaseQuery);

    try {
      const data = await getPlaylists({ searchQuery: lowerCaseQuery });
      console.log(data);
      setSearchPlaylist(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  }, 1500);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlists = await getPlaylists({ searchQuery: '' });
        setPlaylists(playlists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <nav className='flex flex-col flex-1 gap-2'>
      <div className='bg-zinc-900 rounded-lg py-2 px-1'>
        <ul>
          <SideMenuItem name='home' href='/' className='gap-5'>
            <HomeIcon className='size-6' />
            <span className='hidden lg:block'>Inicio</span>
          </SideMenuItem>
          <SideMenuItem name='search' href='/#' className='gap-5'>
            <SearchIcon className='size-6' />
            <span className='hidden lg:block'>Buscar</span>
          </SideMenuItem>
        </ul>
      </div>

      <div className='bg-zinc-900 rounded-lg py-1 px-1 flex-1'>
        <ul>
          <SideMenuItem name='library' href='/' className='gap-3'>
            <LibraryIcon className='size-6' />
            <span className='hidden lg:block'>Tu biblioteca</span>
          </SideMenuItem>
          <li className='overflow-y-auto overflow-x-auto h-full max-h-[685px]'>
            <div
              aria-label={`Search`}
              className={`flex  text-zinc-400 hover:text-zinc-100 items-center justify-center lg:justify-normal py-3 px-2 lg:px-5 font-bold transition`}
            >
              <div className='group gap-2 items-center justify-center bg-zinc-800 hover:bg-zinc-700 p-1 rounded-md hidden lg:flex'>
                <SearchIcon className='size-4' />
                <input
                  onChange={search}
                  type='text'
                  placeholder='Buscar en tu biblioteca'
                  className='bg-zinc-800 px-1 group-hover:bg-zinc-700 focus:outline-none text-sm font-normal'
                />
              </div>
            </div>
            <div className='w-full'>
              {searchQuery &&
                searchPlaylist?.length !== 0 &&
                searchPlaylist?.map((playlist) => (
                  <SideMenuCard key={playlist._id} playlist={playlist} />
                ))}
              {searchQuery && searchPlaylist?.length === 0 && (
                <p className='m-3'>No se encontraron playlists!</p>
              )}
              {!searchQuery &&
                playlists?.length !== 0 &&
                playlists?.map((playlist) => (
                  <SideMenuCard key={playlist._id} playlist={playlist} />
                ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
