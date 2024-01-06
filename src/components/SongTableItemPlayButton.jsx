import { Pause } from '../icons/Pause';
import { Play } from '../icons/Play';

export function SongTableItemPlayButton({ isHovered, isPlayingItem }) {
  return (
    <div
      style={{
        display: isHovered ? 'block' : 'none'
      }}
    >
      {isPlayingItem ? (
        <Pause className='w-4 h-4 text-white' />
      ) : (
        <Play className='w-4 h-4 text-white' />
      )}
    </div>
  );
}
