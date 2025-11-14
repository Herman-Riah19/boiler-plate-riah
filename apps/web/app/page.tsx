import { Badge } from "@repo/ui/components/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { GetAllPosts } from "@/services/postServices";

export default async function Home() {
  const posts = await GetAllPosts();

  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4">
      <Button variant="destructive">Delete</Button>
      <Button>Delete</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {posts && posts.map((post: any) => (
      <Card key={post.id} className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {post.content}
          </CardDescription>
        </CardContent>
      </Card>
        ))}
      </div>

      <Badge>salutation</Badge>
      
    </div>
  );
}
