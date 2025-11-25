import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put, Returns } from "@tsed/schema";
import { PostModel, PostsRepository } from "prisma/generated/tsed";
import { CreatePostDto, UpdatePostDto } from "src/validators/PostDto";

@Controller("/posts")
export class PostController {
  constructor(@Inject() private postService: PostsRepository) {}

  @Get("/")
  @Returns(201, PostModel)
  getAllPost() {
    return this.postService.findMany();
  }

  @Get("/:id")
  async getPostById(@PathParams("id") id: string): Promise<PostModel | null> {
    return this.postService.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post("/")
  @Returns(201, PostModel)
  async createNewPost(
    @BodyParams()
    data: CreatePostDto
  ): Promise<PostModel> {
    return await this.postService.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: {
            email: data.authorEmail,
          },
        },
        categorie: {
          connect: {
            name: data.categorie,
          },
        },
      },
    });
  }

  @Put("/:id")
  @Returns(200, PostModel)
  async updatePost(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: UpdatePostDto
  ): Promise<PostModel> {
    return this.postService.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: {
            email: data.authorEmail,
          },
        },
        categorie: {
          connect: {
            name: data.categorie,
          },
        },
      },
    });
  }

  @Delete("/:id")
  async deletePost(@PathParams("id") id: string): Promise<PostModel> {
    return this.postService.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
