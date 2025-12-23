import {
  Allow,
  Description,
  Integer,
  Property,
  Required,
} from "@tsed/schema";

export class TemplateVersionDto {
  @Property(Number)
  @Integer()
  @Required()
  @Description("Version number of the template")
  version!: number;

  @Property(String)
  @Required()
  @Description("Version content")
  content!: string;

  @Property(String)
  @Required()
  @Description("Template ID this version belongs to")
  templateId!: string;

  @Property(String)
  @Allow(null)
  @Description("Optional changelog for this version")
  changelog!: string | null;
}
