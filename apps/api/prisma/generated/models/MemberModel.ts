import { Member } from "../client/index.js";
import { Description, Enum, Format, Groups, Property, Required } from "@tsed/schema";
import { Role } from "../enums/index.js";
import { UserModel } from "./UserModel.js";
import type { Relation } from "@tsed/core";
import { OrganizationModel } from "./OrganizationModel.js";

export class MemberModel implements Member {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Member unique identifier")
  id: string;

  @Property(String)
  @Required()
  userId: string;

  @Property(String)
  @Required()
  organizationId: string;

  @Required()
  @Enum(Role)
  @Description("Role of the member within the organization")
  role: Role;

  @Property(() => UserModel)
  @Required()
  user: Relation<UserModel>;

  @Property(() => OrganizationModel)
  @Required()
  organization: Relation<OrganizationModel>;

  @Property(Date)
  @Format("date-time")
  @Required()
  @Groups("!creation")
  @Description("Creation timestamp")
  createdAt: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  @Groups("!creation")
  @Description("Last update timestamp")
  updatedAt: Date;
}

