import { SongTableItemPlayButton } from './SongTableItemPlayButton';

export const SongSearchInfo = ({
  title,
  artists,
  isPlayingSong,
  imagelink,
  isHovered,
  isPlayingItem
}) => {
  const playingSongClassName = isPlayingSong ? 'text-green-500' : 'text-white';

  const artistsString = artists?.join(', ');

  return (
    <div
      className={`playlist-item flex relative overflow-hidden items-center justify-between gap-4 rounded-md w-full`}
    >
      <picture className='size-11 flex-none relative -z-10'>
        {!imagelink ? (
          <div className='bg-zinc-700 size-4' />
        ) : (
          <>
            <img
              src={imagelink}
              alt={`Cover of the song by ${artistsString}`}
              className={
                isHovered
                  ? 'opacity-40 object-cover size-full rounded-md '
                  : `object-cover size-full rounded-md `
              }
            ></img>
            <SongTableItemPlayButton
              className='absolute z-10 top-0 left-0 right-0 bottom-0 m-auto'
              isHovered={isHovered}
              isPlayingItem={isPlayingItem}
              size={6}
            />
          </>
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <span
          className={` ${playingSongClassName} hover:underline text-sm w-max`}
        >
          {title}
        </span>
        <h5 className='text-gray-400 text-xs truncate w-max'>
          {artistsString}
        </h5>
      </div>
    </div>
  );
};
