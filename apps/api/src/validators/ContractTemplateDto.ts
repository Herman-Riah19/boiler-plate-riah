import {
  Allow,
  Description,
  Property,
  Required,
} from "@tsed/schema";

export class ContractTemplateDto {
  @Property(String)
  @Required()
  @Description("Name of the contract template")
  name!: string;

  @Property(String)
  @Allow(null)
  @Description("Description of the contract template")
  description!: string | null;

  @Property(String)
  @Required()
  @Description("Category of the contract template")
  category!: string;

  @Property(String)
  @Required()
  @Description("Template content (HTML/JSON)")
  content!: string;

  @Property(String)
  @Required()
  @Description("Organization ID this template belongs to")
  organizationId!: string;
}
