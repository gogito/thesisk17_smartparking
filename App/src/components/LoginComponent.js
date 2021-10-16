import React, {Component, useState} from 'react';
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
import styles from '../styles/LoginStyles';
import LoginModel from '../model/LoginModel'

class LoginComponent extends LoginModel {
  
  constructor(props) {
    super(props);
    // this.usernameInput.clear();
    // this.passwordInput.clear();
  }
  state = {
    username: '',
    password: '',
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
            // ref={input => { this.usernameInput = input }}
          />
        </View>

        <View style={styles.inputPassword}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#0D0D0F"
            onChangeText={this.handlePassword}
            // ref={input => { this.passwordInput = input }}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.login(this.state.username, this.state.password);
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <Text
            style={styles.signupBtn}
            onPress={() => {
              this.props.navigation.navigate('signupuser');
            }}>
             {" Signup"}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
export default LoginComponent;
