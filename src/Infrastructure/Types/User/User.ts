export interface UserInfo {
    userId: string,
    userName: string,
    isPasswordProtected: boolean,
    password: string,  
    isSelected: boolean  
}
export type LOGIN_MESSAGE = 'ERROR' | 'INFO' | 'WARNING'