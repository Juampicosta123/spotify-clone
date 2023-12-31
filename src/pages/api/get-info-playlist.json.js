import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({params, request}){
    const {url} = request;
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')
    const random = urlObject.searchParams.get('random')
    let song;

    const playlist = allPlaylists.find(playlist => playlist.id === id)
    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)
    if(random=="true"){
        const indiceAleatorio = Math.floor(Math.random() * songs.length);
        song = songs[indiceAleatorio]
    } else {
        song = songs[0]
    }
    
    return new Response(JSON.stringify({playlist, songs, song}), {
     headers: {"content-type" : "application/json"}
    })
    
}
