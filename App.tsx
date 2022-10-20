import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './src/Infrastructure/Store/store';
import LaunchScreen from './src/Presentation/Screens/LaunchScreen';

export default function App() {
  return (

    <Provider store={store}>

      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        
        <StatusBar style="auto" />
        <LaunchScreen></LaunchScreen>
      </View>
    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
