import { Controller, Inject } from "@tsed/di";
import { UseAuth } from "@tsed/platform-middlewares";
import { PathParams, BodyParams } from "@tsed/platform-params";
import {
  Delete,
  Get,
  Groups,
  Post,
  Put,
  Title,
  Summary,
  Description,
} from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { ContractModel, ContractsRepository } from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { ContractDto } from "src/validators/ContractDto";

@Controller("/contracts")
@Docs("api-docs")
export class ContractController {
  constructor(@Inject() private contractService: ContractsRepository) {}

  @Get("/")
  @Title("Get All Contracts")
  @Summary("Retrieve all contracts")
  @Description("Returns a list of all contracts in the system.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  get() {
    return this.contractService.findMany({
      include: {
        organization: true,
      },
    });
  }

  @Get("/:id")
  @Title("Get Contract by ID")
  @Summary("Retrieve a contract by its ID")
  @Description("Returns a single contract based on the provided ID.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getPostById(
    @PathParams("id") id: string,
  ): Promise<ContractModel | null> {
    return this.contractService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Title("Create New Contract")
  @Summary("Create a new contract")
  @Description("Creates a new contract with the provided details.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createNewPost(
    @BodyParams()
    contract: ContractDto,
  ): Promise<ContractModel> {
    return await this.contractService.create({
      data: {
        title: contract.title,
        description: contract.description,
        status: contract.status,
        content: contract.content,
        version: contract.version,
        chainId: contract.chainId,
        smartContractAddress: contract.smartContractAddress,
        smartContractCode: contract.smartContractCode,
        deploymentTxHash: contract.deploymentTxHash,
        gasEstimate: contract.gasEstimate,
        gasCost: contract.gasCost,
        requiredSigners: contract.requiredSigners,
        organization: {
          connect: { id: contract.organizationId },
        },
      },
    });
  }

  @Put("/:id")
  @Title("Update Contract")
  @Summary("Update an existing contract")
  @Description(
    "Updates the contract with the specified ID using the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updatePost(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") contract: ContractModel,
  ): Promise<ContractModel> {
    return this.contractService.update({
      where: {
        id: id,
      },
      data: {
        title: contract.title,
        description: contract.description,
        status: contract.status,
      },
    });
  }

  @Delete("/:id")
  @Title("Delete Contract")
  @Summary("Delete a contract by ID")
  @Description("Removes the contract with the specified ID from the system.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deletePost(@PathParams("id") id: string): Promise<ContractModel> {
    return this.contractService.delete({
      where: {
        id: id,
      },
    });
  }
}
