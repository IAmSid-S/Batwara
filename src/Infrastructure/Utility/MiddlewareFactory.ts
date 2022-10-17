import { Middleware } from "@reduxjs/toolkit";
import { IServiceProvider } from "../Services/IServiceProvider";
import { userMiddleware } from "../Store/MiddleWares/userMiddleware";

export function CreateMiddlewareWithServiceProvider(serviceProvider: IServiceProvider): Middleware[]{
    return [
        userMiddleware(serviceProvider),

    ];
}