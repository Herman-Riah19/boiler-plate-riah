import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Member } from "../client/index.js";
import { MemberModel } from "../models/index.js";

@Injectable()
export class MembersRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.member
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Member | Member[]): T {
    return deserialize<T>(obj, { type: MemberModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.MemberFindUniqueArgs): Promise<MemberModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<MemberModel | null>(obj);
  }

  async findFirst(args: Prisma.MemberFindFirstArgs): Promise<MemberModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<MemberModel | null>(obj);
  }

  async findMany(args?: Prisma.MemberFindManyArgs): Promise<MemberModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<MemberModel[]>(obj);
  }

  async create(args: Prisma.MemberCreateArgs): Promise<MemberModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<MemberModel>(obj);
  }

  async update(args: Prisma.MemberUpdateArgs): Promise<MemberModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<MemberModel>(obj);
  }

  async upsert(args: Prisma.MemberUpsertArgs): Promise<MemberModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<MemberModel>(obj);
  }

  async delete(args: Prisma.MemberDeleteArgs): Promise<MemberModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<MemberModel>(obj);
  }

  deleteMany(args: Prisma.MemberDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.MemberUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.MemberAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
