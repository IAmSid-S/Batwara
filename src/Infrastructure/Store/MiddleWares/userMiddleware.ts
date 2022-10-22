import { Action, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { IServiceProvider } from "../../Services/IServiceProvider"
import { addUser, editUser, loadUsers, login, performLogin, removeUser, selectUser } from "../Slices/UserSlice"
import { AppDispatch, RootState } from "../store"

export const userMiddleware =

    (serviceProvider: IServiceProvider): Middleware =>
        ({ getState }: MiddlewareAPI) =>
            (next: AppDispatch) =>
                async (action: Action) => {
                    console.log('UserMiddleWare')
                    const currentState: RootState = getState()
                    if (currentState.User.value.isUserLoaded === false) {
                        debugger;
                        next(loadUsers(await serviceProvider.UserService.loadUsersFromMemory()));
                    }

                    if (performLogin.match(action)) {
    
                        let isVerified = await serviceProvider.UserService.verifyUser(action.payload.userId, action.payload.password);
                        if (isVerified)
                            next(login({ isLoggedIn: true, message: 'Success', messageType: "INFO", userId: action.payload.userId }));
                        else {
                            next(login({ isLoggedIn: false, message: 'Failure to validate', messageType: "ERROR", userId: '' }));
                        }
                    }

                    if (addUser.match(action)) {
                        await serviceProvider.UserService.addUserInMemory(action.payload.user);
                        next(loadUsers(await serviceProvider.UserService.loadUsersFromMemory()));
                    }

                    if (removeUser.match(action)) {
                        await serviceProvider.UserService.removeUserFromMemory(action.payload.userId);
                        next(loadUsers(await serviceProvider.UserService.loadUsersFromMemory()));
                    }

                    if (editUser.match(action)) {
                        await serviceProvider.UserService.removeUserFromMemory(action.payload.user.userId);
                        await serviceProvider.UserService.addUserInMemory(action.payload.user);
                        next(loadUsers(await serviceProvider.UserService.loadUsersFromMemory()));
                    }

                    // Put all checks before this line, below line will block all actions unless user is logged in.
                    if (currentState.User.value.isLoggedIn || selectUser.match(action)) {
                        return next(action);
                    }
                }