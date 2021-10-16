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
      inputUserLname: {
        width: '80%',
        backgroundColor: '#F9FBFC',
        borderRadius: 25,
        borderColor: '#0318FA',
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 250,
        padding: 20,
      },
      inputUserFname: {
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
      inputEmail: {
        width: '80%',
        backgroundColor: '#F9FBFC',
        borderRadius: 25,
        borderColor: '#0318FA',
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 370,
        padding: 20,
      },
      inputPersonalID: {
        width: '80%',
        backgroundColor: '#F9FBFC',
        borderRadius: 25,
        borderColor: '#0318FA',
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 430,
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
        top: 400,
      },
      signupBtn: {
        width: '80%',
        backgroundColor: '#5C5CF0',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
        position: 'absolute',
        top: 460,
      },
      signupText: {
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
      loginBtn: {
        color: '#668cff',
        fontSize: 16,
        fontWeight: '500',
      },
}
