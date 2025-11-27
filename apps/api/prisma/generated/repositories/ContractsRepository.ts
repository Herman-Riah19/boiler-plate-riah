import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Contract } from "../client/index.js";
import { ContractModel } from "../models/index.js";

@Injectable()
export class ContractsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.contract
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Contract | Contract[]): T {
    return deserialize<T>(obj, { type: ContractModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ContractFindUniqueArgs): Promise<ContractModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ContractModel | null>(obj);
  }

  async findFirst(args: Prisma.ContractFindFirstArgs): Promise<ContractModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ContractModel | null>(obj);
  }

  async findMany(args?: Prisma.ContractFindManyArgs): Promise<ContractModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ContractModel[]>(obj);
  }

  async create(args: Prisma.ContractCreateArgs): Promise<ContractModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ContractModel>(obj);
  }

  async update(args: Prisma.ContractUpdateArgs): Promise<ContractModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ContractModel>(obj);
  }

  async upsert(args: Prisma.ContractUpsertArgs): Promise<ContractModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ContractModel>(obj);
  }

  async delete(args: Prisma.ContractDeleteArgs): Promise<ContractModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ContractModel>(obj);
  }

  deleteMany(args: Prisma.ContractDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ContractUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ContractAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
