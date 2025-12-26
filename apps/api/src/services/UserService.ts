import { Prisma } from "@prisma/client";
import { UsersRepository } from "prisma/generated";
import { UserModel } from "prisma/generated";
import { ErrorMsg } from "@tsed/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Injectable, Intercept } from "@tsed/di";
import { UserLoginDto } from "src/validators/UserDto";
import { UserInterceptor } from "src/interceptors/userInterceptor";

@Injectable()
export class UserService extends UsersRepository {
  
  @Intercept(UserInterceptor)
  async create(args: Prisma.UserCreateArgs): Promise<UserModel> {
    const data = args.data;
    const existUser = await this.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) throw ErrorMsg({ error: "User already exist" });

    let password = "";
    if (data.password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(data.password, salt);
    }

    const obj = await this.collection.create({
      data: {
        email: data.email,
        name: data.name,
        password: password,
      },
    });
    return this.deserialize<UserModel>(obj);
  }

  @Intercept(UserInterceptor)
  async login(auth: UserLoginDto) {
    const existUser = await this.findUnique({
      where: {
        email: auth.email
      }
    });

    if(!existUser) throw ErrorMsg({ error: "User not found"});
    if(!existUser.password) throw ErrorMsg({ error: "Password not found"});

    const isPasswordValid = await this.isPasswordValid(auth.password, existUser.password);

    if(!isPasswordValid) throw ErrorMsg({ error: "Invalid Password"});

    const user = await this.findUnique({
      where: {
        email: auth.email
      }
    });

    const deserializedUser = this.deserialize<UserModel>(user!);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: deserializedUser.id,
        email: deserializedUser.email,
        role: deserializedUser.role
      },
      process.env.JWT_SECRET || "default-secret-key",
      { expiresIn: "24h" }
    );

    return {
      user: deserializedUser,
      token
    };
  }

  private async isPasswordValid(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
