import { Attachment } from "../client/index.js";
import { Description, Format, Groups, Integer, Property, Required } from "@tsed/schema";
import { ContractModel } from "./ContractModel.js";
import type { Relation } from "@tsed/core";

export class AttachmentModel implements Attachment {
  @Property(String)
  @Required()
  @Groups("!creation")
  @Description("Attachment unique identifier")
  id: string;

  @Property(String)
  @Required()
  contractId: string;

  @Property(String)
  @Required()
  filename: string;

  @Property(String)
  @Required()
  @Description("Storage URL for the file (Supabase/S3)")
  fileUrl: string;

  @Property(String)
  @Required()
  @Description("MIME type of the file")
  mimeType: string;

  @Property(Number)
  @Integer()
  @Required()
  size: number;

  @Property(() => ContractModel)
  @Required()
  contract: Relation<ContractModel>;

  @Property(Date)
  @Format("date-time")
  @Required()
  @Groups("!creation")
  @Description("Creation timestamp")
  createdAt: Date;
}

