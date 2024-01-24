import { getAlbum } from '../services/album';
import { getPlaylist } from '../services/playlist';
import { usePlayerStore } from '../store/playerStore';
import { useEffect, useState } from 'react';
import { VolumeControlMobile } from './VolumeControlMobile';

export const CurrentSongMobile = () => {
  const [album, setAlbum] = useState('');
  const { queue } = usePlayerStore((state) => state);

  const albumId = queue?.from;
  const fromType = queue?.fromType;
  const currentSong = queue?.currentSong;

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (fromType === 'Playlist') {
          const { data } = await getPlaylist({ id: albumId });
          setAlbum(data);
        } else if (fromType === 'Album') {
          const { data } = await getAlbum({ id: albumId });
          setAlbum(data);
        }
      } catch (error) {
        console.error('Error fetching Album:', error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const artistsString = currentSong?.artists?.join(', ');
  return (
    <div
      className={`flex z-10 sm:hidden relative overflow-hidden items-center gap-5 rounded-md justify-center`}
      style={{ backgroundColor: album?.color }}
    >
      <picture className='size-12 md:size-16 flex-none'>
        {!album?.imagelink ? (
          <div className='bg-zinc-700 size-full'></div>
        ) : (
          <img
            src={album?.imagelink}
            alt={`Cover of ${queue?.title} by ${artistsString}`}
            className='object-cover size-full rounded-md hover:scale-105'
          />
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <a
          aria-label='Reproduce una canción!'
          href={`/song/${currentSong?.title}`}
          className='text-white hover:underline text-sm'
        >
          {!currentSong?.title ? 'Reproduce una canción!' : currentSong?.title}
        </a>
        <span className='text-gray-400 text-xs truncate hover:underline'>
          {artistsString}
        </span>
      </div>
      <VolumeControlMobile />
      <div className='absolute -z-10 inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50'></div>
    </div>
  );
};
