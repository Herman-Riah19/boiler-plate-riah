import { AuditLog } from "../client/index.js";
import { Allow, Description, Enum, Format, Groups, Property, Required } from "@tsed/schema";
import { AuditAction } from "../enums/index.js";
import { ContractModel } from "./ContractModel.js";
import type { Relation } from "@tsed/core";
import { UserModel } from "./UserModel.js";
import { OrganizationModel } from "./OrganizationModel.js";

export class AuditLogModel implements AuditLog {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("AuditLog unique identifier")
  id: string;

  @Property(String)
  @Required()
  contractId: string;

  @Property(String)
  @Required()
  userId: string;

  @Property(String)
  @Required()
  organizationId: string;

  @Required()
  @Enum(AuditAction)
  action: AuditAction;

  @Property(Object)
  @Allow(null)
  details: any | null;

  @Property(() => ContractModel)
  @Required()
  contract: Relation<ContractModel>;

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
}

