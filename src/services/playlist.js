import axios from "axios";

const API_ENDPOINT = 'https://localhost:3000/api'

export const getPlaylists = async ({ searchQuery = '' }) => {
    try {
      const {data} = await axios.get(`${API_ENDPOINT}/playlist?search=${searchQuery}`)
      const playlists = data.data
      return playlists;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  };

export const getPlaylist = async ({ id }) => {
    try {
      const {data} = await axios.get(`${API_ENDPOINT}/playlist/${id}`)
      const playlist = data.data
      return playlist;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };



