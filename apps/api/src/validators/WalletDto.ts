import {
  Allow,
  Description,
  Integer,
  Property,
  Required,
} from "@tsed/schema";

export class WalletDto {
  @Property(String)
  @Required()
  @Description("Organization ID this wallet belongs to")
  organizationId!: string;

  @Property(String)
  @Required()
  @Description("Blockchain address of the wallet")
  address!: string;

  @Property(Number)
  @Integer()
  @Required()
  @Description("Chain ID for the wallet")
  chainId!: number;

  @Property(String)
  @Allow(null)
  @Description("Optional label for the wallet")
  label!: string | null;
}
