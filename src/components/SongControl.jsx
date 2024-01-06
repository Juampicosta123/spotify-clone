import { useEffect, useState } from 'react';
import { Slider } from '@/components/Slider';
import { formatTime } from '../utils/formatTime';

export const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio?.current?.currentTime);
  };

  const duration = audio?.current?.duration ?? 0;


  return (
    <div className='flex gap-x-3 text-xs pt-2'>
      <span className='opacity-50 md:w-12 text-right'>
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className='w-[280px] sm:w-[200px] md:w-[350px] lg:w-[500px] '
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          audio.current.currentTime = newCurrentTime;
        }}
      />
      <span className='opacity-50 md:w-12'>
        {duration ? formatTime(duration) : null}
      </span>
    </div>
  );
};
