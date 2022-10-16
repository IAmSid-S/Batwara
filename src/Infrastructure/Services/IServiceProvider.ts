import { IUserService } from "./User/IUserService";

export interface IServiceProvider {
    readonly UserService: IUserService
}