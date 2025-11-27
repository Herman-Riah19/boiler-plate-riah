import { TemplateVersion } from "../client/index.js";
import { Allow, Description, Format, Groups, Integer, Property, Required } from "@tsed/schema";
import { ContractTemplateModel } from "./ContractTemplateModel.js";
import type { Relation } from "@tsed/core";

export class TemplateVersionModel implements TemplateVersion {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("TemplateVersion unique identifier")
  id: string;

  @Property(String)
  @Required()
  templateId: string;

  @Property(Number)
  @Integer()
  @Required()
  version: number;

  @Property(String)
  @Required()
  @Description("Version content")
  content: string;

  @Property(String)
  @Allow(null)
  changelog: string | null;

  @Property(() => ContractTemplateModel)
  @Required()
  template: Relation<ContractTemplateModel>;

  @Property(Date)
  @Format("date-time")
  @Required()
  @Groups("!creation")
  @Description("Creation timestamp")
  createdAt: Date;
}

