import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, BlockchainTransaction } from "../client/index.js";
import { BlockchainTransactionModel } from "../models/index.js";

@Injectable()
export class BlockchainTransactionsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.blockchainTransaction
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | BlockchainTransaction | BlockchainTransaction[]): T {
    return deserialize<T>(obj, { type: BlockchainTransactionModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.BlockchainTransactionFindUniqueArgs): Promise<BlockchainTransactionModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<BlockchainTransactionModel | null>(obj);
  }

  async findFirst(args: Prisma.BlockchainTransactionFindFirstArgs): Promise<BlockchainTransactionModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<BlockchainTransactionModel | null>(obj);
  }

  async findMany(args?: Prisma.BlockchainTransactionFindManyArgs): Promise<BlockchainTransactionModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<BlockchainTransactionModel[]>(obj);
  }

  async create(args: Prisma.BlockchainTransactionCreateArgs): Promise<BlockchainTransactionModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<BlockchainTransactionModel>(obj);
  }

  async update(args: Prisma.BlockchainTransactionUpdateArgs): Promise<BlockchainTransactionModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<BlockchainTransactionModel>(obj);
  }

  async upsert(args: Prisma.BlockchainTransactionUpsertArgs): Promise<BlockchainTransactionModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<BlockchainTransactionModel>(obj);
  }

  async delete(args: Prisma.BlockchainTransactionDeleteArgs): Promise<BlockchainTransactionModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<BlockchainTransactionModel>(obj);
  }

  deleteMany(args: Prisma.BlockchainTransactionDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.BlockchainTransactionUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.BlockchainTransactionAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
