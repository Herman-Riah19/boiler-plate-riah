import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Organization } from "../client/index.js";
import { OrganizationModel } from "../models/index.js";

@Injectable()
export class OrganizationsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.organization
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Organization | Organization[]): T {
    return deserialize<T>(obj, { type: OrganizationModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.OrganizationFindUniqueArgs): Promise<OrganizationModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<OrganizationModel | null>(obj);
  }

  async findFirst(args: Prisma.OrganizationFindFirstArgs): Promise<OrganizationModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<OrganizationModel | null>(obj);
  }

  async findMany(args?: Prisma.OrganizationFindManyArgs): Promise<OrganizationModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<OrganizationModel[]>(obj);
  }

  async create(args: Prisma.OrganizationCreateArgs): Promise<OrganizationModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<OrganizationModel>(obj);
  }

  async update(args: Prisma.OrganizationUpdateArgs): Promise<OrganizationModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<OrganizationModel>(obj);
  }

  async upsert(args: Prisma.OrganizationUpsertArgs): Promise<OrganizationModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<OrganizationModel>(obj);
  }

  async delete(args: Prisma.OrganizationDeleteArgs): Promise<OrganizationModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<OrganizationModel>(obj);
  }

  deleteMany(args: Prisma.OrganizationDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.OrganizationUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.OrganizationAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
