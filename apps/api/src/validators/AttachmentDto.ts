import {
  Description,
  Integer,
  Property,
  Required,
} from "@tsed/schema";

export class AttachmentDto {
  @Property(String)
  @Required()
  @Description("Name of the attached file")
  filename!: string;

  @Property(String)
  @Required()
  @Description("Storage URL for the file (Supabase/S3)")
  fileUrl!: string;

  @Property(Number)
  @Integer()
  @Required()
  @Description("Size of the file in bytes")
  size!: number;

  @Property(String)
  @Required()
  @Description("MIME type of the file")
  mimeType!: string;

  @Property(String)
  @Required()
  @Description("Contract ID this attachment belongs to")
  contractId!: string;
}
