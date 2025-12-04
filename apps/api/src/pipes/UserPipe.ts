import { Inject, Injectable } from "@tsed/di";
import { JsonParameterStore, PipeMethods } from "@tsed/schema";
import {NotFound} from "@tsed/exceptions";
import { UserModel } from "prisma/generated";
import { UserService } from "src/services/UserService";

@Injectable()
export class UserPipe implements PipeMethods<string, Promise<UserModel>> {
    @Inject()
    protected userService!: UserService;
    
    async transform(id: string, metadata: JsonParameterStore): Promise<UserModel> {
        const user = await this.userService.findUnique({
            where: {
                id: id,
            },
        });

        if(!user) {
            throw new NotFound(`User with id ${id} not found`);
        }

        return user;
    }
}
