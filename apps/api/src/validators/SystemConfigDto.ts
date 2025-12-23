import {
  Description,
  Property,
  Required,
} from "@tsed/schema";

export class SystemConfigDto {
  @Property(String)
  @Required()
  @Description("Configuration key")
  key!: string;

  @Property(Object)
  @Required()
  @Description("Configuration value (JSON)")
  value!: any;
}
