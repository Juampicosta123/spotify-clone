import { usePlayerStore } from '@/store/playerStore';
import { useEffect, useState } from 'react';
import { Volume } from '@/icons/Volume.jsx';
export const SideMenuCard = ({ playlist }) => {
  const { currentMusic, isPlaying } = usePlayerStore((state) => state);

  const { title, imagelink, artists, _id: id, owner } = playlist;

  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(
    isPlaying && currentMusic?.song?.albumId === playlist?._id
  );

  useEffect(() => {
    setIsPlayingPlaylist(
      isPlaying && currentMusic?.song?.albumId === playlist._id
    );
  }, [currentMusic, isPlaying]);

  const playingSongClassName = isPlayingPlaylist
    ? 'text-green-500'
    : 'text-white';

  const artistsString = artists.join(', ');

  return (
    <a
      href={`/playlist/${id}`}
      className='playlist-item flex relative w-full overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800 justify-between'
    >
      <div className='flex p-2 w-full items-center gap-5'>
        <picture className='size-12 flex-none'>
          <img
            src={imagelink}
            alt={`Cover of ${title} by ${artistsString}`}
            className='object-cover size-full rounded-md'
          />
        </picture>

        <div className='flex flex-auto flex-col w-full'>
          <h4 className={playingSongClassName}>{title}</h4>
          <span className='text-gray-400 text-sm truncate'>
            Playlist · {owner}
          </span>
        </div>
      </div>
      {isPlayingPlaylist ? (
        <div className='p-3'>
          <Volume className='size-5 text-green-500' />
        </div>
      ) : null}
    </a>
  );
};
