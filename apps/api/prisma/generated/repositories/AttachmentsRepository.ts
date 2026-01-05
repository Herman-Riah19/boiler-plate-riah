import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Attachment } from "../client/index.js";
import { AttachmentModel } from "../models/index.js";

@Injectable()
export class AttachmentsRepository {
  @Inject()
  protected prisma!: PrismaService;

  get collection() {
    return this.prisma.attachment;
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection);
  }

  protected deserialize<T>(obj: null | Attachment | Attachment[]): T {
    return deserialize<T>(obj, {
      type: AttachmentModel,
      collectionType: isArray(obj) ? Array : undefined,
    });
  }

  async findUnique(
    args: Prisma.AttachmentFindUniqueArgs,
  ): Promise<AttachmentModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AttachmentModel | null>(obj);
  }

  async findFirst(
    args: Prisma.AttachmentFindFirstArgs,
  ): Promise<AttachmentModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AttachmentModel | null>(obj);
  }

  async findMany(
    args?: Prisma.AttachmentFindManyArgs,
  ): Promise<AttachmentModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AttachmentModel[]>(obj);
  }

  async create(args: Prisma.AttachmentCreateArgs): Promise<AttachmentModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AttachmentModel>(obj);
  }

  async update(args: Prisma.AttachmentUpdateArgs): Promise<AttachmentModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AttachmentModel>(obj);
  }

  async upsert(args: Prisma.AttachmentUpsertArgs): Promise<AttachmentModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AttachmentModel>(obj);
  }

  async delete(args: Prisma.AttachmentDeleteArgs): Promise<AttachmentModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AttachmentModel>(obj);
  }

  deleteMany(args: Prisma.AttachmentDeleteManyArgs) {
    return this.collection.deleteMany(args);
  }

  updateMany(args: Prisma.AttachmentUpdateManyArgs) {
    return this.collection.updateMany(args);
  }

  aggregate(args: Prisma.AttachmentAggregateArgs) {
    return this.collection.aggregate(args);
  }
}
