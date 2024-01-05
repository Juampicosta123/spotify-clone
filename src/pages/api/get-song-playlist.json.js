import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({params, request}){
    const {url} = request;
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')
    const playlistId = urlObject.searchParams.get('playlist-id')
    const playlist = allPlaylists?.filter(playlist => playlist.id === playlistId)[0]

    const songs = allSongs.filter(song => song.albumId === playlist?.albumId)



    const song = songs.find(song => song.id === parseInt(id, 10));

    return new Response(JSON.stringify({song, playlist, songs}), {
     headers: {"content-type" : "application/json"}
    })
    
}
