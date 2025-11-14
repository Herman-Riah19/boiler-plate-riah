export async function GetAllPosts(){
    const res = await fetch(`${process.env.API_URL}/api/posts`);

    return res.json()
}