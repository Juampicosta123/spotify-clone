const API_ENDPOINT = 'https://spotify-clone-api-eight.vercel.app/api'

export const getPlaylists = async ({ searchQuery = '' }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/playlist?search=${searchQuery}`).then(res => res.json())

      const playlists = response.data

      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  };

export const getPlaylist = async ({ id }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/playlist/${id}`).then(res => res.json())
      const playlist = response.data
      return playlist;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };



