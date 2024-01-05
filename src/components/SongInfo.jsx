import { getAlbum } from '@/services/album';
import { useEffect, useState } from 'react';

export function SongInfo({
  title,
  artists,
  isPlayingSong,
  albumId,
  id
}) {
  const [album, setAlbum] = useState({});
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await getAlbum({ id: albumId });
        setAlbum(data);
      } catch (error) {
        console.error('Error fetching Album:', error);
      }
    };

    fetchAlbum();
  }, []);

  const cover = album.imagelink;

  const playingSongClassName = isPlayingSong ? 'text-green-500' : 'text-white';

  const artistsString = artists?.join(', ');

  return (
    <div
      className={`playlist-item flex relative overflow-hidden items-center gap-4 rounded-md`}
    >
      <picture className='size-11 flex-none'>
        {!cover ? (
          <div className='bg-zinc-700 size-4' />
        ) : (
          <img
            src={cover}
            alt={`Cover of ${album.title} by ${artistsString}`}
            className='object-cover size-full rounded-md'
          />
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <a
          href={`/song/${id}`}
          className={` ${playingSongClassName} hover:underline text-sm w-max`}
        >
          {title}
        </a>
        <a
          href={`/album/${album._id}`}
          className='text-gray-400 text-xs truncate hover:underline w-max'
        >
          {artistsString}
        </a>
      </div>
    </div>
  );
}
