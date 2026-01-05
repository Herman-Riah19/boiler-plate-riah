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
import { WalletModel, WalletsRepository } from "prisma/generated";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { WalletDto } from "src/validators/WalletDto";

@Controller("/wallets")
@Docs("api-docs")
export class WalletController {
  constructor(@Inject() private walletService: WalletsRepository) {}

  @Get("/")
  @(Returns(200, Array).Of(WalletModel))
  @Title("Get All Wallets")
  @Summary("Retrieve all wallets")
  @Description("This endpoint returns a list of all wallets.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  getAllWallets() {
    return this.walletService.findMany();
  }

  @Get("/:id")
  @Returns(200, WalletModel)
  @Title("Get Wallet by ID")
  @Summary("Retrieve a wallet by its ID")
  @Description("This endpoint returns a wallet based on the provided ID.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async getWalletById(
    @PathParams("id") id: string,
  ): Promise<WalletModel | null> {
    return this.walletService.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Post("/")
  @Returns(201, WalletModel)
  @Title("Create Wallet")
  @Summary("Create a new wallet")
  @Description("This endpoint creates a new wallet with the provided data.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async createWallet(@BodyParams() data: WalletDto): Promise<WalletModel> {
    return await this.walletService.create({
      data: {
        address: data.address,
        chainId: data.chainId,
        organizationId: data.organizationId,
      },
    });
  }

  @Put("/:id")
  @Returns(200, WalletModel)
  @Title("Update Wallet")
  @Summary("Update an existing wallet")
  @Description(
    "This endpoint updates a wallet based on the provided ID and data.",
  )
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async updateWallet(
    @PathParams("id") id: string,
    @BodyParams() @Groups("update") data: WalletDto,
  ): Promise<WalletModel> {
    return this.walletService.update({
      where: {
        id: id,
      },
      data: {
        address: data.address,
        chainId: data.chainId,
      },
    });
  }

  @Delete("/:id")
  @Returns(200, WalletModel)
  @Title("Delete Wallet")
  @Summary("Delete a wallet by ID")
  @Description("This endpoint deletes a wallet based on the provided ID.")
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  async deleteWallet(@PathParams("id") id: string): Promise<WalletModel> {
    return this.walletService.delete({
      where: {
        id: id,
      },
    });
  }
}
