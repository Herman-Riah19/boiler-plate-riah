"use client";
import React from "react";
import Link from "next/link";
import { Typography } from "@repo/ui/components/ui/typography";
import { Button } from "@repo/ui/components/ui/button";
import { CardFeature, FeatureProps } from "@/components/card/card-features";

const FeaturesData: FeatureProps[] = [
  {
    title: "Generate image",
    description: "Our primary service for text-to-image generation",
    link: "/midas/generate",
    image: "/image/image-1.png",
  },
  {
    title: "Change the image",
    description:
      "The change service is a specific version of inpainting that does not require a mask.",
    link: "/midas/generate/change",
    image: "/image/image_15.png",
  },
  {
    title: "Upscale the image",
    description:
      "Takes images between 64x64 and 1 megapixel and upscales them all the way to 4K resolution.",
    link: "/midas/generate/upscale",
    image: "/image/image_5.png",
  },
  {
    title: "Edit the image",
    description:
      'Intelligently modify images by filling in or replacing specified areas with new content based on the content of a "mask" image.',
    link: "/midas/generate/edit",
    image: "/image/image_6.png",
  },
  {
    title: "Sketching",
    description:
      "This service offers an ideal solution for design projects that require brainstorming and frequent iterations.",
    link: "/midas/generate/sketch",
    image: "/image/image_4.png",
  },
  {
    title: "Delete Background",
    description:
      "The Remove Background service accurately segments the foreground from an image and implements and removes the background.",
    link: "/midas/generate/remove-bg",
    image: "/image/bg-delete.png",
  },
  {
    title: "Structure",
    description:
      "This service excels in generating images by maintaining the structure of an input image, making it especially valuable for advanced content creation.",
    link: "/midas/generate/structure",
    image: "/image/image_7.png",
  },
];

export function Feature() {
  return (
    <div className="border-2 rounded-md m-2 bg-muted">
      <div className="w-full text-start">
        <Typography
          variant="h1"
          color="primary"
          className="uppercase m-7 bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
        >
          Title
        </Typography>
        <div className="flex">
          <Link href="/auth/login">
            <Button
              variant="default"
              className="text-lg font-normal uppercase rounded-[10vw] ml-[5vw] mt-[5vw] mr-[50vw]"
            >
              Started
            </Button>
          </Link>
          <Typography
            variant="h1"
            color="primary"
            className="uppercase bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text"
          >
            Midas
          </Typography>
        </div>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {FeaturesData.map((feat, index) => (
            <div key={index}>
              <CardFeature
                title={feat.title}
                description={feat.description}
                image={feat.image}
                link={feat.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
