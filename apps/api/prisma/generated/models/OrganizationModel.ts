import { Organization } from "../client/index.js";
import { Allow, CollectionOf, Description, Format, Groups, Property, Required } from "@tsed/schema";
import { MemberModel } from "./MemberModel.js";
import { ContractModel } from "./ContractModel.js";
import { ContractTemplateModel } from "./ContractTemplateModel.js";
import { WalletModel } from "./WalletModel.js";
import { AuditLogModel } from "./AuditLogModel.js";

export class OrganizationModel implements Organization {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Organization unique identifier")
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Allow(null)
  @Description("URL or key of the organization logo")
  logo: string | null;

  @Property(String)
  @Allow(null)
  description: string | null;

  @CollectionOf(() => MemberModel)
  @Required()
  members: MemberModel[];

  @CollectionOf(() => ContractModel)
  @Required()
  contracts: ContractModel[];

  @CollectionOf(() => ContractTemplateModel)
  @Required()
  templates: ContractTemplateModel[];

  @CollectionOf(() => WalletModel)
  @Required()
  wallets: WalletModel[];

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

  @Property(String)
  @Required()
  slug: string;
}

