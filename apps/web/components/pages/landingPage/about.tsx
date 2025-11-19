import React from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@repo/ui/components/ui/card";
import { Typography } from "@repo/ui/components/ui/typography";
import { Button } from "@repo/ui/components/ui/button";

export function About() {
  return (
    <Card className="justify-center m-2">
      <CardHeader>
        <ul className="flex">
          <li className="p-2 border-r-2">
            <Typography
              variant="h2"
              color="secondary"
              className="capitalize bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
            >
              Generate
            </Typography>
          </li>
          <li className="p-2 border-r-2">
            <Typography
              variant="h2"
              color="secondary"
              className="capitalize bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
            >
              Change
            </Typography>
          </li>
          <li className="p-2 border-r-2">
            <Typography
              variant="h2"
              color="secondary"
              className="capitalize bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
            >
              Upscale
            </Typography>
          </li>
          <li className="p-2 border-r-2">
            <Typography
              variant="h2"
              color="secondary"
              className="capitalize bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
            >
              Structure
            </Typography>
          </li>
        </ul>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full">
            <Typography variant="h6" color="primary" className="text-justify">
              Midas Ai is the generative AI Image to enhance the groth of your creativity and you can access for more than ressource of the differentes image.
            </Typography>
            <Typography variant="h6" color="primary" className="text-justify">
              Powered by advanced artificial intelligence, our application offers an intuitive and creative experience, ideal for artists, designers, marketers, and all digital art enthusiasts.
            </Typography>
            <div className="mt-1 m-1">
              <Button variant="secondary" className="flex gap-4">
                Start
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div
            className="h-[30vw] w-full rounded-lg sm:hidden md:block"
            style={{
              background:
                "url('/image/galaxy.png') no-repeat top center / cover",
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
