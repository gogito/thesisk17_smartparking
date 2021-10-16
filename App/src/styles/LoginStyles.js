const React = require("react-native");

import { Dimensions } from "react-native";

const { StyleSheet } = React;

export default {
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      },
      inputUsername: {
        width: '80%',
        height: 50,
        backgroundColor: '#F9FBFC',
        borderRadius: 25,
        borderColor: '#0318FA',
        marginBottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 250,
        padding: 20,
      },
      inputPassword: {
        width: '80%',
        backgroundColor: '#F9FBFC',
        borderRadius: 25,
        borderColor: '#0318FA',
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 310,
        padding: 20,
      },
      inputText: {
        height: 50,
        color: 'black',
      },
      logo: {
        height: 120,
        width: 120,
        position: 'absolute',
        top: 50,
      },
      logoName: {
        height: 30,
        width: 170,
        position: 'absolute',
        top: 175,
      },
      forgot: {
        borderRadius: 5,
        // Set border width.
        borderWidth: 2,
        // Set border Hex Color Code Here.
        borderColor: '#FF5722',
        color: 'blue',
        fontSize: 13,
        position: 'absolute',
        right: 0,
        top: 370,
      },
      loginBtn: {
        width: '80%',
        backgroundColor: '#5C5CF0',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
        position: 'absolute',
        top: 400,
      },
      loginText: {
        color: 'white',
      },
      signupTextCont: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 16,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
      },
      signupText: {
        color: 'white',
        fontSize: 16,
      },
      signupBtn: {
        color: '#668cff',
        fontSize: 16,
        fontWeight: '500',
      },
}
