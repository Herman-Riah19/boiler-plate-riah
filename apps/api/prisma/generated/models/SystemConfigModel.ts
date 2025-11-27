import { SystemConfig } from "../client/index.js";
import { Description, Format, Groups, Property, Required } from "@tsed/schema";

export class SystemConfigModel implements SystemConfig {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("SystemConfig unique identifier")
  id: string;

  @Property(String)
  @Required()
  key: string;

  @Property(Object)
  @Required()
  value: any;

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

