import {
  Allow,
  Description,
  Enum,
  Integer,
  Property,
  Required,
} from "@tsed/schema";
import { ContractStatus } from "prisma/generated";

export class ContractDto {
  @Property(String)
  @Required()
  title!: string;

  @Property(String)
  @Description("Contract description")
  description!: string | null;

  @Required()
  @Enum(ContractStatus)
  status!: ContractStatus;

  @Property(String)
  @Required()
  @Description("Contract content (JSON with variables)")
  content!: string;

  @Property(Number)
  @Integer()
  @Required()
  version!: number;

  @Property(Number)
  @Integer()
  @Allow(null)
  @Description("Blockchain chain id for deployment")
  @Required()
  chainId!: number | null;

  @Property(String)
  @Allow(null)
  @Description("Deployed smart contract address")
  @Required()
  smartContractAddress!: string | null;

  @Property(String)
  @Allow(null)
  @Description("Generated smart contract code (Solidity)")
  @Required()
  smartContractCode!: string | null;

  @Property(String)
  @Allow(null)
  @Required()
  deploymentTxHash!: string | null;

  @Property(Number)
  @Allow(null)
  @Required()
  gasEstimate!: number | null;

  @Property(String)
  @Allow(null)
  @Required()
  gasCost!: string | null;

  @Property(Number)
  @Integer()
  @Required()
  requiredSigners!: number;

  @Required()
  organizationId!: string;
}
