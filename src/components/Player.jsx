import { usePlayerStore } from '../store/playerStore';
import { useRef, useEffect, useState } from 'react';
import { Pause } from '../icons/Pause';
import { BackSong } from '../icons/BackSong';
import { Play } from '../icons/Play';
import { NextSong } from '../icons/NextSong';
// import { RandomPlayButton } from './RandomPlayButton';
import { SongControl } from '../components/SongControl.jsx';
import { CurrentSong } from '../components/CurrentSong';
import { VolumeControl } from '../components/VolumeControl';
import { setNextSong, setPrevSong } from '../services/queue';

export function Player() {
  const {
    isPlaying,
    setIsPlaying,
    volume,
    queue,
    setQueue,
    random,
    setVolume
  } = usePlayerStore((state) => state);
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    //const storedQueue = localStorage.getItem('queue');
    const volume = JSON.parse(localStorage.getItem('volume'));

    //const currentQueue = storedQueue === 'undefined' ? undefined : JSON.parse(storedQueue);

    // setQueue(currentQueue);
    setVolume(volume);
  }, []);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playPrevSong = async () => {
    if (queue?.firstSong) return;
    const queueData = await setPrevSong({ id: queue?._id });
    setIsPlaying(true);
    setQueue(queueData);
    //localStorage.setItem('queue', JSON.stringify(queueData));
  };

  const playNextSong = async () => {
    if (queue?.finished) return setQueue(null);
    const queueData = await setNextSong({ id: queue?._id, random });
    setIsPlaying(true);
    setQueue(queueData);
    //localStorage.setItem('queue', JSON.stringify(queueData));
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef?.current?.currentTime);
  };

  useEffect(() => {
    const handleCurrentTime = async () => {
      if (currentTime + 0.1 >= parseInt(queue?.currentSong?.duration)) {
        const songs = queue?.songs;
        const song = queue?.song;
        const playlistSongsIds = songs?.map(({ _id }) => _id);
        const songIndex = playlistSongsIds?.indexOf(song?._id);

        if (songIndex === playlistSongsIds?.length - 1)
          return setIsPlaying(false);

        const queueData = await setNextSong({ id: queue._id });

        setQueue(queueData);
        setIsPlaying(true);
        //localStorage.setItem('queue', JSON.stringify(queueData));
      }
    };
    handleCurrentTime();
  }, [currentTime]);

  useEffect(() => {
    const currentSong = queue?.currentSong;
    if (currentSong) {
      const src = currentSong.medialink;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [queue]);

  const handleClick = () => {
    if (!queue?.currentSong) return;
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='player w-full p-1 z-50 mt-2 sm:mt-0'>
      <div className='w-full flex items-center'>
        <CurrentSong
          {...queue?.currentSong}
          albumId={queue?.currentSong?.albumId}
        />
      </div>
      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center flex-col items-center'>
          <div className='flex gap-5 items-center'>
            <button
              aria-label='previos song'
              className=''
              onClick={playPrevSong}
            >
              <BackSong className='text-white/80 hover:text-white' />
            </button>
            <button
              aria-label='play or pause song'
              onClick={handleClick}
              className='bg-white rounded-full p-2'
            >
              {isPlaying ? (
                <Pause className='size-4 sm:size-5 text-black' />
              ) : (
                <Play className='size-4 sm:size-5 text-black' />
              )}
            </button>
            <button aria-label='next song' onClick={playNextSong}>
              <NextSong className='text-white/80 hover:text-white' />
            </button>
          </div>

          <SongControl audio={audioRef} />
        </div>
      </div>
      <VolumeControl />
      <audio ref={audioRef} />
    </div>
  );
}
