import { View, Text } from "react-native";
import { AppDispatch, useAppSelector } from "../../Infrastructure/Store/store"

function LaunchScreen() {
    const isLoggedIn = useAppSelector(state => state.User.value.isLoggedIn);

    if(isLoggedIn){
        return <View><Text>App</Text></View>
    }

    return <View><Text>Login</Text></View>

}

export default LaunchScreen