import { Controller, Inject, Intercept } from "@tsed/di";
import { UseAuth } from "@tsed/platform-middlewares";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
  Delete,
  Get,
  Groups,
  Post,
  Put,
  Returns,
  Title,
  Summary,
  Description,
} from "@tsed/schema";
import { Docs } from "@tsed/swagger";
import { AuditLogModel, AuditLogsRepository } from "prisma/generated";
import { UserInterceptor } from "src/interceptors/userInterceptor";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { AuditLogDto } from "src/validators/AuditLogDto";

@Controller("/audit-logs")
@Docs("api-docs")
export class AuditLogController {
  constructor(@Inject() private AuditLogService: AuditLogsRepository) {}

  @Get("/")
  @Title("Get All Audit Logs")
  @Summary("Retrieve all audit logs.")
  @Description("Returns a list of audit logs stored in the system.")
  @(Returns(200, Array).Of(AuditLogModel))
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  @Intercept(UserInterceptor)
  getAllAuditLogs() {
    return this.AuditLogService.findMany({
      include: {
        contract: true,
        user: true,
        organization: true,
      },
    });
  }

  @Get("/:id")
  @Title("Get Audit Log")
  @Summary("Retrieve an audit log by ID.")
  @Description(
    "Returns the audit log matching the provided ID or null if not found.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getAuditLogById(
    @PathParams("id") id: string,
  ): Promise<AuditLogModel | null> {
    return this.AuditLogService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Title("Create Audit Log")
  @Summary("Create a new audit log entry.")
  @Description("Creates and returns a new audit log record with provided data.")
  @Returns(201, AuditLogModel)
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createAuditLog(
    @BodyParams() data: AuditLogDto,
  ): Promise<AuditLogModel> {
    return await this.AuditLogService.create({
      data: {
        contractId: data.contractId,
        userId: data.userId,
        organizationId: data.organizationId,
        action: data.action,
        details: data.details ?? null,
      },
    });
  }

  @Put("/:id")
  @Title("Update Audit Log")
  @Summary("Update an existing audit log.")
  @Description(
    "Updates the audit log identified by ID with the provided fields and returns the updated record.",
  )
  @Returns(200, AuditLogModel)
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateAuditLog(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: AuditLogDto,
  ): Promise<AuditLogModel> {
    return this.AuditLogService.update({
      where: {
        id: id,
      },
      data: {
        contractId: data.contractId,
        userId: data.userId,
        organizationId: data.organizationId,
        action: data.action,
        details: data.details,
      },
    });
  }

  @Delete("/:id")
  @Title("Delete Audit Log")
  @Summary("Delete an audit log by ID.")
  @Description(
    "Deletes the audit log matching the provided ID and returns the deleted record.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteAuditLog(@PathParams("id") id: string): Promise<AuditLogModel> {
    return this.AuditLogService.delete({
      where: {
        id: id,
      },
    });
  }
}
