import { useDecorators } from "@tsed/core";
import { Use } from "@tsed/platform-middlewares";
import { CustomAuthMiddleware } from "../middlewares/userMiddleware";

export interface AuthOptions {
  role?: string;
}

export function UseAuth(options: AuthOptions = {}): MethodDecorator & ClassDecorator {
  return useDecorators(
    Use(CustomAuthMiddleware, options)
  );
}
