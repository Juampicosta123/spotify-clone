export const getAlbums = async ({ searchQuery = '' }) => {
    try {
      const {data} = await fetch(`http://localhost:3000/api/album?search=${searchQuery}`, {
        method: 'GET',
      })
        .then((res) => res.json())
      const albums = data
      return albums;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  };

  export const getAlbum = async ({ id }) => {
    try {
      const album = await fetch(`http://localhost:3000/api/album/${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
  
      return album;
    } catch (error) {
      console.error('Error fetching album:', error);
      return [];
    }
  };