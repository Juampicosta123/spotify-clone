import { SearchButton } from './SearchButton';
import { useState } from 'react';
import debounce from 'just-debounce-it';
import { ExploreCard } from './ExploreCard';
import { SearchItem } from './SearchItem';
import { getSongs } from '../services/songs';
import { getPlaylists } from '../services/playlist';
import { getAlbums } from '../services/album';
import { CardPlayButton } from './CardPlayButton';
import { SearchSongSkeleton } from './skeletons/SearchSongSkeleton';
import { SearchAlbumSkeleton } from './skeletons/SearchAlbumSkeleton';

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  const search = debounce(async (e) => {
    setLoadingSongs(true);
    setLoadingAlbums(true);
    setLoadingPlaylists(true);
    e.preventDefault();
    const lowerCaseQuery = e.target.value.toLowerCase();
    setSearchQuery(lowerCaseQuery);
    const dataSongs = await getSongs({ searchQuery: lowerCaseQuery });
    setSongs(dataSongs);
    setLoadingSongs(false);
    const dataPlaylists = await getPlaylists({ searchQuery: lowerCaseQuery });
    setPlaylists(dataPlaylists);
    setLoadingPlaylists(false);
    const dataAlbums = await getAlbums({ searchQuery: lowerCaseQuery });
    setAlbums(dataAlbums);
    setLoadingAlbums(false);
  }, 1500);

  const explore = [
    {
      title: 'Música',
      img: 'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb',
      color: '#DC148C'
    },
    {
      title: 'Podcasts',
      img: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa',
      color: '#006450'
    },
    {
      title: 'Eventos en vivo',
      img: 'https://concerts.spotifycdn.com/images/live-events_category-image.jpg',
      color: '#8400E7'
    },
    {
      title: 'Creados para ti',
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#1E3264'
    },
    {
      title: 'Nuevos lanzamientos',
      img: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
      color: '#E8115B'
    },
    {
      title: 'Merch',
      img: 'https://i.scdn.co/image/ab6761700000c52c87ab6b4a0c51593853fe2157',
      color: 'rgb(39, 133, 106)'
    },
    {
      title: 'Pop',
      img: 'https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768',
      color: 'rgb(20, 138, 8)'
    }
  ];

  return (
    <div
      id='search-container'
      className='relative z-10 transition-all duration-1000 h-full p-4'
    >
      <header className='flex items-center justify-start p-6'>
        <SearchButton search={search} />
      </header>
      <section className='p-3'>
        {searchQuery ? (
          <div className='flex flex-col gap-4'>
            <div className='w-full'>
              <h3 className='text-2xl font-bold mb-3'>Canciones</h3>
              {loadingSongs &&
                new Array(4)
                  .fill(null)
                  .map(() => <SearchSongSkeleton key={crypto.randomUUID()} />)}
              {songs.length === 0 && !loadingSongs && (
                <h5>No se encontraron canciones!</h5>
              )}
              {songs &&
                songs.map((song) => <SearchItem song={song} key={song._id} />)}
            </div>

            <div className='w-full'>
              <h3 className='text-2xl font-bold mb-3'>Playlists</h3>
              <div className='flex flex-wrap gap-[20px] items-center'>
                {loadingPlaylists &&
                  new Array(4)
                    .fill(null)
                    .map(() => (
                      <SearchAlbumSkeleton key={crypto.randomUUID()} />
                    ))}
                {playlists.length === 0 && !loadingPlaylists && (
                  <h5>No se encontraron playlists!</h5>
                )}
                {playlists &&
                  playlists.map((playlist) => (
                    <article
                      key={playlist._id}
                      class='group relative max-w-[176px] bg-zinc-800 shadow-lg hover:shadow-xl hover:bg-zinc-500/30 rounded-md ransi transition-all duration-100'
                    >
                      <div
                        class='absolute right-4 bottom-20 translate-y-4
                    transition-all duration-500 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    z-10'
                      >
                        <CardPlayButton album={null} playlist={playlist} />
                      </div>

                      <a
                        href={`/playlist/${playlist?._id}`}
                        class='playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col'
                        transition:name={`playlist ${playlist?._id} square box`}
                      >
                        <picture class='aspect-square w-full h-auto flex-none'>
                          <img
                            src={playlist?.imagelink}
                            alt={`Cover of ${playlist?.title} by ${playlist?.artistOwner}`}
                            class='object-cover w-full h-full rounded-md'
                            transition:name={`playlist ${playlist?._id} image square`}
                          />
                        </picture>

                        <div class='flex flex-auto flex-col px-2'>
                          <h2
                            transition:name={`playlist ${playlist?._id} title square`}
                            class='text-white text-md font-semibold truncate'
                          >
                            {playlist?.title}
                          </h2>

                          <span class='text-sm text-gray-400 truncate font-light'>
                            {playlist?.owner}
                          </span>
                        </div>
                      </a>
                    </article>
                  ))}
              </div>
            </div>
            <div className='w-full'>
              <h3 className='text-2xl font-bold mb-3'>Álbumes</h3>
              <div className='flex flex-wrap gap-[20px] items-center'>
                {loadingAlbums &&
                  new Array(4)
                    .fill(null)
                    .map(() => (
                      <SearchAlbumSkeleton key={crypto.randomUUID()} />
                    ))}
                {albums.length === 0 && !loadingAlbums && (
                  <h5>No se encontraron álbumes!</h5>
                )}
                {albums &&
                  albums.map((album) => (
                    <article
                      key={album._id}
                      class='group relative max-w-[176px] bg-zinc-800 shadow-lg hover:shadow-xl hover:bg-zinc-500/30 rounded-md ransi transition-all duration-100'
                    >
                      <div
                        class='absolute right-4 bottom-20 translate-y-4
                    transition-all duration-500 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    z-10'
                      >
                        <CardPlayButton album={album} playlist={null} />
                      </div>

                      <a
                        href={`/album/${album?._id}`}
                        class='playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col'
                        transition:name={`album ${album?._id} square box`}
                      >
                        <picture class='aspect-square w-full h-auto flex-none'>
                          <img
                            src={album?.imagelink}
                            alt={`Cover of ${album?.title} by ${album?.artistOwner}`}
                            class='object-cover w-full h-full rounded-md'
                            transition:name={`album ${album?._id} image square`}
                          />
                        </picture>

                        <div class='flex flex-auto flex-col px-2'>
                          <h2
                            transition:name={`album ${album?._id} title square`}
                            class='text-white text-md font-semibold truncate'
                          >
                            {album?.title}
                          </h2>

                          <span class='text-sm text-gray-400 truncate font-light'>
                            {album?.artistOwner}
                          </span>
                        </div>
                      </a>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className='text-2xl font-bold mb-3'>Explorar todo</h3>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 '>
              {explore.map(({ title, img, color }, index) => (
                <ExploreCard
                  key={index}
                  title={title}
                  img={img}
                  color={color}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
