import { Controller, Inject } from "@tsed/di";
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
import { AttachmentModel, AttachmentsRepository } from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { AttachmentDto } from "src/validators/AttachmentDto";

@Controller("/attachments")
@Docs("api-docs")
export class AttachmentController {
  constructor(@Inject() private attachmentService: AttachmentsRepository) {}

  @Get("/")
  @Title("List Attachments")
  @Summary("Retrieve all attachments")
  @Description("Returns a list of all attachment records.")
  @(Returns(200, Array).Of(AttachmentModel))
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllAttachments() {
    return this.attachmentService.findMany();
  }

  @Get("/:id")
  @Title("Get Attachment")
  @Summary("Retrieve an attachment by ID")
  @Description(
    "Returns the attachment matching the provided ID, or null if not found.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getAttachmentById(
    @PathParams("id") id: string,
  ): Promise<AttachmentModel | null> {
    return this.attachmentService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Title("Create Attachment")
  @Summary("Create a new attachment")
  @Description("Creates a new attachment record with the provided data.")
  @Returns(201, AttachmentModel)
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createAttachment(
    @BodyParams() data: AttachmentDto,
  ): Promise<AttachmentModel> {
    return await this.attachmentService.create({
      data: {
        filename: data.filename,
        fileUrl: data.fileUrl,
        size: data.size,
        mimeType: data.mimeType,
        contractId: data.contractId,
      },
    });
  }

  @Put("/:id")
  @Title("Update Attachment")
  @Summary("Update an existing attachment")
  @Description(
    "Updates fields of an existing attachment specified by ID. Only provided fields will be updated.",
  )
  @Returns(200, AttachmentModel)
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateAttachment(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: AttachmentDto,
  ): Promise<AttachmentModel> {
    return this.attachmentService.update({
      where: {
        id: id,
      },
      data: {
        filename: data.filename,
        size: data.size,
        mimeType: data.mimeType,
      },
    });
  }

  @Delete("/:id")
  @Title("Delete Attachment")
  @Summary("Delete an attachment")
  @Description(
    "Deletes the attachment with the specified ID and returns the deleted record.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteAttachment(
    @PathParams("id") id: string,
  ): Promise<AttachmentModel> {
    return this.attachmentService.delete({
      where: {
        id: id,
      },
    });
  }
}
