import {
  Interceptor,
  InterceptorContext,
  InterceptorMethods,
  InterceptorNext
} from "@tsed/di";
import { Logger } from "@tsed/logger";

@Interceptor()
export class UserInterceptor implements InterceptorMethods {
  constructor(private logger: Logger) {}

  async intercept(context: InterceptorContext<any>, next: InterceptorNext) {
    const result = await next();

    this.logger.info("Sanitizing user output");

    return this.sanitize(result);
  }

  /**
   * Remove password from any returned object / array
   */
  private sanitize(data: any): any {
    if (!data) return data;

    // If array => sanitize each element
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item));
    }

    // If object => remove password and sanitize nested objects
    if (typeof data === "object") {
      const clone: any = { ...data };

      // remove password
      if ("password" in clone) {
        delete clone.password;
      }

      // sanitize nested objects
      for (const key of Object.keys(clone)) {
        const value = clone[key];

        if (typeof value === "object") {
          clone[key] = this.sanitize(value);
        }
      }

      return clone;
    }

    return data;
  }
}
