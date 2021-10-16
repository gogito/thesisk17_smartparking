import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import LoginComponent from './src/components/LoginComponent';
import SignupUserComponent from './src/components/SignupUserComponent';
import SignupInfoComponent from './src/components/SignupInfoComponent';
import HomeComponent from './src/components/HomeComponent';
import UserProfileComponent from './src/components/UserProfileComponent';
import AddPlateComponent from './src/components/AddPlateComponent';
import ParkingLotDetailComponent from './src/components/ParkingLotDetailComponent'
import MapContainer from './src/components/MapTesting';
import MapTesting from './src/components/MapTesting';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

class LoginScreen extends React.Component {
  render() {
    return <LoginComponent navigation={this.props.navigation} />;
  }
}

class UserProfileScreen extends React.Component {
  render() {
    return (
      <UserProfileComponent
        route={this.props.route}
        navigation={this.props.navigation}
      />
    );
  }
}
class ParkingLotDetailScreen extends React.Component {
  render() {
    return (
      <ParkingLotDetailComponent
        route={this.props.route}
        navigation={this.props.navigation}
      />
    );
  }
}
class AddPlateScreen extends React.Component {
  render() {
    return (
      <AddPlateComponent
        route={this.props.route}
        navigation={this.props.navigation}
      />
    );
  }
}
class SignupUserScreen extends React.Component {
  render() {
    return <SignupUserComponent navigation={this.props.navigation} />;
  }
}

class SignupInfoScreen extends React.Component {
  render() {
    return (
      <SignupInfoComponent
        route={this.props.route}
        navigation={this.props.navigation}
      />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <HomeComponent
        route={this.props.route}
        navigation={this.props.navigation}
      />
    );
  }
}
class MapScreen extends React.Component {
  render() {
    return (
      <MapTesting route={this.props.route} navigation={this.props.navigation} />
    );
  }
}
export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signupuser"
              component={SignupUserScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="addplate"
              component={AddPlateScreen}
              options={
                {
                  // headerShown: false
                }
              }
            />
            <Stack.Screen
              name="signupinfo"
              component={SignupInfoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="userprofile"
              component={UserProfileScreen}
              options={{}}
            />
            <Stack.Screen
              name="parkingdetail"
              component={ParkingLotDetailScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="map" component={MapScreen} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
