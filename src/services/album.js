import axios from "axios";

const API_ENDPOINT = 'https://spotyclone-api.onrender.com/api'

export const getAlbums = async ({ searchQuery = '' }) => {
    try {
      const {data} = await axios.get(`${API_ENDPOINT}/album?search=${searchQuery}`)
      const albums = data.data
      return albums;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  };

  export const getAlbum = async ({ id }) => {
    try {
      const {data} = await axios.get(`${API_ENDPOINT}/album/${id}`)
      const album = data.data
      return album;
    } catch (error) {
      console.error('Error fetching album:', error);
      return [];
    }
  };