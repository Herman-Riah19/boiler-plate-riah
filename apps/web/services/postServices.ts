export class PostServices {
  static async getAllPosts() {
    const res = await fetch(`${process.env.API_URL}/api/posts`);

    return res.json();
  }

  static async getPostById(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/posts/${id}`);
    return res.json();
  }
}
