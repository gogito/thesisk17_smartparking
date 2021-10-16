const React = require('react-native');

import {Dimensions} from 'react-native';

const {StyleSheet} = React;

export default {
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#A9FBFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
  },

  body: {
    flex: 8,
    backgroundColor: '#F9FBFC',
  },
  itemWrapper: {
    heigth: 50,
    flex: 1,
    // width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  statusAreaWrapperCancel: {
    heigth: "100%",
    width: 50,
    flex: 1,
    backgroundColor: '#F9C1E3',
    borderRadius: 5
  },
  statusAreaWrapperBooked: {
    heigth: "100%",
    width: 50,
    flex: 1,
    backgroundColor: '#D4F9F6',
    borderRadius: 5
  },
  statusAreaWrapperSuccess: {
    heigth: "100%",
    width: 50,
    flex: 1,
    backgroundColor: '#E1F9D4',
    borderRadius: 5
  },
  infoAreaWrapper: {
    flex: 7,
    heigth: 50,
    // backgroundColor: 'blue',
  },
  nameAreaWrapper:{
    flex: 1,
    // backgroundColor: 'blue',
    marginLeft: 30
  },
  detailAreaWrapper:{
    flex: 1,
    flexDirection: 'row'
    // backgroundColor: 'black',
  },
  timeAreaWrapper:{
    marginRight: 4,
    marginLeft: 4
  },
  priceAreaWrapper:{
    flex:1,
    flexDirection: 'row'
  },
  bottomWrapper:{
    flex: 1,
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  titleTxt:{
    color: 'black',
    fontSize: 19
  },
  timeText:{
    color: '#808080',
  },
  areaNameWrapper:{
    heigth: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: '#F19828',
    marginLeft: 10,
    marginRight: 11
  },
  showDataOverlay: {
    width: '80%',
    height: '40%',
    backgroundColor: '#F9F0F1',
    borderRadius: 25,
    position: 'absolute',
  },
  darkLineWrapper:{
    justifyContent:'center',
    alignItems: 'center'
  },
  darkLine:{
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
    marginTop: 5,
  },
  infoWrapper:{
    width: "95%",
    height: 38,
    alignItems: 'center',
    flexDirection: 'row'
  },
  txtInfoWrapper:{
    marginLeft: 5,
  }
};
