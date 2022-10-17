import { IServiceProvider } from "./IServiceProvider";
import { IUserService } from "./User/IUserService";
import { UserService } from "./User/UserService";

export class ServiceProvider implements IServiceProvider{
    public readonly UserService: IUserService;
   
    
    constructor() {
        this.UserService = new UserService();
        
    }
    

}