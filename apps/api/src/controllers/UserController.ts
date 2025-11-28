import { Controller, Inject, Intercept } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { UserModel } from "prisma/generated";
import { Get, Groups, Post, Returns, Summary, Title, Description } from "@tsed/schema";
import { UserCreateDto, UserLoginDto } from "src/validators/UserDto";
import { UserService } from "src/services/UserService";
import { UserInterceptor } from "src/interceptors/userInterceptor";
import { Docs } from "@tsed/swagger";

@Controller("/users")
@Docs("api-docs")
export class UserController {
  constructor(@Inject() protected service: UserService) {}

  @Post("/")
  @Title("Create User")
  @Summary("Create a new user")
  @Description("This endpoint allows you to create a new user.")
  @Returns(201, UserModel)
  async signupUser(
    @BodyParams() @Groups("creation") user: UserCreateDto
  ): Promise<UserModel> {
    return this.service.create({ data: user });
  }
  
  @Post("/login")
  @Title("User Login")
  @Summary("Login user")
  @Description("This endpoint allows users to log in.")
  @Returns(201, UserModel)
  async signinUser(
    @BodyParams() @Groups("creation") user: UserLoginDto
  ): Promise<UserModel | null> {
    return this.service.login(user);
  }

  @Get("/")
  @Title("Get Users")
  @Summary("Filter user by name or content")
  @Description("This endpoint retrieves a list of users filtered by name or content.")
  @(Returns(200, Array).Of(UserModel).Description("Return a list of User"))
  @Intercept(UserInterceptor)
  getAll() {
    return this.service.findMany();
  }
}
