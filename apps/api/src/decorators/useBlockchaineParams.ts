import { useDecorators } from "@tsed/core";
import { RawPathParams, UsePipe } from "@tsed/platform-params";
import { BlockchainPipe } from "src/pipes/BlockchainePipe";

export function UseBlockchainParams(expression: string): ParameterDecorator {
  return useDecorators(RawPathParams(expression), UsePipe(BlockchainPipe));
}
