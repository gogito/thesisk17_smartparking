const React = require("react-native");

import { Dimensions } from "react-native";

const { StyleSheet } = React;

export default {
    container: {
        height: '100%',
        width: '100%',
        // alignItems: 'center',
      },
      inputPlate: {
        height: 70,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        top: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        left: '6%',
      },
      inputText: {
        fontSize: 25,
        height: 50,
        // color: '#f0f0f5',
      },
      btnConfirm: {
        height: 50,
        width: '30%',
        backgroundColor: '#4d4dff',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        // position: 'absolute',
        top: '10%',
        left: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 25,
      },
      confirmText: {
        color: 'white',
        fontSize: 20,
      },
}
