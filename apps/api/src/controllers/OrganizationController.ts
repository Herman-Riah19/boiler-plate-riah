import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put, Returns } from "@tsed/schema";
import { OrganizationModel, OrganizationsRepository } from "prisma/generated";

@Controller("/Organization")
export class OrganizationController {
  constructor(@Inject() private organizationService: OrganizationsRepository) {}

  @Get("/")
  @Returns(200, OrganizationModel)
  getAllOrganizations() {
    return this.organizationService.findMany();
  }

  @Get("/:id")
  async getOrganizationById(@PathParams("id") id: string): Promise<OrganizationModel | null> {
    return this.organizationService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, OrganizationModel)
  async createNewOrganization(
    @BodyParams() data: OrganizationModel
  ): Promise<OrganizationModel> {
    return await this.organizationService.create({
      data: {
        name: data.name,
        logo: data.logo,
        description: data.description,
        slug: data.slug,
      },
    });
  }

  @Put("/:id")
  @Returns(200, OrganizationModel)
  async updateOrganization(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: OrganizationModel
  ): Promise<OrganizationModel> {
    return this.organizationService.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        logo: data.logo,
        description: data.description,
        slug: data.slug,
      },
    });
  }

  @Delete("/:id")
  async deleteOrganization(@PathParams("id") id: string): Promise<OrganizationModel> {
    return this.organizationService.delete({
      where: {
        id: id,
      },
    });
  }
}
