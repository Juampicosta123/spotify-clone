const API_ENDPOINT = 'https://spotify-clone-api-eight.vercel.app/api'

export const getAlbums = async ({ searchQuery = '' }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/album?search=${searchQuery}`).then(res => res.json())
      const albums = response.data
      return albums;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  };

  export const getAlbum = async ({ id }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/album/${id}`).then(res => res.json())
      const album = response.data
      return album;
    } catch (error) {
      console.error('Error fetching album:', error);
      return [];
    }
  };