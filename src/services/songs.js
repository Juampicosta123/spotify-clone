const API_ENDPOINT = 'https://spotify-clone-api-eight.vercel.app/api'

export const getSongs = async ({ searchQuery = '', page = 1, limit = 4 }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/song?search=${searchQuery}&page=${page}&limit=${limit}`).then(res => res.json())
      const songs = response.data
      return songs;
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  };

  export const getSong = async ({ id }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/song/${id}`).then(res => res.json())
      const song = response.data
      return song;
    } catch (error) {
      console.error('Error fetching song:', error);
      return [];
    }
  };