import { StyleSheet } from 'react-native';
import SplashScreen from './src/screens/splashScreen';
import HomePage from './src/screens/homePage';
import Setting from './src/screens/settings';
import VehicleData from './src/screens/vehicleData';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriveManually from './src/screens/driveManually';
import MyTripsData from './src/screens/myTripsData';
import TripGraphs from './src/screens/TripGRaphs';

export type RootStackParamList = {
  SplashScreen: undefined;
  HomePage: { vehicleIP: string };
  AutoDrive: undefined;
  DriveManually: undefined;
  MoreInfo: undefined;
  Setting: undefined;
  VehicleData: undefined;
  MyTripsData: undefined;
  TripGraphs: {tripId: number}
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
       screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MoreInfo" component={VehicleData} />
        <Stack.Screen name="MyTripsData" component={MyTripsData} />
        <Stack.Screen name="TripGraphs" component={TripGraphs} />
        <Stack.Screen name="DriveManually" component={DriveManually} />
        <Stack.Screen name="Setting" component={Setting} />
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