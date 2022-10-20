import { View, Text } from "react-native";
import { AppDispatch, useAppSelector } from "../../Infrastructure/Store/store"
import LoginNavigator from "../Utils/Navigators/LoginNavigator";

function LaunchScreen() {
    const isLoggedIn = useAppSelector(state => state.User.value.isLoggedIn);

    if (isLoggedIn) {
        return <View><Text>App</Text></View>
    }

    return (<View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <LoginNavigator />
    </View>);

}

export default LaunchScreen