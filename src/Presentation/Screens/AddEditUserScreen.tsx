import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native"
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../Infrastructure/Store/Slices/UserSlice";
import { AppDispatch, useAppSelector } from "../../Infrastructure/Store/store";
import { UserInfo } from "../../Infrastructure/Types/User/User";
import LoginInfo from "../Components/User/LoginInfo";
import { LoginStackParamList } from "../Utils/Navigators/LoginNavigator";

export type AddEditFunctionality = 'Add' | 'Edit'

function AddEditUserScreen(props: NativeStackScreenProps<LoginStackParamList, 'Register' | 'EditUser'>) {
  const users = useAppSelector(state => state.User.value.users);
  const dispatch = useDispatch<AppDispatch>();

  const [errorMessage, setErrorMessage] = useState('')

  let tempUser: UserInfo = {
    userId: (new Date()).getTime().toString(),
    isPasswordProtected: true,
    isSelected: false,
    password: '',
    userName: ''
  }
  if (users.filter(x => x.isSelected).length !== 0) {
    tempUser = users.filter(x => x.isSelected)[0];
  }

  const [currentUser, setCurrentUser] = useState(tempUser)
  const setUserName = (userName: string) => setCurrentUser(prev => ({ ...prev, userName }));
  const setPassword = (password: string) => setCurrentUser(prev => ({ ...prev, password }));
  const setisPasswordProtected = (isPasswordProtected: boolean) => setCurrentUser(prev => ({ ...prev, isPasswordProtected }));

  const ValidateInput = (): boolean => {
    if (currentUser.isPasswordProtected && currentUser.password.length == 0) {
      return true;
    }
    else if (currentUser.userName.length === 0) {
      return true;
    }
    return false;
  }

  const Submit = () => {
    if (props.route.name === 'EditUser') {
      dispatch(editUser({user: currentUser}))
    }
    else {
      dispatch(addUser({ user: currentUser }))
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 20 }}>
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