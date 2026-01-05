import { UseAuth } from "@tsed/platform-middlewares";
import { Controller, Inject } from "@tsed/di";
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
import { SystemConfigModel, SystemConfigsRepository } from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { SystemConfigDto } from "src/validators/SystemConfigDto";

@Controller("/system-configs")
@Docs("api-docs")
export class SystemConfigController {
  constructor(@Inject() private systemConfigService: SystemConfigsRepository) {}

  @Get("/")
  @(Returns(200, Array).Of(SystemConfigModel))
  @Title("Get All System Configs")
  @Summary("Retrieve all system configurations")
  @Description("This endpoint returns a list of all system configurations.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllSystemConfigs() {
    return this.systemConfigService.findMany();
  }

  @Get("/:id")
  @Returns(200, SystemConfigModel)
  @Title("Get System Config by ID")
  @Summary("Retrieve a system configuration by its ID")
  @Description(
    "This endpoint returns a system configuration for the specified ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getSystemConfigById(
    @PathParams("id") id: string,
  ): Promise<SystemConfigModel | null> {
    return this.systemConfigService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, SystemConfigModel)
  @Title("Create System Config")
  @Summary("Create a new system configuration")
  @Description(
    "This endpoint creates a new system configuration with the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createSystemConfig(
    @BodyParams() data: SystemConfigDto,
  ): Promise<SystemConfigModel> {
    return await this.systemConfigService.create({
      data: {
        key: data.key,
        value: data.value,
      },
    });
  }

  @Put("/:id")
  @Returns(200, SystemConfigModel)
  @Title("Update System Config")
  @Summary("Update an existing system configuration")
  @Description(
    "This endpoint updates the system configuration for the specified ID with the provided data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateSystemConfig(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: SystemConfigDto,
  ): Promise<SystemConfigModel> {
    return this.systemConfigService.update({
      where: {
        id: id,
      },
      data: {
        key: data.key,
        value: data.value,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, SystemConfigModel)
  @Title("Delete System Config")
  @Summary("Delete a system configuration by ID")
  @Description(
    "This endpoint deletes the system configuration for the specified ID.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteSystemConfig(
    @PathParams("id") id: string,
  ): Promise<SystemConfigModel> {
    return this.systemConfigService.delete({
      where: {
        id: id,
      },
    });
  }
}
