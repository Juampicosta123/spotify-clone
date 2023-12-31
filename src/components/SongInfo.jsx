import { usePlayerStore } from '@/store/playerStore';
import { useEffect } from 'react';

export function SongInfo({
  title,
  artists,
  image,
  isPlayingSong,
  albumId,
  id
}) {
  const artistsString = artists?.join(', ');

  const playingSongClassName = isPlayingSong ? 'text-green-500' : '';

  return (
    <div
      className={`playlist-item flex relative overflow-hidden items-center gap-4 rounded-md`}
    >
      <picture className='size-11 flex-none'>
        {!image ? (
          <div className='bg-zinc-700 size-4' />
        ) : (
          <img
            src={image}
            alt={`Cover of ${title} by ${artistsString}`}
            className='object-cover size-full rounded-md'
          />
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <a
          href={`/song/${id}`}
          className={` ${playingSongClassName} text-white hover:underline text-sm w-max`}
        >
          {title}
        </a>
        <a
          href={`/album/${albumId}`}
          className='text-gray-400 text-xs truncate hover:underline w-max'
        >
          {artistsString}
        </a>
      </div>
    </div>
  );
}
