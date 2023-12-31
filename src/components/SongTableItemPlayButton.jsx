import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';

export function SongTableItemPlayButton({ id, size = 'small', isHovered }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState(
    isPlaying && currentMusic?.playlist?.id === id
  );

  const handleClick = () => {
    setIsPlayingPlaylist((prevIsPlayingPlaylist) => {
      if (prevIsPlayingPlaylist) {
        setIsPlaying(false);
        return false;
      }

      fetch(`/api/get-song.json?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          const { song } = data;
          setIsPlaying(true);
          setCurrentMusic({ songs: null, playlist: null, song });
        })
        .catch((error) => {
          console.error('Error fetching song:', error);
        });

      return true;
    });
  };

  useEffect(() => {
    setIsPlayingPlaylist(isPlaying && currentMusic?.playlist?.id === id);
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
