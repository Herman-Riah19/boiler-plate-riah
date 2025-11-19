import { Controller, Inject, Intercept } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { UserModel } from "prisma/generated/tsed/";
import { Get, Groups, Post, Returns, Summary } from "@tsed/schema";
import { UserCreateDto, UserLoginDto } from "src/validators/UserDto";
import { UserService } from "src/services/UserService";
import { UserInterceptor } from "src/interceptors/userInterceptor";

@Controller("/users")
export class UserController {
  constructor(@Inject() protected service: UserService) {}

  @Post("/")
  @Summary("Create a new user")
  @Returns(201, UserModel)
  async signupUser(
    @BodyParams() @Groups("creation") user: UserCreateDto
  ): Promise<UserModel> {
    return this.service.create({ data: user });
  }
  
  @Post("/login")
  @Summary("Login user")
  @Returns(201, UserModel)
  async signinUser(
    @BodyParams() @Groups("creation") user: UserLoginDto
  ): Promise<UserModel | null> {
    return this.service.login(user);
  }

  @Get("/")
  @Summary("Filter user by name or content")
  @(Returns(200, Array).Of(UserModel).Description("Return a list of User"))
  @Intercept(UserInterceptor)
  getAll() {
    return this.service.findMany();
  }
}
