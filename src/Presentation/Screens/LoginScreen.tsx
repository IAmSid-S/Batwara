
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { useAppSelector } from "../../Infrastructure/Store/store";
import { UserInfo } from "../../Infrastructure/Types/User/User";
import LoginInfo from "../Components/User/LoginInfo";
import { LoginStackParamList } from "../Utils/Navigators/LoginNavigator";


function LoginScreen(props: NativeStackScreenProps<LoginStackParamList, 'Login'>) {
  const users = useAppSelector(state => state.User.value.users);
  const [currentUser, setCurrentUser] = useState(users.filter(x => x.isSelected)[0])
  const [errorMessage, setErrorMessage] = useState('')
  const navigator = useNavigation();
  const setUserName = (userName: string) => setCurrentUser(prev => ({ ...prev, userName }));
  const setPassword = (password: string) => setCurrentUser(prev => ({ ...prev, password }));
  const setisPasswordProtected = (isPasswordProtected: boolean) => setCurrentUser(prev => ({ ...prev, isPasswordProtected }));

  if (users.filter(x => x.isSelected).length !== 1) {
    //props.navigation.navigate('Register');
  }
  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 20 }}>
        <LoginInfo setPassword={setPassword}
          setUserName={setUserName}
          setisPasswordProtected={setisPasswordProtected}
          type="Login"
          user={currentUser}
          errorMessage={errorMessage}></LoginInfo>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={() => { }} title="  Login  "></Button>
          <Button onPress={() => { props.navigation.navigate('EditUser') }} title="  Edit  "></Button>
        </View>
      </View>
      <View style={{ flex: 0.5, width: '50%', alignSelf: 'center', justifyContent: 'center' }}>
        <Button onPress={() => { props.navigation.navigate('Register') }} title="Register"></Button>
      </View>
    </View>
  );
}

export default LoginScreen