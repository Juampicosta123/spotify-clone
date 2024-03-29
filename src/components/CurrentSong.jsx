export const CurrentSong = ({ title, artists, imagelink }) => {

  const artistsString = artists?.join(', ');
  return (
    <div
      className={`hidden sm:flex playlist-item relative overflow-hidden items-center gap-5 rounded-md`}
    >
      <picture className='size-12 md:size-16 flex-none'>
        {!imagelink ? (
          <div className='bg-zinc-700 size-full'></div>
        ) : (
          <img
            src={imagelink}
            alt={`Cover of ${title} by ${artistsString}`}
            className='object-cover size-full rounded-md hover:scale-105'
          />
        )}
      </picture>

      <div className='flex flex-auto flex-col w-full'>
        <a
          aria-label='Reproduce una canción!'
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
