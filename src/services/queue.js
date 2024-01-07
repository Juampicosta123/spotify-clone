import axios from "axios";

const API_ENDPOINT = 'http://localhost:3000/api'

export const createQueue = async ({ from, fromType, random, songId }) => {
    try {
      const body = {
        from,
        fromType,
        random,
      }
      let queue;

      if(songId){
      const {data} = await axios.post(`${API_ENDPOINT}/queue?song=${songId}`, body)
      queue = data.data
      } else {
      const {data} = await axios.post(`${API_ENDPOINT}/queue`, body)
      queue = data.data
      }
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setNextSong = async ({ id, random }) => {
    try {
      const { data } = await axios.put(`${API_ENDPOINT}/queue/next-song/${id}?random=${random}`)
      const queue = data.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setPrevSong = async ({ id }) => {
    try {
      const { data } = await axios.put(`${API_ENDPOINT}/queue/prev-song/${id}`)
      const queue = data.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setRandomQueue = async ({ id }) => {
    try {
      const { data } = await fetch(`${API_ENDPOINT}/queue/random/${id}`, {
        method: 'PUT',
      })
        const queue = data.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };