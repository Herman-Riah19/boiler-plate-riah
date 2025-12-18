import { ContractTemplate } from "../client/index.js";
import { Allow, CollectionOf, Description, Format, Groups, Property, Required } from "@tsed/schema";
import { ContractModel } from "./ContractModel.js";
import { TemplateVersionModel } from "./TemplateVersionModel.js";
import { OrganizationModel } from "./OrganizationModel.js";
import type { Relation } from "@tsed/core";

export class ContractTemplateModel implements ContractTemplate {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Template unique identifier")
  id: string;

  @Property(String)
  @Required()
  organizationId: string;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Allow(null)
  description: string | null;

  @Property(String)
  @Required()
  category: string;

  @Property(String)
  @Required()
  @Description("Template content (HTML/JSON)")
  content: string;

  @Property(Boolean)
  @Required()
  isPublic: boolean;

  @CollectionOf(() => ContractModel)
  @Required()
  contracts: ContractModel[];

  @CollectionOf(() => TemplateVersionModel)
  @Required()
  versions: TemplateVersionModel[];

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

