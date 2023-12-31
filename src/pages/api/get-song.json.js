import { songs } from "@/lib/data";

export async function GET({params, request}){
    const {url} = request;
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')

    const song = songs.find(song => song.id === parseInt(id, 10));
    console.log(song);

    return new Response(JSON.stringify({song}), {
     headers: {"content-type" : "application/json"}
    })
    
}
