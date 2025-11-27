import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, ContractTemplate } from "../client/index.js";
import { ContractTemplateModel } from "../models/index.js";

@Injectable()
export class ContractTemplatesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.contractTemplate
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | ContractTemplate | ContractTemplate[]): T {
    return deserialize<T>(obj, { type: ContractTemplateModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ContractTemplateFindUniqueArgs): Promise<ContractTemplateModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ContractTemplateModel | null>(obj);
  }

  async findFirst(args: Prisma.ContractTemplateFindFirstArgs): Promise<ContractTemplateModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ContractTemplateModel | null>(obj);
  }

  async findMany(args?: Prisma.ContractTemplateFindManyArgs): Promise<ContractTemplateModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ContractTemplateModel[]>(obj);
  }

  async create(args: Prisma.ContractTemplateCreateArgs): Promise<ContractTemplateModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ContractTemplateModel>(obj);
  }

  async update(args: Prisma.ContractTemplateUpdateArgs): Promise<ContractTemplateModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ContractTemplateModel>(obj);
  }

  async upsert(args: Prisma.ContractTemplateUpsertArgs): Promise<ContractTemplateModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ContractTemplateModel>(obj);
  }

  async delete(args: Prisma.ContractTemplateDeleteArgs): Promise<ContractTemplateModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ContractTemplateModel>(obj);
  }

  deleteMany(args: Prisma.ContractTemplateDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ContractTemplateUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ContractTemplateAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
