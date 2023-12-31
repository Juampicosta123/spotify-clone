import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';

export function CardPlayButton({ id, albumId, size = 'small' }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic, random } =
    usePlayerStore((state) => state);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(
    isPlaying && currentMusic?.song.albumId === albumId
  );

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    const randomParam = random ? true : false;
    fetch(`/api/get-info-playlist.json?id=${id}&random=${randomParam}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist, song } = data;

        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song });
      });
  };

  useEffect(() => {
    setIsPlayingPlaylist(isPlaying && currentMusic?.song.albumId === albumId);
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
