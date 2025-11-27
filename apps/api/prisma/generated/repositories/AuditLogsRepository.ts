import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, AuditLog } from "../client/index.js";
import { AuditLogModel } from "../models/index.js";

@Injectable()
export class AuditLogsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.auditLog
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | AuditLog | AuditLog[]): T {
    return deserialize<T>(obj, { type: AuditLogModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.AuditLogFindUniqueArgs): Promise<AuditLogModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AuditLogModel | null>(obj);
  }

  async findFirst(args: Prisma.AuditLogFindFirstArgs): Promise<AuditLogModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AuditLogModel | null>(obj);
  }

  async findMany(args?: Prisma.AuditLogFindManyArgs): Promise<AuditLogModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AuditLogModel[]>(obj);
  }

  async create(args: Prisma.AuditLogCreateArgs): Promise<AuditLogModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AuditLogModel>(obj);
  }

  async update(args: Prisma.AuditLogUpdateArgs): Promise<AuditLogModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AuditLogModel>(obj);
  }

  async upsert(args: Prisma.AuditLogUpsertArgs): Promise<AuditLogModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AuditLogModel>(obj);
  }

  async delete(args: Prisma.AuditLogDeleteArgs): Promise<AuditLogModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AuditLogModel>(obj);
  }

  deleteMany(args: Prisma.AuditLogDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.AuditLogUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.AuditLogAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
