import { Controller, Inject } from "@tsed/di";
import { UseAuth } from "@tsed/platform-middlewares";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
  Delete,
  Get,
  Groups,
  Post,
  Put,
  Returns,
  Title,
  Summary,
  Description,
} from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import {
  TemplateVersionModel,
  TemplateVersionsRepository,
} from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { TemplateVersionDto } from "src/validators/TemplateVersionDto";

@Controller("/templates")
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
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllTemplate() {
    return this.templateVersionService.findMany({
      include: {
        template: true,
      },
    });
  }

  @Get("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Get Template Version by ID")
  @Summary("Retrieve a template version by its ID")
  @Description(
    "This endpoint returns a specific template version based on the provided ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getTemplateById(
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
  @Description(
    "This endpoint creates a new template version with the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createTemplateVersion(
    @BodyParams() data: TemplateVersionDto,
  ): Promise<TemplateVersionModel> {
    return await this.templateVersionService.create({
      data: {
        version: data.version,
        content: data.content,
        templateId: data.templateId,
        changelog: data.changelog,
      },
    });
  }

  @Put("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Update Template Version")
  @Summary("Update an existing template version")
  @Description(
    "This endpoint updates a template version based on the provided ID and data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateTemplate(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: TemplateVersionDto,
  ): Promise<TemplateVersionModel> {
    return this.templateVersionService.update({
      where: {
        id: id,
      },
      data: {
        version: data.version,
        content: data.content,
        changelog: data.changelog,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Delete Template Version")
  @Summary("Delete a template version by ID")
  @Description(
    "This endpoint deletes a specific template version based on the provided ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteTemplate(
    @PathParams("id") id: string,
  ): Promise<TemplateVersionModel> {
    return this.templateVersionService.delete({
      where: {
        id: id,
      },
    });
  }

  // Get all template versions for a template
  @Get("/:templateId/versions")
  @(Returns(200, Array).Of(TemplateVersionModel))
  @Title("Get All Versions for a Template")
  @Summary("Retrieve all versions for a specific template")
  @Description(
    "This endpoint returns a list of all versions for the specified template.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getTemplate(
    @PathParams("templateId") templateId: string,
  ): Promise<TemplateVersionModel[]> {
    return this.templateVersionService.findMany({
      where: {
        templateId: templateId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Create a template version for a specific template
  @Post("/:templateId/versions")
  @Returns(201, TemplateVersionModel)
  @Title("Create Template Version for a Template")
  @Summary("Create a new template version for a specific template")
  @Description(
    "This endpoint creates a new template version for the template with the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createTemplateVersionForTemplate(
    @PathParams("templateId") templateId: string,
    @BodyParams() data: TemplateVersionDto,
  ): Promise<TemplateVersionModel> {
    return await this.templateVersionService.create({
      data: {
        version: data.version,
        content: data.content,
        templateId: templateId,
        changelog: data.changelog,
      },
    });
  }

  // Get all template versions (global)
  @Get("/versions")
  @(Returns(200, Array).Of(TemplateVersionModel))
  @Title("Get All Template Versions (Global)")
  @Summary("Retrieve all template versions")
  @Description(
    "This endpoint returns a list of all template versions in the system.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllTemplateVersions() {
    return this.templateVersionService.findMany();
  }

  @Get("/versions/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Get Template Version by ID")
  @Summary("Retrieve a template version by its ID")
  @Description(
    "This endpoint returns a specific template version based on the provided ID.",
  )
  async getTemplateVersionById(
    @PathParams("id") id: string,
  ): Promise<TemplateVersionModel | null> {
    return this.templateVersionService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Put("/versions/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Update Template Version")
  @Summary("Update an existing template version")
  @Description(
    "This endpoint updates a template version based on the provided ID and data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateTemplateVersion(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: TemplateVersionDto,
  ): Promise<TemplateVersionModel> {
    return this.templateVersionService.update({
      where: {
        id: id,
      },
      data: {
        version: data.version,
        content: data.content,
        changelog: data.changelog,
      },
    });
  }

  @Delete("/versions/:id")
  @Returns(200, TemplateVersionModel)
  @Title("Delete Template Version")
  @Summary("Delete a template version by ID")
  @Description(
    "This endpoint deletes a specific template version based on the provided ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
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
