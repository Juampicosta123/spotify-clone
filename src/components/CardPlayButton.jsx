import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';
import { createQueue } from '../services/queue';

export function CardPlayButton({ playlist, size = 'small' }) {
  const { currentMusic, isPlaying, setIsPlaying, random, queue, setQueue } =
    usePlayerStore((state) => state);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(
    isPlaying && queue?.song?.albumId === playlist?._id
  );

  const handleClick = async () => {
    if (queue?.song?._id === playlist?._id) {
      setIsPlaying(!isPlaying);
      return;
    }
    try {
      let newQueue;
      if (queue) {
        if (queue?.from !== playlist?._id) {
          newQueue = await createQueue({
            from: playlist._id,
            fromType: 'Playlist',
            random
          });
        } else {
          setIsPlaying(!isPlaying);
          return;
        }
      } else {
        newQueue = await createQueue({
          from: playlist._id,
          fromType: 'Playlist',
          random
        });
      }

      setQueue(newQueue);

      setIsPlaying(true);
      localStorage.setItem('currentMusic', JSON.stringify(queue));
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  useEffect(() => {
    setIsPlayingPlaylist(
      isPlaying && currentMusic?.song?.albumId === playlist?._id
    );
  }, [currentMusic, isPlaying]);

  const btnClassName = size === 'small' ? 'p-4' : 'p-5';
  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <button
      onClick={handleClick}
      className={` rounded-full bg-green-500 hover:scale-105 transition hover:bg-green-400 ${btnClassName}`}
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName + ' text-[#000]'} />
      ) : (
        <Play className={iconClassName + ' text-[#000]'} />
      )}
    </button>
  );
}
