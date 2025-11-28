import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put, Returns, Title, Summary, Description } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import {
  TemplateVersionModel,
  TemplateVersionsRepository,
} from "prisma/generated";

@Controller("/template-versions")
@Docs("api-docs")
export class TemplateVersionController {
  constructor(
    @Inject() private templateVersionService: TemplateVersionsRepository,
  ) {}

  @Get("/")
  @(Returns(200, Array).Of(TemplateVersionModel))
  @Title("Get All Template Versions")
  @Summary("Retrieve all template versions")
  @Description("This endpoint returns a list of all template versions.")
  getAllTemplateVersions() {
    return this.templateVersionService.findMany();
  }

  @Get("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Get Template Version by ID")
  @Summary("Retrieve a template version by its ID")
  @Description("This endpoint returns a specific template version based on the provided ID.")
  async getTemplateVersionById(
    @PathParams("id") id: string,
  ): Promise<TemplateVersionModel | null> {
    return this.templateVersionService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, TemplateVersionModel)
  @Title("Create Template Version")
  @Summary("Create a new template version")
  @Description("This endpoint creates a new template version with the provided data.")
  async createTemplateVersion(
    @BodyParams() data: TemplateVersionModel,
  ): Promise<TemplateVersionModel> {
    return await this.templateVersionService.create({
      data: {
        version: data.version,
        content: data.content,
        templateId: data.templateId,
      },
    });
  }

  @Put("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Update Template Version")
  @Summary("Update an existing template version")
  @Description("This endpoint updates a template version based on the provided ID and data.")
  async updateTemplateVersion(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: TemplateVersionModel,
  ): Promise<TemplateVersionModel> {
    return this.templateVersionService.update({
      where: {
        id: id,
      },
      data: {
        version: data.version,
        content: data.content,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Delete Template Version")
  @Summary("Delete a template version by ID")
  @Description("This endpoint deletes a specific template version based on the provided ID.")
  async deleteTemplateVersion(
    @PathParams("id") id: string,
  ): Promise<TemplateVersionModel> {
    return this.templateVersionService.delete({
      where: {
        id: id,
      },
    });
  }
}
