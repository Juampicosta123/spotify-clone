import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';
import { createQueue } from '@/services/queue';

export function SongTableItemPlayButton({ song, isHovered, playlist }) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    random,
    queue,
    setQueue
  } = usePlayerStore((state) => state);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(
    isPlaying && currentMusic?.playlist?._id === song?._id
  );

  const handleClick = async () => {
    if (
      currentMusic?.song?.albumId === playlist._id &&
      currentMusic?.song?._id === song?._id
    ) {
      setIsPlaying(!isPlaying);
      return;
    }
    try {
      let newQueue;
      if (!queue) {
        newQueue = await createQueue({
          from: playlist._id,
          fromType: 'Playlist',
          random,
          songId: song?._id
        });
      } else if (queue.currentSong._id === song._id) {
        newQueue = queue;
      } else if (queue.currentSong._id !== song._id) {
        newQueue = await createQueue({
          from: playlist._id,
          fromType: 'Playlist',
          random,
          songId: song?._id
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
      isPlaying && currentMusic?.playlist?._id === playlist?._id
    );
  }, [currentMusic, isPlaying]);

  return (
    <button
      onClick={handleClick}
      style={{
        display: isHovered ? 'block' : 'none'
      }}
    >
      {isPlayingPlaylist ? (
        <Pause className='w-4 h-4 text-white' />
      ) : (
        <Play className='w-4 h-4 text-white' />
      )}
    </button>
  );
}
