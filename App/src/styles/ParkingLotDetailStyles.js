const React = require('react-native');

import {Dimensions} from 'react-native';

const {StyleSheet} = React;

export default {
  container: {
    flex: 1,
  },
  parkingLotImgWrapper: {
    flex: 2,
    borderColor: 'black',
    backgroundColor: '#b3ffff',
  },
  parkingLotDetailWrapper: {
    flex: 8,
    borderColor: 'black',
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    
  },
  parkingLotNameWrapper: {
    position: 'absolute',
    height: 60,
    width: '100%',
    borderColor: 'black',
    backgroundColor: '#b3ffff',
    borderRadius: 35,
    top: '16%',
    flex: 1,
    flexDirection: 'row',
  },
  parkingLotIcon: {
    flex: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSize: {
    width: 60,
    height: 60,
    backgroundColor: '#E4E721',
    borderColor: 'black',
    borderRadius: 35,
  },
  parkingLotName: {
    flex: 8,
    justifyContent: 'center',
  },
  parkingLotNameTxt: {
    fontSize: 25,
    fontFamily: 'serif',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
  },
  singleDetailWrapper: {
    width: '80%',
    top: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25
  },
  detailIcon: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  detailTittle:{
    fontSize: 18,
    fontFamily: 'serif',
    marginLeft: 10,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  singleDetailContentWrapper:{
    width: '80%',
    top: '10%',
  },
  singleDetailContentTxt:{
    fontSize: 15,
    fontFamily: 'serif',
    marginLeft: 10,
    marginLeft: 25,
    // borderBottomColor: 'black',
    // borderBottomWidth: 0.5,
  },
  bookingBtn:{
      position: 'absolute',
      height: 60,
      width: '50%',
      backgroundColor: '#1611E4',
      borderRadius: 35, 
      alignItems: 'center',
      justifyContent: 'center',
      top: '80%'
  },
  bookTxt: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  showParkingDetailOverlay:{
    width:"80%",
    height: "50%",
    backgroundColor: '#F9F0F1',
    borderRadius: 25,
    position: 'absolute',
  },
  showNoticeOverlay:{
    width:"60%",
    height: "25%",
    backgroundColor: '#F9F0F1',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noticeIcon: {
    width: 55,
    height: 55,
  },
  noticeIconBtn: {
    width: 40,
    height: 40,
  },
  noticeTxt:{
    fontSize: 20
  },
  titleList:{
    fontSize: 25,
    marginBottom: 15
  },
  pickerWrapper:{
    width:'90%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,

  },
  pickerTittle:{
    flex: 4,
    marginRight: 15
  },
  pickerDropdown:{
    flex: 6,
  },
  pickerTittleTxt:{
    fontSize: 18
  },
  header:{
    height: 50,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
  },
  headerName: {
    flex: 3,
    height: 50,
    marginRight: 10,
    marginLeft: 5,
    justifyContent:'center',
  },
  headerSlot:{
    flex: 3,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center'
  },
  headerPrice:{
    flex: 3,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center',
    // marginTop: 5,
  },
  headerTxt:{
    fontSize: 18,
    // color: 'white',
    fontWeight: 'bold',
  },
  parkingLotItemWrapper:{
    height: 50,
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#F9E792",
    borderRadius: 10,
  },

  parkingLotItemNameWrapper:{
    flex: 3,
    height: 50,
    // 
    marginRight: 10,
    marginLeft: 5,
    justifyContent:'center',
    // alignItems: 'center'
    
  },
  parkingLotItemStatusWrapper:{
    flex: 3,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center'
  },
  parkingLotItemIconWrapper:{
    flex: 3,
    height: 50,
    justifyContent:'center',
    marginBottom: 10,
    alignItems: 'center',
    // marginTop: 5,
  },
  parkingLotItemIcon:{
    flex: 3,
    width: 25,
    height: 25,
  },
  parkingLotItemDistance:{
    flex: 2,
    alignItems: 'center'
  },
  parkingLotItemDistanceText:{
    fontSize: 10
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  resultNotice:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnNotice:{
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1d1e0',
    height: 50,
    width: 50,
    top: "81%",
    left: 10,
    borderRadius: 25,
    borderColor: 'black'
  },
  tableScroll:{
    width: '100%',
    height: '30%'
  }
};
