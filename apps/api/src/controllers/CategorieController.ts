import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put } from "@tsed/schema";
import { CategorieModel, CategoriesRepository } from "prisma/generated/tsed";
import { CreateCategorieDto, UpdateCategorieDto } from "src/validators/CategorieDto";

@Controller("/categories")
export class HelloWorldController {
  constructor(@Inject() private categorieService: CategoriesRepository) {}

  @Get("/")
  get() {
    return this.categorieService.findMany();
  }

  @Get("/:id")
  async getPostById(
    @PathParams("id") id: string
  ): Promise<CategorieModel | null> {
    return this.categorieService.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  @Post("/")
  async createNewPost(
    @BodyParams()
    categorie: CreateCategorieDto
  ): Promise<CategorieModel> {
    return await this.categorieService.create({ data: categorie });
  }

  @Put("/:id")
  async updatePost(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") categorie: UpdateCategorieDto
  ): Promise<CategorieModel> {
    return this.categorieService.update({
      where: {
        id: Number(id),
      },
      data: categorie,
    });
  }

  @Delete("/:id")
  async deletePost(@PathParams("id") id: string): Promise<CategorieModel> {
    return this.categorieService.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
