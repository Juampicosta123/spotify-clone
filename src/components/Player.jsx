import { usePlayerStore } from '@/store/playerStore';
import { Slider } from '@/components/Slider';
import { useRef, useEffect, useState } from 'react';
import { Pause } from '@/icons/Pause';
import { Play } from '@/icons/Play';

export const VolumeSilence = () => (
  <svg
    width='16px'
    height='16px'
    fill='currentColor'
    role='presentation'
    aria-label='Volumen apagado'
    aria-hidden='true'
    viewBox='0 0 16 16'
  >
    <path d='M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z'></path>
    <path d='M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z'></path>
  </svg>
);

export const Volume = () => (
  <svg
    width='16px'
    height='16px'
    fill='currentColor'
    role='presentation'
    aria-label='Volumen alto'
    aria-hidden='true'
    viewBox='0 0 16 16'
  >
    <path d='M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z'></path>
    <path d='M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z'></path>
  </svg>
);

const CurrentSong = ({ image, title, artists }) => {
  const artistsString = artists?.join(', ');

  return (
    <div
      className={`playlist-item flex relative overflow-hidden items-center gap-5 rounded-md`}
    >
      <picture className='size-16 flex-none'>
        {!image ? (
          <div className='bg-zinc-700 size-full'></div>
        ) : (
          <img
            src={image}
            alt={`Cover of ${title} by ${artistsString}`}
            className='object-cover size-full rounded-md hover:scale-105'
          />
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <a
          href={`/song/${title}`}
          className='text-white hover:underline text-sm'
        >
          {!title ? 'Reproduce una canción!' : title}
        </a>
        <span className='text-gray-400 text-xs truncate hover:underline'>
          {artistsString}
        </span>
      </div>
    </div>
  );
};

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const duration = audio?.current?.duration ?? 0;

  const formatTime = (time) => {
    if (time == null) return '0:00';

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex gap-x-3 text-xs pt-2'>
      <span className='opacity-50 w-12 text-right'>
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        max={audio?.current?.duration ?? 0}
        min={0}
        value={[currentTime]}
        className='w-[500px] '
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          audio.current.currentTime = newCurrentTime;
        }}
      />
      <span className='opacity-50 w-12'>
        {duration ? formatTime(duration) : null}
      </span>
    </div>
  );
};

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilenced = volume < 0.1;

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className='flex justify-center gap-x-2 px-8 text-white'>
      <button
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
        className='w-[95px]'
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song } = currentMusic;
    if (song) {
      const src = `/music/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    if (!currentMusic.song) return;
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='flex flex-row justify-between w-full p-1 z-50'>
      <div className='w-[200px]'>
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center flex-col items-center'>
          <button onClick={handleClick} className='bg-white rounded-full p-2'>
            {isPlaying ? (
              <Pause className='w-5 h-5 text-black' />
            ) : (
              <Play className='w-5 h-5 text-black' />
            )}
          </button>
          <SongControl audio={audioRef} />
        </div>
      </div>
      <div className='grid place-content-center'></div>
      <VolumeControl />
      <audio ref={audioRef} />
    </div>
  );
}
