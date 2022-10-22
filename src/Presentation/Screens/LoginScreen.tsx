
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { performLogin, selectUser } from "../../Infrastructure/Store/Slices/UserSlice";
import { AppDispatch, useAppSelector } from "../../Infrastructure/Store/store";
import { UserInfo } from "../../Infrastructure/Types/User/User";
import LoginInfo from "../Components/User/LoginInfo";
import { LoginStackParamList } from "../Utils/Navigators/LoginNavigator";


function LoginScreen(props: NativeStackScreenProps<LoginStackParamList, 'Login'>) {

  const users = useAppSelector(state => state.User.value.users);
  const dispatch = useDispatch<AppDispatch>();
  let tempUser: UserInfo;
  let tempUsers = users.filter(x => (x.isSelected || x.userName === currentUser?.userName));
  if (tempUsers.length !== 0) {
    tempUser = tempUsers[0];
  }
  else {
    tempUser = {
      userId: '',
      isPasswordProtected: false,
      isSelected: false,
      password: '',
      userName: ''
    }
  }
  
  const [currentUser, setCurrentUser] = useState({ ...tempUser, password: '' })

  const errorMessage = useAppSelector(state => state.User.value.message);
  const navigator = useNavigation();
  const setUserName = (userName: string) => setCurrentUser(prev => ({ ...prev, userName }));
  const setPassword = (password: string) => setCurrentUser(prev => ({ ...prev, password }));
  const setisPasswordProtected = (isPasswordProtected: boolean) => setCurrentUser(prev => ({ ...prev, isPasswordProtected }));

  if (users.filter(x => x.isSelected).length !== 1) {
    //props.navigation.navigate('Register');
  }

  const Login = () => {
    dispatch(performLogin({ userId: currentUser.userId, password: currentUser.password }))
  }

  const Edit = () => {
    const selectedUser = users.filter(x => x.userName.toLocaleLowerCase() === currentUser.userName.toLocaleLowerCase());
    if (selectedUser.length !== 0) {
      if(!(selectedUser[0].isPasswordProtected) || currentUser.password === selectedUser[0].password){
        dispatch(selectUser(selectedUser[0].userId));
        props.navigation.navigate('EditUser');
      }
    }
  }

  const loadUser = () => {
    const selectedUser = users.filter(x => x.userName.toLocaleLowerCase() === currentUser.userName.toLocaleLowerCase());
    if (selectedUser.length !== 0) {
      
      setCurrentUser(prev => ({ ...selectedUser[0], password: prev.password }));

    }

  }

  const disableLoginButton = (): boolean => {
    const selectedUser = users.filter(x => x.userName.toLocaleLowerCase() === currentUser.userName.toLocaleLowerCase());
    if (selectedUser.length !== 0) {
      if(!(selectedUser[0].isPasswordProtected) || currentUser.password.trim() !== ''){
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    loadUser();
  }, [currentUser.userName]);

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 20 }}>
        <LoginInfo setPassword={setPassword}
          setUserName={setUserName}
          setisPasswordProtected={setisPasswordProtected}
          type="Login"
          user={currentUser}
          errorMessage={errorMessage}></LoginInfo>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={() => Login()} title="  Login  " disabled={disableLoginButton()}></Button>
          <Button onPress={() => {Edit() }} disabled={disableLoginButton()} title="  Edit  "></Button>
        </View>
      </View>
      <View style={{ flex: 0.25, width: '50%', alignSelf: 'center', justifyContent: 'center' }}>
        <Button onPress={() => { props.navigation.navigate('Register') }} title="Register"></Button>
      </View>
    </View>
  );
}

export default LoginScreen