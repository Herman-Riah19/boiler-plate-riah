import { Min, MinLength, Required } from "@tsed/schema";

export class CreatePostDto {
  @Required()
  @MinLength(3)
  title!: string;

  @Required()
  @MinLength(10)
  content!: string;

  @Required()
  @Min(3)
  authorEmail!: string;

  @Required()
  categorie!: string;
}

export class UpdatePostDto {
    @MinLength(3)
    title!: string;

    @MinLength(10)
    content!: string;

    @MinLength(3)
    authorEmail!: string;

    categorie!: string;
}