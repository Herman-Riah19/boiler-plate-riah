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
  ContractTemplateModel,
  ContractTemplatesRepository,
} from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { ContractTemplateDto } from "src/validators/ContractTemplateDto";

@Controller("/contract-templates")
@Docs("api-docs")
export class ContractTemplateController {
  constructor(
    @Inject() private contractTemplateService: ContractTemplatesRepository,
  ) {}

  @Get("/")
  @(Returns(200, Array).Of(ContractTemplateModel))
  @Title("Get All Contract Templates")
  @Summary("Retrieve all contract templates")
  @Description("This endpoint returns a list of all contract templates.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllContractTemplates() {
    return this.contractTemplateService.findMany({
      include: {
        organization: true,
      },
    });
  }

  @Get("/:id")
  @Returns(200, ContractTemplateModel)
  @Title("Get Contract Template by ID")
  @Summary("Retrieve a contract template by its ID")
  @Description(
    "This endpoint returns a contract template based on the provided ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getContractTemplateById(
    @PathParams("id") id: string,
  ): Promise<ContractTemplateModel | null> {
    return this.contractTemplateService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, ContractTemplateModel)
  @Title("Create Contract Template")
  @Summary("Create a new contract template")
  @Description(
    "This endpoint creates a new contract template with the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createContractTemplate(
    @BodyParams() data: ContractTemplateDto,
  ): Promise<ContractTemplateModel> {
    return await this.contractTemplateService.create({
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
        category: data.category,
        organizationId: data.organizationId,
      },
    });
  }

  @Put("/:id")
  @Returns(200, ContractTemplateModel)
  @Title("Update Contract Template")
  @Summary("Update an existing contract template")
  @Description(
    "This endpoint updates a contract template based on the provided ID and data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateContractTemplate(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: ContractTemplateDto,
  ): Promise<ContractTemplateModel> {
    return this.contractTemplateService.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, ContractTemplateModel)
  @Title("Delete Contract Template")
  @Summary("Delete a contract template by ID")
  @Description(
    "This endpoint deletes a contract template based on the provided ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteContractTemplate(
    @PathParams("id") id: string,
  ): Promise<ContractTemplateModel> {
    return this.contractTemplateService.delete({
      where: {
        id: id,
      },
    });
  }
}
