import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { LOGIN_MESSAGE, UserInfo } from "../../Types/User/User";
import { RootState } from "../store";

export type UserInfoState = { value: ({ users: UserInfo[] } & { isLoggedIn: boolean, message: string, messageType: LOGIN_MESSAGE }) }

const initialState: UserInfoState = {
    value: {
        isLoggedIn: false,
        message: '',
        messageType: "INFO",
        users: [
            {
                userId: '',
                isPasswordProtected: false,
                isSelected: false,
                password: '',
                userName: ''
            }
        ]
    }
}

const UserSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        loadUsers(state: UserInfoState, action: PayloadAction<UserInfo[]>) {
            state.value.users = action.payload;
        },

        login(state: UserInfoState, action: PayloadAction<{ isLoggedIn: boolean, message: string, messageType: LOGIN_MESSAGE, userId: 'string' }>) {
            state.value.isLoggedIn = action.payload.isLoggedIn;
            state.value.message = action.payload.message;
            state.value.messageType = action.payload.messageType;

            state.value.users = state.value.users.map(x => {
                x.isSelected = x.userId === action.payload.userId;
                return x;
            }
            )
        },

        logout(state: UserInfoState) {
            state.value.users = state.value.users.map(x => {
                x.isSelected = false;
                return x;
            });
            state.value.isLoggedIn = false;
            state.value.message = '';
        }
    }
})

export const {loadUsers, login, logout} = UserSlice.actions;
export const selectUser = (state: RootState) => state.User.value;

export default UserSlice.reducer;