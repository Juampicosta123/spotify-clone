export function SongInfo({ title, artists, isPlayingSong, imagelink }) {
  const playingSongClassName = isPlayingSong ? 'text-green-500' : 'text-white';

  const artistsString = artists?.join(', ');

  return (
    <div
      className={`playlist-item flex relative overflow-hidden items-center gap-4 rounded-md`}
    >
      <picture className='size-11 flex-none'>
        {!imagelink ? (
          <div className='bg-zinc-700 size-4' />
        ) : (
          <img
            src={imagelink}
            alt={`Cover of the song by ${artistsString}`}
            className='object-cover size-full rounded-md'
          />
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
}
