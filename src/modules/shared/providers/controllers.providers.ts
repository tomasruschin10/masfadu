import { AuthModule } from "src/controllers/auth/auth.module";
import { RoleModule } from "src/controllers/role/role.module";
import { UserModule } from "src/controllers/user/user.module";

export const controllers = [
    AuthModule,
    UserModule,
    RoleModule
]