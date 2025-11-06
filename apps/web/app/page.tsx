"use client"

import { Badge } from "@repo/ui/components/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex gap-4">
      <Button variant="destructive">Delete</Button>
      <Button>Delete</Button>
      </div>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sed dignissimos optio quidem voluptatem et nam in vero fuga harum corrupti eaque, consequatur iure temporibus voluptate! Necessitatibus, inventore obcaecati. Enim.
          </CardDescription>
        </CardContent>
      </Card>

      <Badge>salutation</Badge>
      
    </div>
  );
}
