import { BlockchainTransaction } from "../client/index.js";
import { Allow, Description, Enum, Format, Groups, Integer, Property, Required } from "@tsed/schema";
import { TxStatus } from "../enums/index.js";

export class BlockchainTransactionModel implements BlockchainTransaction {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("BlockchainTransaction unique identifier")
  id: string;

  @Property(String)
  @Allow(null)
  contractId: string | null;

  @Property(String)
  @Required()
  txHash: string;

  @Property(Number)
  @Integer()
  @Required()
  @Description("Chain ID where the transaction took place")
  chainId: number;

  @Property(String)
  @Required()
  from: string;

  @Property(String)
  @Allow(null)
  to: string | null;

  @Property(Number)
  @Allow(null)
  value: number | null;

  @Required()
  @Enum(TxStatus)
  status: TxStatus;

  @Property(Number)
  @Integer()
  @Allow(null)
  gasUsed: number | null;

  @Property(String)
  @Allow(null)
  gasCost: string | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  blockNumber: number | null;

  @Property(Number)
  @Integer()
  @Required()
  confirmations: number;

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

