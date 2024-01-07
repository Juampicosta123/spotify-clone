import { CardPlayButton } from './CardPlayButton.jsx';

export const PlaylistSquareCard = ({ album }) => {
  const { title, imagelink, artistOwner, _id: id } = album;

  return (
    <article className='group relative bg-zinc-800 shadow-lg hover:shadow-xl hover:bg-zinc-500/30 rounded-md ransi transition-all duration-100'>
      <div
        className='absolute right-4 bottom-20 translate-y-4
      transition-all duration-500 opacity-0
      group-hover:translate-y-0 group-hover:opacity-100
      z-10
    '
      >
        <CardPlayButton album={album} playlist={null} client:visible />
      </div>

      <a
        href={`/album/${id}`}
        className='playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col'
      >
        <picture className='aspect-square w-full h-auto flex-none'>
          <img
            src={imagelink}
            alt={`Cover of ${title} by ${artistOwner}`}
            className='object-cover w-full h-full rounded-md'
          />
        </picture>

        <div className='flex flex-auto flex-col px-2'>
          <h4 className='text-white text-md font-semibold truncate'>{title}</h4>

          <span className='text-sm text-gray-400 truncate font-light'>
            {artistOwner}
          </span>
        </div>
      </a>
    </article>
  );
};
