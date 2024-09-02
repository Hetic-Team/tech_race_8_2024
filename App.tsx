import { StyleSheet } from 'react-native';
import SplashScreen from './src/screens/splashScreen';
import LoginScreen from './src/screens/login';
import HomePage from './src/screens/homePage';
import DriveManually from './src/screens/driveManually';
import AutoDrive from './src/screens/autoDrive';
import MoreInfo from './src/screens/moreInfo';
import Setting from './src/screens/settings';
import VehicleData from './src/screens/vehicleData';
import SessionLog from './src/screens/sessionLog';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriveManually from './src/screens/driveManually';


export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  HomePage: { vehicleIP: string };
  AutoDrive: undefined;
  DriveManually: undefined;
  MoreInfo: undefined;
  Setting: undefined;
  VehicleData: undefined;
  SessionLog: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
       screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DriveManually" component={DriveManually} />
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MoreInfo" component={MoreInfo} />
        <Stack.Screen name="DriveManually" component={DriveManually} />
        <Stack.Screen name="AutoDrive" component={AutoDrive} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="VehicleData" component={VehicleData} />
        <Stack.Screen name="SessionLog" component={SessionLog} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});