export const getPlaylists = async ({ searchQuery = '' }) => {
    try {
      const playlists = await fetch(`http://localhost:3000/api/playlist?search=${searchQuery}`, {
        method: 'GET',
      })
        .then((res) => res.json())
      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  };

export const getPlaylist = async ({ id }) => {
    try {
      const playlist = await fetch(`http://localhost:3000/api/playlist/${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
  
      return playlist;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };



