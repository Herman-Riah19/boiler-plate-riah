import { User } from "../client/index.js";
import { Allow, CollectionOf, Description, Email, Enum, Format, Groups, Property, Required } from "@tsed/schema";
import { Role } from "../enums/index.js";
import { MemberModel } from "./MemberModel.js";
import { SignatureModel } from "./SignatureModel.js";
import { AuditLogModel } from "./AuditLogModel.js";

export class UserModel implements User {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("User unique identifier")
  id: string;

  @Property(String)
  @Required()
  @Email()
  @Description("User email. This email must be unique!")
  email: string;

  @Property(String)
  @Allow(null)
  name: string | null;

  @Required()
  @Enum(Role)
  role: Role;

  @Property(String)
  @Allow(null)
  @Description("Hashed user password")
  @Groups("!read")
  password: string | null;

  @Property(String)
  @Allow(null)
  avatar: string | null;

  @CollectionOf(() => MemberModel)
  @Required()
  members: MemberModel[];

  @CollectionOf(() => SignatureModel)
  @Required()
  signatures: SignatureModel[];

  @CollectionOf(() => AuditLogModel)
  @Required()
  auditLogs: AuditLogModel[];

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

