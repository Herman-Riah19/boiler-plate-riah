import {
  Allow,
  Description,
  Enum,
  Property,
  Required,
} from "@tsed/schema";
import { AuditAction } from "prisma/generated";

export class AuditLogDto {
  @Property(String)
  @Required()
  @Description("Contract ID associated with the audit log")
  contractId!: string;

  @Property(String)
  @Required()
  @Description("User ID who performed the action")
  userId!: string;

  @Property(String)
  @Required()
  @Description("Organization ID where the action occurred")
  organizationId!: string;

  @Required()
  @Enum(AuditAction)
  @Description("Type of action performed")
  action!: AuditAction;

  @Property(Object)
  @Allow(null)
  @Description("Additional details about the action (JSON)")
  details!: any | null;
}
