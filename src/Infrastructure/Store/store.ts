import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import User from './Slices/UserSlice';


export const store = configureStore({
    reducer: {
        User
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()]
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch