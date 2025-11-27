import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, TemplateVersion } from "../client/index.js";
import { TemplateVersionModel } from "../models/index.js";

@Injectable()
export class TemplateVersionsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.templateVersion
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | TemplateVersion | TemplateVersion[]): T {
    return deserialize<T>(obj, { type: TemplateVersionModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.TemplateVersionFindUniqueArgs): Promise<TemplateVersionModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<TemplateVersionModel | null>(obj);
  }

  async findFirst(args: Prisma.TemplateVersionFindFirstArgs): Promise<TemplateVersionModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<TemplateVersionModel | null>(obj);
  }

  async findMany(args?: Prisma.TemplateVersionFindManyArgs): Promise<TemplateVersionModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<TemplateVersionModel[]>(obj);
  }

  async create(args: Prisma.TemplateVersionCreateArgs): Promise<TemplateVersionModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<TemplateVersionModel>(obj);
  }

  async update(args: Prisma.TemplateVersionUpdateArgs): Promise<TemplateVersionModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<TemplateVersionModel>(obj);
  }

  async upsert(args: Prisma.TemplateVersionUpsertArgs): Promise<TemplateVersionModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<TemplateVersionModel>(obj);
  }

  async delete(args: Prisma.TemplateVersionDeleteArgs): Promise<TemplateVersionModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<TemplateVersionModel>(obj);
  }

  deleteMany(args: Prisma.TemplateVersionDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.TemplateVersionUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.TemplateVersionAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
