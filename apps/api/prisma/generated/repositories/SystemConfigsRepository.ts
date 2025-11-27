import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, SystemConfig } from "../client/index.js";
import { SystemConfigModel } from "../models/index.js";

@Injectable()
export class SystemConfigsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.systemConfig
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | SystemConfig | SystemConfig[]): T {
    return deserialize<T>(obj, { type: SystemConfigModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.SystemConfigFindUniqueArgs): Promise<SystemConfigModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<SystemConfigModel | null>(obj);
  }

  async findFirst(args: Prisma.SystemConfigFindFirstArgs): Promise<SystemConfigModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<SystemConfigModel | null>(obj);
  }

  async findMany(args?: Prisma.SystemConfigFindManyArgs): Promise<SystemConfigModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<SystemConfigModel[]>(obj);
  }

  async create(args: Prisma.SystemConfigCreateArgs): Promise<SystemConfigModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<SystemConfigModel>(obj);
  }

  async update(args: Prisma.SystemConfigUpdateArgs): Promise<SystemConfigModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<SystemConfigModel>(obj);
  }

  async upsert(args: Prisma.SystemConfigUpsertArgs): Promise<SystemConfigModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<SystemConfigModel>(obj);
  }

  async delete(args: Prisma.SystemConfigDeleteArgs): Promise<SystemConfigModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<SystemConfigModel>(obj);
  }

  deleteMany(args: Prisma.SystemConfigDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.SystemConfigUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.SystemConfigAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
