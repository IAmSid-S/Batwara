import { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox, IconButton, TextInput } from "react-native-paper";
import { UserInfo } from "../../../Infrastructure/Types/User/User";

export interface LoginInfoProps {
    user: UserInfo | null,
    type: 'Register' | 'Login' | 'Edit',
    errorMessage: string,
    setUserName: (userName: string) => void,
    setPassword: (password: string) => void,
    setisPasswordProtected: (isPasswordProtected: boolean) => void

}
function LoginInfo(props: LoginInfoProps) {
    const expandUserList = () => {

    }
    return (
        <View style={{ flex: 0.5, alignContent: 'space-around', justifyContent: 'space-around', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                <TextInput style={{ width: 250, height: 50 }} label={'UserName'} value={props.user?.userName} onChangeText={text => props.setUserName(text)} disabled={props.type === 'Edit'} />
                {props.type !== 'Login'
                    ? ''
                    : <IconButton size={30} icon="account-arrow-down-outline" onPress={() => expandUserList()}></IconButton>
                }

            </View>
            {props.user?.isPasswordProtected ?
                <TextInput style={{ width: 250, height: 50, marginTop: 10 }} label={'Password'} secureTextEntry={true} keyboardType='number-pad' value={props.user?.password} onChangeText={text => props.setPassword(text)} />
                : <></>
            }
            <View style={{ width: '100%', height: 30, marginTop: 20, marginBottom: 10 }}>
                <Text style={{ color: 'red' }}>{props.errorMessage}</Text>
            </View>
            <View style={{ width: '100%', height: 30, marginTop: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox status={props.user?.isPasswordProtected ? 'checked' : 'unchecked'} onPress={() => props.setisPasswordProtected(!props.user?.isPasswordProtected)} disabled={props.type === 'Login'}></Checkbox>
                <Text>Password Needed</Text>
            </View>
        </View>
    )
}

export default LoginInfo