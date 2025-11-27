import { Signature } from "../client/index.js";
import { Allow, Description, Enum, Format, Groups, Property, Required } from "@tsed/schema";
import { SignatureStatus } from "../enums/index.js";
import { ContractModel } from "./ContractModel.js";
import type { Relation } from "@tsed/core";
import { UserModel } from "./UserModel.js";

export class SignatureModel implements Signature {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Signature unique identifier")
  id: string;

  @Property(String)
  @Required()
  contractId: string;

  @Property(String)
  @Required()
  userId: string;

  @Required()
  @Enum(SignatureStatus)
  status: SignatureStatus;

  @Property(String)
  @Allow(null)
  @Description("EIP-712 signature data")
  signatureData: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  signedAt: Date | null;

  @Property(() => ContractModel)
  @Required()
  contract: Relation<ContractModel>;

  @Property(() => UserModel)
  @Required()
  user: Relation<UserModel>;

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

