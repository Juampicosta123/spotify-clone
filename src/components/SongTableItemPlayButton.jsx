import { Pause } from '../icons/Pause';
import { Play } from '../icons/Play';

export function SongTableItemPlayButton({
  isHovered,
  isPlayingItem,
  size = 4,
  className
}) {
  return (
    <div
      style={{
        display: isHovered ? 'block' : 'none'
      }}
    >
      {isPlayingItem ? (
        <Pause className={`size-${size} text-white ${className}`} />
      ) : (
        <Play className={`size-${size} text-white ${className}`} />
      )}
    </div>
  );
}
