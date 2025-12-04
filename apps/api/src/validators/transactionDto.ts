import { Property, Required, Integer, Allow } from "@tsed/schema";

export class CreateBlockchainTransactionDto {
  @Property(String)
  @Required()
  from!: string;

  @Property(String)
  @Allow(null)
  to!: string | null;

  @Property(Number)
  @Integer()
  @Required()
  value!: number;

  @Property(String)
  @Required()
  gasCost!: string;

  @Property(Number)
  @Required()
  gasUsed!: number;
}
