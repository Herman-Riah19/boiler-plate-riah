import { Wallet } from "../client/index.js";
import { Allow, Description, Format, Groups, Integer, Property, Required } from "@tsed/schema";
import { OrganizationModel } from "./OrganizationModel.js";
import type { Relation } from "@tsed/core";

export class WalletModel implements Wallet {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Wallet unique identifier")
  id: string;

  @Property(String)
  @Required()
  organizationId: string;

  @Property(String)
  @Required()
  @Description("Blockchain address of the wallet")
  address: string;

  @Property(Number)
  @Integer()
  @Required()
  @Description("Chain ID for the wallet")
  chainId: number;

  @Property(String)
  @Allow(null)
  label: string | null;

  @Property(Boolean)
  @Required()
  isDefault: boolean;

  @Property(() => OrganizationModel)
  @Required()
  organization: Relation<OrganizationModel>;

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

