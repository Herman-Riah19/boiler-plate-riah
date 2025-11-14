import { User } from "../client/index.js";
import { Allow, CollectionOf, Description, Email, Groups, Property, Required } from "@tsed/schema";
import { PostModel } from "./PostModel.js";

export class UserModel implements User {
  @Property(String)
  @Required()
  @Groups("!creation")
  id!: string;

  @Property(String)
  @Required()
  @Email()
  @Description("User email. This email must be unique!")
  email!: string;

  @Property(String)
  @Allow(null)
  name!: string | null;

  @Property(String)
  @Allow(null)
  password!: string | null;

  @CollectionOf(() => PostModel)
  @Required()
  posts!: PostModel[];
}

