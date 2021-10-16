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
import API from '../common/api'
import styles from '../styles/LoginStyles';
const axios = require('axios');

class LoginModel extends Component {
    handleUsername = (text) => {
        this.setState({username: text});
      };
      handlePassword = (text) => {
        this.setState({password: text});
      };
      login = (name, pass) => {
        //alert('email: ' + email + ' password: ' + pass)
        // this.props.navigation.navigate('map');
        // console.log(this.props.route);
        if (name == '') Alert.alert('Username can be empty');
        else if (pass == '') Alert.alert('Password can be empty');
        else {
          axios
            .post(API.login, {
              username: name,
              password: pass,
            })
            .then(
              (response) => {
                console.log(JSON.stringify(response.data._id));
                this.props.navigation.navigate('home', response.data);
              },
              (error) => {
                console.log("error.message.data");
                Alert.alert('Wrong username or password!');
              },
            );
        }
      };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default LoginModel;