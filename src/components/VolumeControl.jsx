import { Volume } from '../icons/Volume';
import { VolumeSilence } from '../icons/VolumeSilence';
import { usePlayerStore } from '../store/playerStore';
import { useEffect, useRef } from 'react';
import { Slider } from '../components/Slider';

export const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilenced = volume < 0.1;

  useEffect(() => {
    setVolume(1);
  }, []);

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className='hidden sm:flex justify-end gap-x-2 px-2 lg:px-8 text-white'>
      <button
        aria-label='silence volume'
        className='opacity-70 hover:opacity-100 transition'
        onClick={handleClickVolumen}
      >
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className='w-[80px] lg:w-[95px]'
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
          localStorage.setItem('volume', JSON.stringify(volumeValue));
        }}
      />
    </div>
  );
};
