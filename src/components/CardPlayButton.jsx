import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';
import { createQueue } from '../services/queue';

export function CardPlayButton({ playlist, size = 'small', album }) {
  const { isPlaying, setIsPlaying, random, queue, setQueue } =
    usePlayerStore((state) => state);
  const [isPlayingItem, setIsPlayingItem] = useState(
    isPlaying && queue?.song?.albumId === playlist?._id
  );

  const item = playlist ? playlist : album;
  const ItemType = playlist ? 'Playlist' : 'Album';

  const handleClick = async () => {
    if (queue?.from === item?._id) {
      setIsPlaying(!isPlaying);
      return;
    }
    try {
      let newQueue;
      if (queue) {
        if (queue?.from !== item?._id) {
          newQueue = await createQueue({
            from: item._id,
            fromType: ItemType,
            random
          });
        } else {
          setIsPlaying(!isPlaying);
          return;
        }
      } else {
        newQueue = await createQueue({
          from: item._id,
          fromType: ItemType,
          random
        });
      }

      setQueue(newQueue);
      setIsPlaying(true);
      //localStorage.setItem('queue', JSON.stringify(newQueue));
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  useEffect(() => {
    if (queue?.from === item?._id) {
      setIsPlayingItem(!isPlayingItem);
    } else {
      setIsPlayingItem(false);
    }
  }, [queue, isPlaying]);

  const btnClassName = size === 'small' ? 'p-4' : 'p-5';
  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <button
      onClick={handleClick}
      className={` rounded-full bg-green-500 hover:scale-105 transition hover:bg-green-400 ${btnClassName}`}
    >
      {isPlayingItem ? (
        <Pause className={iconClassName + ' text-[#000]'} />
      ) : (
        <Play className={iconClassName + ' text-[#000]'} />
      )}
    </button>
  );
}
