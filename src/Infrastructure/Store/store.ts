import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { ServiceProvider } from "../Services/ServiceProvider";
import { CreateMiddlewareWithServiceProvider } from "../Utility/MiddlewareFactory";
import User from './Slices/UserSlice';

const middleWareArray = CreateMiddlewareWithServiceProvider(new ServiceProvider());
export const store = configureStore({
    reducer: {
        User
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleWareArray)
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector