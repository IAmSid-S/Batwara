export interface UserInfo {
    userId: string,
    userName: string,
    isPasswordProtected: boolean,
    password: string,  
    isSelected: boolean  
}
export type LOGIN_MESSAGE = 'ERROR' | 'INFO' | 'WARNING'

export type LOCALSTORAGE_USER_KEYS = 'USERINFO' | 'USERLIST'