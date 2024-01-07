import { Time } from '../icons/Time.jsx';
import { SongTableItem } from './SongTableItem.jsx';

export function SongsTable({ playlist, album }) {
  const item = playlist ? playlist : album;
  const songs = item?.songs;
  const albumm = album ? album : null;
  const playlistt = playlist ? playlist : null;
  return (
    <table className='table-auto text-left min-w-full divide-y divide-gray-500/20'>
      <thead className=''>
        <tr className='text-zinc-400 text-sm font-light'>
          <th className='px-2 sm:px-6 py-2 font-light w-1'>#</th>
          <th className='px-2 sm:px-4 py-2 font-light'>Título</th>
          <th className='hidden sm:block px-4 py-2 font-light'>Álbum</th>
          <th className='px-2 sm:px-4 py-2 font-light'>
            <Time />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className='h-[12px] hidden sm:block'></tr>
        {songs?.map((song, index) => (
          <SongTableItem
            album={albumm}
            playlist={playlistt}
            client:load
            key={song?._id}
            index={index}
            song={song}
          />
        ))}
      </tbody>
    </table>
  );
}
