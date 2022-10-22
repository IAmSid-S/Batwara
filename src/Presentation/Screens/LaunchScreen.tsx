import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { loadUsers } from "../../Infrastructure/Store/Slices/UserSlice";
import { AppDispatch, useAppSelector } from "../../Infrastructure/Store/store"
import LoginNavigator from "../Utils/Navigators/LoginNavigator";

function LaunchScreen() {
    const isLoggedIn = useAppSelector(state => state.User.value.isLoggedIn);
    const dispatch = useDispatch<AppDispatch>();
    dispatch(loadUsers([]))
    if (isLoggedIn) {
        return <View><Text>This is app</Text></View>
    }

    return (<View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <LoginNavigator />
    </View>);

}

export default LaunchScreen