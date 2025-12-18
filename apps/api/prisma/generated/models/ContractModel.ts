import { Contract } from "../client/index.js";
import { Allow, CollectionOf, Description, Enum, Format, Groups, Integer, Property, Required } from "@tsed/schema";
import { ContractStatus } from "../enums/index.js";
import { ContractTemplateModel } from "./ContractTemplateModel.js";
import type { Relation } from "@tsed/core";
import { SignatureModel } from "./SignatureModel.js";
import { AttachmentModel } from "./AttachmentModel.js";
import { AuditLogModel } from "./AuditLogModel.js";
import { OrganizationModel } from "./OrganizationModel.js";

export class ContractModel implements Contract {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Contract unique identifier")
  id: string;

  @Property(String)
  @Required()
  organizationId: string;

  @Property(String)
  @Required()
  title: string;

  @Property(String)
  @Allow(null)
  @Description("Contract description")
  description: string | null;

  @Required()
  @Enum(ContractStatus)
  status: ContractStatus;

  @Property(String)
  @Allow(null)
  templateId: string | null;

  @Property(() => ContractTemplateModel)
  @Allow(null)
  template: Relation<ContractTemplateModel> | null;

  @Property(String)
  @Required()
  @Description("Contract content (JSON with variables)")
  content: string;

  @Property(Number)
  @Integer()
  @Required()
  version: number;

  @Property(Number)
  @Integer()
  @Allow(null)
  @Description("Blockchain chain id for deployment")
  chainId: number | null;

  @Property(String)
  @Allow(null)
  @Description("Deployed smart contract address")
  smartContractAddress: string | null;

  @Property(String)
  @Allow(null)
  @Description("Generated smart contract code (Solidity)")
  smartContractCode: string | null;

  @Property(String)
  @Allow(null)
  deploymentTxHash: string | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  gasEstimate: number | null;

  @Property(String)
  @Allow(null)
  gasCost: string | null;

  @Property(Number)
  @Integer()
  @Required()
  requiredSigners: number;

  @CollectionOf(() => SignatureModel)
  @Required()
  signatures: SignatureModel[];

  @Property(String)
  @Allow(null)
  executionCondition: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  executedAt: Date | null;

  @Property(String)
  @Allow(null)
  executionTxHash: string | null;

  @CollectionOf(() => AttachmentModel)
  @Required()
  attachments: AttachmentModel[];

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

  @Property(() => OrganizationModel)
  @Required()
  organization: Relation<OrganizationModel>;
}

