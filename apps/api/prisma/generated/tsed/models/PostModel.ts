import { Post } from "../client/index.js";
import { Allow, Format, Integer, Property, Required } from "@tsed/schema";
import { UserModel } from "./UserModel.js";
import type { Relation } from "@tsed/core";
import { CategorieModel } from "./CategorieModel.js";

export class PostModel implements Post {
  @Property(Number)
  @Integer()
  @Required()
  id!: number;

  @Property(String)
  @Required()
  title!: string;

  @Property(String)
  @Allow(null)
  content!: string | null;

  @Property(Boolean)
  @Allow(null)
  published!: boolean | null;

  @Property(() => UserModel)
  @Allow(null)
  author!: Relation<UserModel> | null;

  @Property(String)
  @Allow(null)
  authorId!: string | null;

  @Property(() => CategorieModel)
  @Allow(null)
  categorie!: Relation<CategorieModel> | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  categorieId!: number | null;

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt!: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  updatedAt!: Date;
}

