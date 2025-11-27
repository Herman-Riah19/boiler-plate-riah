import { Controller, Inject } from "@tsed/di";
import { PathParams, BodyParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put } from "@tsed/schema";
import { ContractModel, ContractsRepository } from "prisma/generated";
import { ContractDto } from "src/validators/ContractDto";

@Controller("/contracts")
export class ContractController {
  constructor(@Inject() private contractService: ContractsRepository) {}

  @Get("/")
  get() {
    return this.contractService.findMany();
  }

  @Get("/:id")
  async getPostById(
    @PathParams("id") id: string
  ): Promise<ContractModel | null> {
    return this.contractService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  async createNewPost(
    @BodyParams()
    contract: ContractDto
  ): Promise<ContractModel> {
    return await this.contractService.create({
      data: {
        title: contract.title,
        description: contract.description,
        status: contract.status,
        content: contract.content,
        variables: contract.variables,
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
  async updatePost(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") contract: ContractModel
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
  async deletePost(@PathParams("id") id: string): Promise<ContractModel> {
    return this.contractService.delete({
      where: {
        id: id,
      },
    });
  }
}
