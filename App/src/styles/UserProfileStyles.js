const React = require("react-native");

import { Dimensions } from "react-native";

const { StyleSheet } = React;

export default {
    header: {
        backgroundColor: '#DCDCDC',
      },
      headerContent: {
        padding: 30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
      },
      name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
      },
      userInfo: {
        fontSize: 16,
        color: '#778899',
        fontWeight: '600',
      },
      body: {
        backgroundColor: '#778899',
        height: 500,
        // alignItems: 'center',
      },
      item: {
          backgroundColor:'#e6f9ff',
        flexDirection: 'row',
        alignItems:'center'
      },
      infoContent: {
        fontSize: 18,
        color: 'black',
      },
      iconContent: {
        fontSize: 18,
        color: 'white',
      },
      icon: {
        width: 50,
        height: 50,
        marginTop: 20,
        left: 10,
      },
      info: {
        marginTop: 20,
        color: '#FFFFFF',
        padding: 10,
      },
}
