import { Categorie } from "../client/index.js";
import { CollectionOf, Integer, Property, Required } from "@tsed/schema";
import { PostModel } from "./PostModel.js";

export class CategorieModel implements Categorie {
  @Property(Number)
  @Integer()
  @Required()
  id!: number;

  @Property(String)
  @Required()
  name!: string;

  @CollectionOf(() => PostModel)
  @Required()
  posts!: PostModel[];
}

