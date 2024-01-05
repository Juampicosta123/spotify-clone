export const createQueue = async ({ from, fromType, random, songId }) => {
    try {
      let queue;
      if(songId){
        const {data} = await fetch(`http://localhost:3000/api/queue?song=${songId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            from, 
            fromType,
            random
            })
      })
        .then((res) => res.json())
      queue = data
      } else {
        const {data} = await fetch(`http://localhost:3000/api/queue`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            from, 
            fromType,
            random
            })
      })
        .then((res) => res.json())
      queue = data
      }
      
      return queue;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  };

  export const setNextSong = async ({ id, random }) => {
    try {
      const { updated } = await fetch(`http://localhost:3000/api/queue/next-song/${id}?random=${random}`, {
        method: 'PUT',
      })
        .then((res) => res.json())
      const queue = updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setPrevSong = async ({ id }) => {
    try {
      const { updated } = await fetch(`http://localhost:3000/api/queue/prev-song/${id}`, {
        method: 'PUT',
      })
        .then((res) => res.json())
      const queue = updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };

  export const setRandomQueue = async ({ id }) => {
    try {
      const { updated } = await fetch(`http://localhost:3000/api/queue/random/${id}`, {
        method: 'PUT',
      })
        .then((res) => res.json())
      const queue = updated
      return queue;
    } catch (error) {
      console.error('Error fetching queue:', error);
      return [];
    }
  };