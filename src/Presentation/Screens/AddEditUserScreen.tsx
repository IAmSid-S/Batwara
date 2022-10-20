import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native"
import { useAppSelector } from "../../Infrastructure/Store/store";
import { UserInfo } from "../../Infrastructure/Types/User/User";
import LoginInfo from "../Components/User/LoginInfo";
import { LoginStackParamList } from "../Utils/Navigators/LoginNavigator";

export type AddEditFunctionality = 'Add' | 'Edit'

function AddEditUserScreen(props: NativeStackScreenProps<LoginStackParamList, 'Register' | 'EditUser'>) {
  const users = useAppSelector(state => state.User.value.users);
  const [errorMessage, setErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState({
    userId: '',
    isPasswordProtected: true,
    isSelected: false,
    password: '',
    userName: ''
  })
  const setUserName = (userName: string) => setCurrentUser(prev => ({ ...prev, userName }));
  const setPassword = (password: string) => setCurrentUser(prev => ({ ...prev, password }));
  const setisPasswordProtected = (isPasswordProtected: boolean) => setCurrentUser(prev => ({ ...prev, isPasswordProtected }));

  const ValidateInput = (): boolean => {
     return false;
  }

  const Submit = () => {
    
  }

  return (
    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 20 }}>
      <LoginInfo setPassword={setPassword}
        setUserName={setUserName}
        setisPasswordProtected={setisPasswordProtected}
        type={props.route.name === 'EditUser' ? 'Edit' : 'Register'}
        user={currentUser}
        errorMessage={errorMessage}></LoginInfo>

      <Button title={props.route.name === 'EditUser' ? 'Edit' : 'Register'} onPress={() => Submit()} disabled={ValidateInput()}></Button>
    </View>
  );
}

export default AddEditUserScreen