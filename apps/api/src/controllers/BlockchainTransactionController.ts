import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Get, Groups, Post, Put, Returns, Title, Summary, Description } from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import {
  BlockchainTransactionModel,
  BlockchainTransactionsRepository,
} from "prisma/generated";

@Controller("/blockchain-transactions")
@Docs("api-docs")
export class BlockchainTransactionController {
  constructor(
    @Inject()
    private blockchainTransactionService: BlockchainTransactionsRepository,
  ) {}

  @Get("/")
  @(Returns(200, Array).Of(BlockchainTransactionModel))
  @Title("Get All Blockchain Transactions")
  @Summary("Retrieve all blockchain transactions")
  @Description("This endpoint returns a list of all blockchain transactions.")
  getAllBlockchainTransactions() {
    return this.blockchainTransactionService.findMany();
  }

  @Get("/:id")
  @Returns(200, BlockchainTransactionModel)
  @Title("Get Blockchain Transaction by ID")
  @Summary("Retrieve a blockchain transaction by its ID")
  @Description("This endpoint returns a blockchain transaction for the given ID.")
  async getBlockchainTransactionById(
    @PathParams("id") id: string,
  ): Promise<BlockchainTransactionModel | null> {
    return this.blockchainTransactionService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, BlockchainTransactionModel)
  @Title("Create Blockchain Transaction")
  @Summary("Create a new blockchain transaction")
  @Description("This endpoint creates a new blockchain transaction with the provided data.")
  async createBlockchainTransaction(
    @BodyParams() data: BlockchainTransactionModel,
  ): Promise<BlockchainTransactionModel> {
    return await this.blockchainTransactionService.create({
      data: {
        txHash: data.txHash,
        from: data.from,
        to: data.to,
        gasUsed: data.gasUsed,
        chainId: data.chainId,
        blockNumber: data.blockNumber,
        contractId: data.contractId,
      },
    });
  }

  @Put("/:id")
  @Returns(200, BlockchainTransactionModel)
  @Title("Update Blockchain Transaction")
  @Summary("Update an existing blockchain transaction")
  @Description("This endpoint updates a blockchain transaction for the given ID with the provided data.")
  async updateBlockchainTransaction(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: BlockchainTransactionModel,
  ): Promise<BlockchainTransactionModel> {
    return this.blockchainTransactionService.update({
      where: {
        id: id,
      },
      data: {
        txHash: data.txHash,
        from: data.from,
        to: data.to,
        gasUsed: data.gasUsed,
        chainId: data.chainId,
        blockNumber: data.blockNumber,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, BlockchainTransactionModel)
  @Title("Delete Blockchain Transaction")
  @Summary("Delete a blockchain transaction by ID")
  @Description("This endpoint deletes a blockchain transaction for the given ID.")
  async deleteBlockchainTransaction(
    @PathParams("id") id: string,
  ): Promise<BlockchainTransactionModel> {
    return this.blockchainTransactionService.delete({
      where: {
        id: id,
      },
    });
  }
}
