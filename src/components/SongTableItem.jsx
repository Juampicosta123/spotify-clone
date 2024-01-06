import { usePlayerStore } from '../store/playerStore';
import { SongInfo } from './SongInfo.jsx';
import { useEffect, useState } from 'react';
import { SongTableItemPlayButton } from './SongTableItemPlayButton.jsx';
import { formatTime } from '../utils/formatTime.jsx';
import { createQueue } from '../services/queue.js';

export function SongTableItem({ song, index, playlist, album }) {
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, setIsPlaying, random, queue, setQueue } = usePlayerStore(
    (state) => state
  );
  const item = playlist ? playlist : album;
  const itemType = playlist ? 'Playlist' : 'Album';
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
          from: item._id,
          fromType: itemType,
          random,
          songId: song?._id
        });
      } else if (queue.currentSong._id === song._id) {
        newQueue = queue;
      } else if (queue.currentSong._id !== song._id) {
        newQueue = await createQueue({
          from: item._id,
          fromType: itemType,
          random,
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

  useEffect(() => {
    if (queue?.currentSong?._id === song?._id) {
      setIsPlayingItem(!isPlayingItem);
    } else {
      setIsPlayingItem(false);
    }
  }, [queue, isPlaying]);

  const playingSongClassName = isPlayingSong ? 'text-green-500' : '';

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='border-separate text-gray-400 border-spacing-0  text-sm hover:bg-white/10'
      onClick={handleClick}
    >
      <td
        className={`${playingSongClassName} px-2 sm:px-4 py-2 font-light rounded-tl-lg rounded-bl-lg`}
      >
        <span
          style={{
            display: isHovered ? 'none' : 'block'
          }}
        >
          {index + 1}
        </span>

        <SongTableItemPlayButton
          isHovered={isHovered}
          isPlayingItem={isPlayingItem}
        />
      </td>
      <td className='px-2 sm:px-4 py-2 font-light'>
        <SongInfo {...song} isPlayingSong={isPlayingSong} />
      </td>
      <td className='hidden sm:block px-4 py-2 font-light'>{song?.album}</td>
      <td className='c sm:px-4 py-2 font-light rounded-tr-lg rounded-br-lg'>
        {formatTime(song?.duration)}
      </td>
    </tr>
  );
}
