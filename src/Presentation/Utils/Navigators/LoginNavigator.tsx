import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../Screens/LoginScreen";
import AddEditUserScreen from "../../Screens/AddEditUserScreen";
import { View, Text } from "react-native";
import { UserInfo } from "../../../Infrastructure/Types/User/User";

export type LoginStackParamList = {
  Login: undefined,
  Register: undefined,
  EditUser: undefined
};
const NewUserObject: UserInfo = {
  userId: '',
  isPasswordProtected: true,
  isSelected: false,
  password: '',
  userName: ''
}
function LoginNavigator() {
  const LoginStack = createNativeStackNavigator<LoginStackParamList>();

  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Register" component={AddEditUserScreen}/>
        <LoginStack.Screen name="EditUser" component={AddEditUserScreen} />
      </LoginStack.Navigator>
    </NavigationContainer >
  );
}

export default LoginNavigator