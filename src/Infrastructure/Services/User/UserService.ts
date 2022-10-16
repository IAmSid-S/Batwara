import { UserInfo } from "../../Types/User/User";
import { IUserService } from "./IUserService";
import { getData, removeKey, storeData } from "./LocalStorage";

export class UserService implements IUserService {
    async loadUsersFromMemory(): Promise<UserInfo[]> {
        let userIdList = await getData<string[]>('USERLIST', '');
        if (userIdList === null)
            return [];

        let userInfoList: UserInfo[] = [];

        for (let userId of userIdList) {
            let userInfo = await getData<UserInfo>('USERINFO', userId);

            if (userInfo === null) {
                await removeKey('USERLIST', userId);
                continue;
            }

            userInfoList.push(userInfo)
        }

        return userInfoList;
    }
    async addUserInMemory(userInfo: UserInfo): Promise<boolean> {
        let userIDs = await getData<string[]>('USERLIST', '');
        if(userIDs === null)
            userIDs = [];

        if(userIDs?.includes(userInfo.userId)){
            return false;
        }

        if(await storeData('USERLIST', '', [...userIDs, userInfo.userId])){
            return await storeData('USERINFO', userInfo.userId, userInfo); 
        }
        return false;
    }
    async removeUserFromMemory(userId: string): Promise<boolean> {
        let userList = await getData<string[]>('USERLIST', '');

        if(userList === null){
            return false;
        }

        await storeData('USERLIST', '', userList.filter(x => x !== userId));
        return await removeKey('USERINFO', userId);
    }
    async verifyUser(userId: string, password: string): Promise<boolean> {
        let user = await getData<UserInfo>('USERINFO', userId);

        if(user === null)
            return false;

        return user.password === password;
    }

}