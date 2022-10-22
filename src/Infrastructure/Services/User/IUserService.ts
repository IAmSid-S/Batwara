import { UserInfo } from "../../Types/User/User";

export interface IUserService{
    loadUsersFromMemory(): Promise<UserInfo[]>;
    addUserInMemory(userInfo: UserInfo): Promise<boolean>;
    removeUserFromMemory(userId: string): Promise<boolean>;
    verifyUser(userId: string, password: string): Promise<boolean>;
    selectUser(userID: string): Promise<boolean>;
}