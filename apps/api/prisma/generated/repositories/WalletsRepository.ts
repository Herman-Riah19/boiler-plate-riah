import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Wallet } from "../client/index.js";
import { WalletModel } from "../models/index.js";

@Injectable()
export class WalletsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.wallet
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Wallet | Wallet[]): T {
    return deserialize<T>(obj, { type: WalletModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.WalletFindUniqueArgs): Promise<WalletModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<WalletModel | null>(obj);
  }

  async findFirst(args: Prisma.WalletFindFirstArgs): Promise<WalletModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<WalletModel | null>(obj);
  }

  async findMany(args?: Prisma.WalletFindManyArgs): Promise<WalletModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<WalletModel[]>(obj);
  }

  async create(args: Prisma.WalletCreateArgs): Promise<WalletModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<WalletModel>(obj);
  }

  async update(args: Prisma.WalletUpdateArgs): Promise<WalletModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<WalletModel>(obj);
  }

  async upsert(args: Prisma.WalletUpsertArgs): Promise<WalletModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<WalletModel>(obj);
  }

  async delete(args: Prisma.WalletDeleteArgs): Promise<WalletModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<WalletModel>(obj);
  }

  deleteMany(args: Prisma.WalletDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.WalletUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.WalletAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
