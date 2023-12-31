import { usePlayerStore } from '@/store/playerStore';
import { SongInfo } from './SongInfo.jsx';
import { useEffect, useState } from 'react';
import { SongTableItemPlayButton } from './SongTableItemPlayButton.jsx';

export function SongTableItem({ song, index }) {
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isPlaying, currentMusic } = usePlayerStore((state) => state);

  useEffect(() => {
    const { song: currentSong } = currentMusic;

    if (isPlaying && currentSong?.id === song?.id) {
      setIsPlayingSong(true);
    }
  }, [currentMusic]);

  const playingSongClassName = isPlayingSong ? 'text-green-500' : '';

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='border-separate text-gray-400 border-spacing-0  text-sm hover:bg-white/10'
    >
      <td
        className={`${playingSongClassName} px-4 py-2 font-light rounded-tl-lg rounded-bl-lg w-1`}
      >
        <span
          style={{
            display: isHovered ? 'none' : 'block'
          }}
        >
          {index + 1}
        </span>

        <SongTableItemPlayButton isHovered={isHovered} id={song?.id} />
      </td>
      <td className='px-4 py-2 font-light'>
        <SongInfo client:load {...song} isPlayingSong={isPlayingSong} />
      </td>
      <td className='px-4 py-2 font-light'>{song?.album}</td>
      <td className='px-4 py-2 font-light rounded-tr-lg rounded-br-lg'>
        {song?.duration}
      </td>
    </tr>
  );
}
