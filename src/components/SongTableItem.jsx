import { usePlayerStore } from '@/store/playerStore';
import { SongInfo } from './SongInfo.jsx';
import { useEffect, useState } from 'react';
import { SongTableItemPlayButton } from './SongTableItemPlayButton.jsx';
import { formatTime } from '@/utils/formatTime.jsx';

export function SongTableItem({ song, index, playlist }) {
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isPlaying, queue } = usePlayerStore((state) => state);

  useEffect(() => {
    const currentSong = queue?.currentSong;
    if (isPlaying && currentSong?._id === song?._id) {
      setIsPlayingSong(true);
    } else {
      setIsPlayingSong(false);
    }
  }, [queue]);

  const playingSongClassName = isPlayingSong ? 'text-green-500' : '';

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='border-separate text-gray-400 border-spacing-0  text-sm hover:bg-white/10'
    >
      <td
        className={`${playingSongClassName} px-4 py-2 font-light rounded-tl-lg rounded-bl-lg`}
      >
        <span
          style={{
            display: isHovered ? 'none' : 'block'
          }}
        >
          {index + 1}
        </span>

        <SongTableItemPlayButton
          playlist={playlist}
          albumId={song?.albumId}
          isHovered={isHovered}
          song={song}
        />
      </td>
      <td className='px-4 py-2 font-light'>
        <SongInfo {...song} isPlayingSong={isPlayingSong} />
      </td>
      <td className='px-4 py-2 font-light'>{song?.album}</td>
      <td className='px-4 py-2 font-light rounded-tr-lg rounded-br-lg'>
        {formatTime (song?.duration)}
      </td>
    </tr>
  );
}
