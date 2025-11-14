import { Min, MinLength, Required } from "@tsed/schema";

export class CreateCategorieDto {
  @Required()
  @MinLength(3)
  name!: string;
}

export class UpdateCategorieDto {
    @MinLength(3)
    name!: string;
}