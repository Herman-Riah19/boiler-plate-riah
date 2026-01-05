import { PipeMethods } from "@tsed/schema";
import {
  BlockchainTransactionModel,
  BlockchainTransactionsRepository,
} from "prisma/generated";
import { Inject, Injectable } from "@tsed/di";

@Injectable()
export class BlockchainPipe
  implements PipeMethods<string, Promise<BlockchainTransactionModel>>
{
  @Inject()
  protected blockService!: BlockchainTransactionsRepository;

  async transform(value: string): Promise<BlockchainTransactionModel> {
    const block = await this.blockService.findUnique({ where: { id: value } });
    if (!block) throw new Error(`Block with id ${value} not found`);
    return block;
  }
}
