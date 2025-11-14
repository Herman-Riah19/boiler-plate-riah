import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService.js";
import { Prisma, Categorie } from "../client/index.js";
import { CategorieModel } from "../models/index.js";

@Injectable()
export class CategoriesRepository {
  @Inject()
  protected prisma!: PrismaService;

  get collection() {
    return this.prisma.categorie
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Categorie | Categorie[]): T {
    return deserialize<T>(obj, { type: CategorieModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.CategorieFindUniqueArgs): Promise<CategorieModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<CategorieModel | null>(obj);
  }

  async findFirst(args: Prisma.CategorieFindFirstArgs): Promise<CategorieModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<CategorieModel | null>(obj);
  }

  async findMany(args?: Prisma.CategorieFindManyArgs): Promise<CategorieModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<CategorieModel[]>(obj);
  }

  async create(args: Prisma.CategorieCreateArgs): Promise<CategorieModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<CategorieModel>(obj);
  }

  async update(args: Prisma.CategorieUpdateArgs): Promise<CategorieModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<CategorieModel>(obj);
  }

  async upsert(args: Prisma.CategorieUpsertArgs): Promise<CategorieModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<CategorieModel>(obj);
  }

  async delete(args: Prisma.CategorieDeleteArgs): Promise<CategorieModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<CategorieModel>(obj);
  }

  deleteMany(args: Prisma.CategorieDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.CategorieUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.CategorieAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
