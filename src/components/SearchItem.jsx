import { useEffect, useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { formatTime } from '../utils/formatTime';
import { SongSearchInfo } from './SongSearchInfo';
import { createQueue } from '../services/queue';

export const SearchItem = ({ song }) => {
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isPlaying, setIsPlaying, random, queue, setQueue } = usePlayerStore(
    (state) => state
  );

  const [isPlayingItem, setIsPlayingItem] = useState(
    isPlaying && queue?.currentSong?._id === song?._id
  );

  useEffect(() => {
    const currentSong = queue?.currentSong;
    if (isPlaying && currentSong?._id === song?._id) {
      setIsPlayingSong(true);
    } else {
      setIsPlayingSong(false);
    }
  }, [queue]);

  const handleClick = async () => {
    if (queue?.currentSong?._id === song?._id) {
      setIsPlaying(!isPlaying);
      return;
    }

    try {
      let newQueue;
      if (!queue) {
        newQueue = await createQueue({
          from: song.albumId._id,
          fromType: 'Album',
          random: false,
          songId: song?._id
        });
      } else if (queue?.currentSong?._id === song?._id) {
        newQueue = queue;
      } else if (queue?.currentSong?._id !== song?._id) {
        newQueue = await createQueue({
          from: song.albumId._id,
          fromType: 'Album',
          random: false,
          songId: song?._id
        });
      }
      setQueue(newQueue);
      setIsPlaying(true);
      //localStorage.setItem('queue', JSON.stringify(newQueue));
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='border-separate flex  items-center text-gray-400 border-spacing-0 rounded text-sm hover:bg-white/10'
      onClick={handleClick}
    >
      <div className='px-2 py-2 font-light w-full'>
        <SongSearchInfo
          isHovered={isHovered}
          isPlayingItem={isPlayingItem}
          {...song}
          isPlayingSong={isPlayingSong}
        />
      </div>
      <p className='hidden sm:block px-4 py-2 font-light w-full text-end'>
        {song?.album}
      </p>
      <p className='c sm:px-4 py-2 font-light rounded-tr-lg rounded-br-lg'>
        {formatTime(song?.duration)}
      </p>
    </article>
  );
};
