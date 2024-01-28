const API_ENDPOINT = 'https://spotify-clone-api-eight.vercel.app/api'

export const createQueue = async ({ from, fromType, random, songId }) => {
    try {
      const body = {
        from,
        fromType,
        random,
      }
      let queue;

      if(songId){
      const response = await fetch(`${API_ENDPOINT}/queue?song=${songId}`, {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
      }).then(res => res.json())
      queue = response.data
      } else {
      const response = await fetch(`${API_ENDPOINT}/queue`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body)
        }).then(res => res.json())
      queue = response.data
      }
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setNextSong = async ({ id, random }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/queue/next-song/${id}?random=${random}`, {
        method: "PUT"        
      }).then(res => res.json())
      const queue = response.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setPrevSong = async ({ id }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/queue/prev-song/${id}`, {
        method: "PUT"        }).then(res => res.json())
      const queue = response.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setRandomQueue = async ({ id }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/queue/random/${id}`, {
        method: 'PUT',
      }).then(res => res.json())
        const queue = response.updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };