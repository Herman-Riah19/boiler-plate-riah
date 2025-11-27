import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Signature } from "../client/index.js";
import { SignatureModel } from "../models/index.js";

@Injectable()
export class SignaturesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.signature
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Signature | Signature[]): T {
    return deserialize<T>(obj, { type: SignatureModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.SignatureFindUniqueArgs): Promise<SignatureModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<SignatureModel | null>(obj);
  }

  async findFirst(args: Prisma.SignatureFindFirstArgs): Promise<SignatureModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<SignatureModel | null>(obj);
  }

  async findMany(args?: Prisma.SignatureFindManyArgs): Promise<SignatureModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<SignatureModel[]>(obj);
  }

  async create(args: Prisma.SignatureCreateArgs): Promise<SignatureModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<SignatureModel>(obj);
  }

  async update(args: Prisma.SignatureUpdateArgs): Promise<SignatureModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<SignatureModel>(obj);
  }

  async upsert(args: Prisma.SignatureUpsertArgs): Promise<SignatureModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<SignatureModel>(obj);
  }

  async delete(args: Prisma.SignatureDeleteArgs): Promise<SignatureModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<SignatureModel>(obj);
  }

  deleteMany(args: Prisma.SignatureDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.SignatureUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.SignatureAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
