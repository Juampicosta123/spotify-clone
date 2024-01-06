import { CardPlayButton } from './CardPlayButton.jsx';

export const PlaylistHorizontalCard = ({ playlist }) => {
  const { title, imagelink, artists, _id: id } = playlist;

  const artistsString = artists.join(', ');

  return (
    <article className='group relative shadow-lg hover:shadow-xl bg-zinc-800 hover:bg-zinc-700 rounded-md ransi transition-all duration-100 ease-in-out'>
      <div
        className='absolute right-4 bottom-2
  transition-all duration-500 opacity-0
  group-hover:translate-y-0 group-hover:opacity-100
  z-10'
      >
        <CardPlayButton album={null} playlist={playlist} client:visible />
      </div>
      <a
        href={`/playlist/${id}`}
        className='flex relative overflow-hidden items-center gap-5 rounded-md'
        transition:name={`playlist ${id} horizontal box`}
      >
        <picture className='size-16 flex-none'>
          <img
            src={imagelink}
            alt={`Cover of ${title} by ${artistsString}`}
            className='object-cover size-full'
            transition:name={`playlist ${id} image horizontal`}
          />
        </picture>

        <h4
          className='text-white font-semibold truncate'
          transition:name={`playlist ${id} title horizontal`}
        >
          {title}
        </h4>
      </a>
    </article>
  );
};
