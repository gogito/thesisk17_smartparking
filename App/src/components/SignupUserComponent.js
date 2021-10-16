import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import styles from '../styles/SignupUserStyles'
import SignupUserModel from '../model/SignupUserModel'
class SignupUserComponent extends SignupUserModel {
  state = {
    cfPass: '',
    username: '',
    password: '',
    showError: false,
  };
  
  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require('../../assets/homeBackground.jpg')}>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}></Image>
        <Image
          style={styles.logoName}
          source={require('../../assets/logoName.png')}></Image>
        {/* Input */}
        <View style={styles.inputUsername}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handleUsername}
          />
        </View>

        <View style={styles.inputPassword}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handlePassword}
          />
        </View>

        <View style={styles.inputConfirmPassword}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handlecfPass}
          />
        </View>
        {
        this.state.showError &&
        <View style={styles.ErrorMessage}>
          <Text style={styles.errorText}> Confirm Password do not matched!</Text>
        </View>
        }
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => {
            this.nextToRegister(
              this.state.username,
              this.state.password,
              this.state.cfPass,
            );
          }}>
          <Text style={styles.signupText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>You already have an account?</Text>
          <Text
            style={styles.loginBtn}
            onPress={() => {
              this.props.navigation.navigate('login');
            }}>
            {" Login"}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SignupUserComponent;
