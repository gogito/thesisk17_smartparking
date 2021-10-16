import React, {Component} from 'react';

import {
  Text,
  BackHandler,
  Image,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import WebView from 'react-native-webview';
import map from '../common/map';
import styles from '../styles/HomeStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import {Overlay} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import Tip from 'react-native-tip';
import API from '../common/api';
import {Icon} from 'react-native-elements';
const axios = require('axios');
var routingInterval;
var userCheckingInterval;
var getlocationInterval;
var checkingDistanceInterval;
class HomeComponent extends Component {
  state = {
    showListParkingLot: false,
    parkingLocation: {},
    parkingList: [],
    searchingResult: [],
    testImg: require('../../assets/locUser.png'),
    parkingItem: {
      title: '',
      icon: '',
      status: '',
      distance: '',
    },
    userOption: [],
    userStatus: '',
    checkingLogin: false,
    checkBooking: false,
    curLocation: {
      latitude: 10.77057,
      longitude: 106.672547,
    },
    desLocation: {
      latitude: 10.77057,
      longitude: 106.672547,
    },
    curBookingName: '',
    distanceToDes: 0,
    curStepToDes: {
      distance: 0,
      instruction: 'No instruction available',
    },
    userID: null,
    searchingKeyWord: '',
    searchResultApperance: false,
    spinner: true,
    timer: 0,
    timerInterval: 5000,
    arrConNote: '1',
    detectPLOpns: '1',
    showParkingDetail: false,
    bookingDetail: {
      name: '',
      address: '',
      price: '',
      area: '',
      time: '',
    },
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this.getParkingLotData();
    this.checkUserAuthentificate();
    // console.log('INIT: RENDER');
    // this.getParkingLotData();
    getlocationInterval = setInterval(
      () =>
        this.getParkingLotData(
          this.state.curLocation.latitude,
          this.state.curLocation.longitude,
        ),
      5000,
    );
    userCheckingInterval = setInterval(
      () => this.checkUserAuthentificate(),
      2000,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // console.log('FINISH: UNmount');
    clearInterval(getlocationInterval);
    clearInterval(userCheckingInterval);
  }
  //Handle when click on back button of android device
  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  }
  //Handle data transfer between HTML map and React native android apps
  //Case 1: transfer booking ID for getting Information
  //Case 2: transfer distance to destination when routing, data from OSM response
  handleDataHTMLtoReactNative(event) {
    // console.log(event.nativeEvent);
    if (event.nativeEvent.data.length !== 24) {
      var guide = JSON.parse(event.nativeEvent.data);
      this.setState({distanceToDes: guide.distance});
      this.setState({
        curStepToDes: {
          distance: Math.round(guide.steps[0].distance),
          instruction: guide.steps[0].instruction,
        },
      });
    } else this.getDetailPopup(event.nativeEvent.data);
  }
  //*****************************************
  //       HANDLE DROPDOWN CONTENT
  //*****************************************
  //Handle dropdown button and top left of screen clicked
  handleDropdownSelect(userOption) {
    if (this.state.userStatus == '0') {
      switch (userOption) {
        case 0:
          this.props.navigation.navigate('login');
          break;

        case 1:
          this.props.navigation.navigate('signupuser');
          break;
        default:
      }
    } else {
      switch (userOption) {
        case 0:
          this.props.navigation.navigate(
            'userprofile',
            this.props.route.params,
          );
          break;
        case 1:
          this.props.navigation.navigate('map', this.props.route.params._id);
          break;
        case 2:
          this.props.navigation.navigate(
            'addplate',
            this.props.route.params._id,
          );
          break;

        case 3:
          Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => this.props.navigation.navigate('login', ''),
              },
            ],
            {cancelable: false},
          );

          break;
        default:
      }
    }
  }
  //Base on current navigation data from previous screen (or undefined) to:
  // - Set up menu appearing when dropdown button clicked
  // - Set up which components and button appear base on current situation (not login, login and booking)
  checkUserAuthentificate() {
    // console.log(this.state.detectPLOpns);
    this.setState({
      userOption: [],
    });
    this.setState({userStatus: ''});
    if (this.props.route.params !== undefined) {
      var data = this.props.route.params;
      this.setState({
        userOption: ['User Infomation', 'History', 'Add license plate', 'Quit'],
      });

      axios.get(API.user + this.state.userID).then(
        response => {
          this.setState({userStatus: '1'});
          data = response.data;
          if (
            data.currentBooking !== undefined &&
            data.currentBooking !== '' &&
            data.currentBooking != null
          ) {
            this.setState({checkBooking: true});
            this.setState({checkingLogin: false});
            this.getCurrentBookingID(this.state.userID, 3);
            // console.log(JSON.stringify(this.state.arrConNote.length));
            // if (this.state.arrConNote.length === 1) {
            //   this.checkingDistance(data.currentBooking);
            // }
          } else {
            this.setState({checkingLogin: true});
            this.setState({checkBooking: false});
            this.endRouting();
            clearInterval(routingInterval);
          }
        },
        error => {
          console.log(error.response.data.message);
        },
      );
      if (this.state.checkingLogin === true) this.setState({spinner: false});
    } else {
      this.setState({checkBooking: false});
      this.setState({userStatus: 0});
      this.setState({userOption: ['Login', 'Signup']});
      this.setState({checkingLogin: false});
    }
  }
  //*****************************************
  //               DRAW MARKER
  //*****************************************
  //Using javascript from react native to control center view on map
  setViewOnMap(latitude, longitude) {
    var latitudeTxt = JSON.stringify(latitude);
    var longtitudeTxt = JSON.stringify(longitude);
    this.Map_Ref.injectJavaScript(`
      mymap.setView([${latitudeTxt}, ${longtitudeTxt}]);
    `);
  }
  //Add marker to leaflet map
  markLocationBaseCoordinates(lat, long, type, id) {
    var idTxT = JSON.stringify(id);
    this.Map_Ref.injectJavaScript(`
      markLocation(${lat}, ${long}, ${type}, ${idTxT})
    `);
    if (this.state.spinner) {
      this.setState({spinner: false});
    }
  }
  //Convert from status of parking lot to consider available slot, only: full, normal and empty in general
  converStatus2Level(status) {
    if (status >= 0.5) return 'Empty';
    else if (status > 0) return 'Normal';
    return 'Full';
  }
  //Divided into 3 types, each types has different icons
  markParkingBaseLoc(parkingArray, size) {
    for (var i = 0; i < size; i++) {
      // console.log( parkingArray[i].parkinglot._id);
      switch (this.converStatus2Level(parkingArray[i].parkinglot.status)) {
        case 'Full':
          this.markLocationBaseCoordinates(
            parkingArray[i].parkinglot.coordinate.longitude,
            parkingArray[i].parkinglot.coordinate.latitude,
            1,
            parkingArray[i].parkinglot._id,
          );
          break;
        case 'Normal':
          this.markLocationBaseCoordinates(
            parkingArray[i].parkinglot.coordinate.longitude,
            parkingArray[i].parkinglot.coordinate.latitude,
            2,
            parkingArray[i].parkinglot._id,
          );
          break;
        case 'Empty':
          this.markLocationBaseCoordinates(
            parkingArray[i].parkinglot.coordinate.longitude,
            parkingArray[i].parkinglot.coordinate.latitude,
            3,
            parkingArray[i].parkinglot._id,
          );
          break;
        default:
          break;
      }
    }
  }
  //Save current coordinate to state of react native
  saveCurLocation(lat, long) {
    // console.log(data);

    this.setState({
      curLocation: {
        latitude: lat,
        longitude: long,
      },
    });
    // console.log('CURRENT LOCATION:' + lat + ' ' + long);
  }
  //Get current coordinates by geolocation chip
  getCurLocation() {
    if (this.state.detectPLOpns.length === 1) {
      Geolocation.getCurrentPosition(
        data =>
          this.saveCurLocation(data.coords.latitude, data.coords.longitude),
        error => console.log('ERROR: LOCATION ERROR'),
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000},
      );
    }
    // console.log(this.state.curLocation, "HERE");
  }
  //Mark current location by blue dot icon
  markCurLocation() {
    // console.log(this.state.curLocation.latitude);
    this.setState({detectPLOpns: '1'});
    var latitudeTxt = JSON.stringify(this.state.curLocation.latitude);
    var longtitudeTxt = JSON.stringify(this.state.curLocation.longitude);
    this.Map_Ref.injectJavaScript(`
      mymap.setView([${latitudeTxt}, ${longtitudeTxt}]);
    `);
    this.getParkingLotData(
      this.state.curLocation.latitude,
      this.state.curLocation.longitude,
    );
  }
  //Scan parking lot near to current location
  getParkingLotData(latitude, longitude) {
    console.log('Loop call');
    this.getCurLocation();
    this.setState({
      userID:
        this.props.route.params === undefined
          ? ''
          : this.props.route.params._id,
    });
    this.markLocationBaseCoordinates(
      this.state.curLocation.latitude,
      this.state.curLocation.longitude,
      4,
      'test',
    );

    axios
      .post(API.parkinglist, {
        current: {
          latitude: longitude,
          longitude: latitude,
        },
        radius: '1',
      })
      .then(
        response => {
          // var sec = new Date().getSeconds(); //To get the Current Seconds
          // console.log(sec);
          var sizeOfResponse = JSON.stringify(response.data.resultArray.length);
          this.markParkingBaseLoc(response.data.resultArray, sizeOfResponse);
          this.createOverlayList(response.data.resultArray, sizeOfResponse);
          this.setState({
            parkingLocation: response.data.resultArray,
          });
          this.setState({sizeofData: sizeOfResponse});
        },
        error => {
          console.log(error.response.data.message);
          // Alert.alert('Wrong username or password!');
        },
      );
  }
  //*****************************************
  //       HANDLE PARKING LOT LIST
  //*****************************************
  //Close/Open parking lot list overlay
  toggleShowParkingLot() {
    this.setState({showListParkingLot: !this.state.showListParkingLot});
  }
  //Add new parking lot to parking lot list in state
  addParkingLotItem(item) {
    this.setState({parkingList: [...this.state.parkingList, item]});
    // console.log(this.state.parkingList);
  }
  //render element in parking lot list
  renderItem = ({item}) => (
    <View style={styles.parkingLotItemWrapper}>
      <TouchableOpacity
        style={styles.parkingLotItemNameWrapper}
        onPress={() => {
          // console.log(item);
          this.toggleShowParkingLot();
          this.props.navigation.navigate('parkingdetail', item);
        }}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.parkingLotItemStatusWrapper}>
        <Text>{item.totalSlot - item.freeSlot + '/' + item.totalSlot}</Text>
      </View>
      <View style={styles.parkingLotItemIconWrapper}>
        <Image style={styles.parkingLotItemIcon} source={item.icon}></Image>
        <View style={styles.parkingLotItemDistance}>
          <Text style={styles.parkingLotItemDistanceText}>{item.distance}</Text>
        </View>
      </View>
    </View>
  );
  //Scan data from server and export parking lot list
  createOverlayList(data, size) {
    // console.log(data);
    this.setState({parkingList: []});
    for (var i = 0; i < size; i++) {
      var parkingItem;
      var iconRequire;
      var freeslot = 0;
      var totalslot = 0;
      // console.log(this.props.route.params._id);
      switch (this.converStatus2Level(data[i].parkinglot.status)) {
        case 'Full':
          iconRequire = require('../../assets/fullSlots.png');
          break;
        case 'Normal':
          iconRequire = require('../../assets/normalSlots.png');
          break;
        case 'Empty':
          iconRequire = require('../../assets/emptySlots.png');
          break;
        default:
          break;
      }
      for (var j = 0; j < data[i].parkinglot.area.length; j++) {
        totalslot =
          data[i].parkinglot.area[j].freeslot +
          data[i].parkinglot.area[j].fullslot +
          totalslot;
        freeslot = data[i].parkinglot.area[j].freeslot + freeslot;
        // console.log(data[i].parkinglot.area[j]);
      }
      // console.log(freeslot + '/' + totalslot);
      // console.log(this.props.route.params);
      parkingItem = {
        ...data[i].parkinglot,
        icon: iconRequire,
        distance: Math.round(data[i].distance*10)/10 + 'km',
        freeSlot: freeslot,
        totalSlot: totalslot,
        userID:
          this.props.route.params !== undefined
            ? this.props.route.params._id
            : '',
        // userID: "604a309f5ba27b60787054b8"
      };
      // console.log('createOvelayList: USER ID:' + parkingItem.userID);
      // console.log(parkingItem);
      this.addParkingLotItem(parkingItem);
    }
    // console.log(this.state.parkingList);
  }
  //*****************************************
  //                MAP TOUCHING
  // FLOW: SEND PARKINGLOT ID FOR HTML --onTouch--> HTML send ID BACK --> GET DATA --> SEND DATA TO HTML
  //*****************************************
  //Pass detail info to HTML marker
  showDetailPopup(id, name, status, price) {
    var idTxT = JSON.stringify(id);
    var nameTxT = JSON.stringify(name);
    var statusTxT = JSON.stringify(status);
    var priceTxT = JSON.stringify(price);
    // console.log(idTxT, nameTxT, statusTxT, priceTxT);
    this.Map_Ref.injectJavaScript(`
      updateDetailPopup(${idTxT}, ${nameTxT}, ${statusTxT}, ${priceTxT})
    `);
  }
  //Use parking lot ID from HTML to get detail from server
  getDetailPopup(id) {
    var name;
    var status;
    var price = 1000000000;
    // console.log('UPDATE: update status for parking lot');
    axios.get(API.parkinglots + id).then(
      response => {
        // console.log('Get Detail Popup:' + response.data);
        name = JSON.stringify(response.data.name);
        status = Math.round(response.data.status * 100) + '%';

        for (var i = 0; i < response.data.area.length; i++) {
          if (response.data.area[i].price < price) {
            price = response.data.area[i].price;
          }
        }
        this.showDetailPopup(id, name, status, price);
      },
      error => {
        console.log(error.response.data.message);
      },
    );
    // console.log(price);
  }

  //*****************************************
  //                MAP ROUTING
  // FLOW: GET BOOKING ID --> GET PARKING LOT ID --> ROUTING INTERVAL 15s
  //*****************************************
  //delete current routing path
  endRouting() {
    this.Map_Ref.injectJavaScript(`
      routingLayer.removeLayer(routingGEOdata);
    `);
  }
  //routing base javascript
  routing(initLong, initLat, desLong, desLat) {
    var initLatTxt = JSON.stringify(initLat);
    var initLongTxt = JSON.stringify(initLong);
    var desLatTxt = JSON.stringify(desLat);
    var desLongTxt = JSON.stringify(desLong);
    if (this.Map_Ref !== undefined) {
      this.Map_Ref.injectJavaScript(`
      routing(${initLong}, ${initLat}, ${desLong}, ${desLat})
    `);
    }
  }
  //handle success booking:
  // case 1: user confirm
  // case 2: if not, user close to destination over 5 mins, then auto turn booking into success
  requestSuccessBookingToServer(bookingID) {
    // console.log(bookingID);
    axios.put(API.booking + bookingID).then(
      response => {
        this.checkUserAuthentificate;
        this.setState({spinner: false});
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }
  successCurrentBooking(bookingID) {
    this.requestSuccessBookingToServer(bookingID);
    this.endRouting();
    clearInterval(routingInterval);
    this.checkUserAuthentificate;
    this.setState({spinner: false});
  }
  //Timer 5 mins
  automationTimer(bookingID) {
    if (this.distanceToDes > 0 && this.distanceToDes <= 150) {
      this.setState({timer: timer + 1});
      // console.log('Timer: ' + this.state.timer);
    } else {
      this.setState({timer: 0});
    }
    if (this.state.timer >= 300000 / this.state.timerInterval) {
      this.setState({timer: 0});
      this.successCurrentBooking(bookingID);
      // clearInterval(checkingDistanceInterval);
    }
  }
  // When distance between user and des less than 150, then ask for arrival confimation
  checkingDistance(bookingID) {
    if (this.state.distanceToDes > 0 && this.state.distanceToDes <= 1500) {
      this.setState({arrConNote: '22'});
      Alert.alert(
        'Arrival confimation',
        'Did you arrive your destination',
        [
          {
            text: 'No',
            onPress: () => {
              checkingDistanceInterval = setInterval(
                () => this.automationTimer(bookingID),
                this.state.timerInterval,
              );
              // console.log('Your booking will cancel next 10 minute');
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              this.successCurrentBooking(bookingID);
            },
          },
        ],
        {cancelable: false},
      );
    }
  }

  getParkingLotCoordinates(parkingLotID) {
    // console.log('getParkingLotCoordinates: ' + parkingLotID);
    axios
      .get('http://gogito.duckdns.org:3002/parkinglots/' + parkingLotID)
      .then(
        response => {
          // console.log(JSON.stringify(response.data));
          this.setState({
            desLocation: {
              latitude: response.data.coordinate.longitude,
              longitude: response.data.coordinate.latitude,
            },
          });
        },
        error => {
          console.log(error.response.data.message);
        },
      );
    // console.log(this.state.desLocation);
    // console.log(this.state.curLocation);
    if (this.Map_Ref !== undefined) {
      this.routing(
        this.state.curLocation.longitude,
        this.state.curLocation.latitude,
        this.state.desLocation.longitude,
        this.state.desLocation.latitude,
      );
      routingInterval = setInterval(
        () =>
          this.routing(
            this.state.curLocation.longitude,
            this.state.curLocation.latitude,
            this.state.desLocation.longitude,
            this.state.desLocation.latitude,
          ),
        5000,
      );
      // console.log(routingInterval);
    }
  }
  getCurrentBookingLotID(bookingID, options) {
    // console.log('getCurrentBookingLotID: ' + bookingID);
    axios.get(API.booking + bookingID).then(
      response => {
        switch (options) {
          case 1:
            this.getParkingLotCoordinates(response.data.parkinglotID);
            break;
          case 2:
            this.getCurrentBookingDetailInfo(response.data);

          default:
            break;
        }
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }
  getCurrentBookingDetailInfo(data) {
    // console.log(data);
    this.setState({curBookingName: data.parkinglotName});
    this.setState({
      bookingDetail: {
        name: data.parkinglotName,
        address: data.parkinglotAddress,
        price: data.price,
        area: data.areaName,
        time: data.created_at,
      },
    });
  }
  getCurrentBookingID(userID, option) {
    // console.log('getCurrentBookingID: ' + userID);
    axios.get(API.user + userID).then(
      response => {
        switch (option) {
          case 1:
            this.getCurrentBookingLotID(response.data.currentBooking, 1);
            break;
          case 2:
            this.cancelCurrentBooking(response.data.currentBooking);
            this.checkUserAuthentificate;

            break;
          case 3:
            this.getCurrentBookingLotID(response.data.currentBooking, 2);
            break;
          case 4:
            this.successCurrentBooking(response.data.currentBooking);
            break;
          default:
            break;
        }
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }
  //*****************************************
  //                SEARCH ENGINE
  // FLOW: GET KEYWORD --> REQUEST API and SOLVE --> OPEN OVERLAY RESULT
  //*****************************************
  addSearchingResultItem(item) {
    this.setState({searchingResult: [...this.state.searchingResult, item]});
  }
  clearSearchTextInput() {
    this.search_box.clear();
  }
  createNominatimResponseDataItem(response) {
    this.toggleShowSearchResult();
    this.clearSearchTextInput();
    this.setState({searchingResult: []});
    for (var i = 0; i < response.length; i++) {
      var searchingItem;
      searchingItem = {
        place_id: response[i].place_id,
        coordinate: {
          latitude: response[i].lat,
          longitude: response[i].lon,
        },
        name: response[i].display_name,
      };
      this.addSearchingResultItem(searchingItem);
    }
    // console.log(this.state.searchingResult[1]);
  }
  callNominatimAPI(keyword) {
    console.log(keyword);
    axios.get(API.searching + keyword).then(
      response => {
        // console.log(JSON.stringify(response.data[1].boundingbox));
        this.createNominatimResponseDataItem(response.data);
      },
      error => {
        console.log(error.response.message);
      },
    );
  }
  getKeyWord() {
    var handledKeyword = JSON.stringify(this.state.searchingKeyWord).replace(
      / /g,
      '+',
    );
    this.callNominatimAPI(handledKeyword);
  }
  toggleShowSearchResult() {
    this.setState({searchResultApperance: !this.state.searchResultApperance});
  }
  renderSearchingResultItem = ({item}) => (
    <View style={styles.parkingLotItemWrapper}>
      <TouchableOpacity
        style={styles.parkingLotItemNameWrapper}
        onPress={() => {
          // console.log(item);
          this.toggleShowSearchResult();
          this.setState({detectPLOpns: '22'});
          this.saveCurLocation(
            item.coordinate.latitude,
            item.coordinate.longitude,
          );
          this.setViewOnMap(
            item.coordinate.latitude,
            item.coordinate.longitude,
          );
          this.getParkingLotData(
            item.coordinate.latitude,
            item.coordinate.longitude,
          );
        }}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  //*****************************************
  //                HANDLE CANCEL BOOKING
  // *******************************************
  async cancelCurrentBooking(bookingID) {
    // console.log(bookingID);
    await axios.delete(API.booking + bookingID).then(
      response => {
        // console.log(JSON.stringify(response.data));
        // console.log('Cancel booking');
      },
      error => {
        console.log(error.response.data.message);
      },
    );
    this.endRouting();
    clearInterval(routingInterval);
    this.checkUserAuthentificate();
  }
  handleCancelBookingPress() {
    Alert.alert(
      'Cancel Booking',
      'Do you want to cancel your booking?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel delete Booking'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.setState({spinner: true});
            this.getCurrentBookingID(this.state.userID, 2);
          },
        },
      ],
      {cancelable: false},
    );
  }
    //*****************************************
  //                HANDLE SUCCESS BOOKING
  // *******************************************
  handleSuccessBookingPress() {
    Alert.alert(
      'Complete Booking',
      'Did you arrive?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel success Booking'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.setState({spinner: true});
            this.getCurrentBookingID(this.state.userID, 4);
          },
        },
      ],
      {cancelable: false},
    );
  }
  //*****************************************
  //                HANDLE SHOW DETAIL CURRENT BOOKING
  // ******************************************
  getBookingDetail(item) {
    this.setState({
      bookingDetail: {
        name: item.title,
        address: item.address,
        area: item.area,
        price: item.price,
        time: item.time,
      },
    });
    this.toggleShowBookingDetal();
  }
  toggleShowBookingDetal() {
    this.setState({showParkingDetail: !this.state.showParkingDetail});
  }
  //RENDER=========================================================================================================
  render() {
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          javaScriptEnabled={true}
          allowFileAccess={true}
          ref={component => (this.Map_Ref = component)}
          source={{html: map}}
          geolocationEnabled={true}
          onMessage={this.handleDataHTMLtoReactNative.bind(this)}
        />
        <View style={styles.overlay}>
          <View style={styles.body}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Processing...'}
              textStyle={styles.spinnerTextStyle}
              overlayColor="rgba(5, 5, 5, 0.95)"
              color="white"
            />
            <View style={styles.header}>
              <View style={styles.userOptions}>
                <ModalDropdown
                  ref={component => (this.drop_down = component)}
                  style={styles.dropdownIcon}
                  dropdownStyle={styles.dropdownList}
                  // renderSeparator={() => <View /> }
                  onSelect={userOption => this.handleDropdownSelect(userOption)}
                  onDropdownWillShow={() => this.checkUserAuthentificate()}
                  dropdownStyle={{
                    borderRadius: 6,
                    backgroundColor: '#26344a',
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowRadius: 20,
                    shadowOpacity: 1,
                    padding: 8,
                  }}
                  dropdownTextStyle={{
                    fontFamily: 'poppins-500',
                    fontSize: 16,
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'left',
                    color: '#ffffff',
                    backgroundColor: '#26344a',
                  }}
                  options={this.state.userOption}
                  renderRightComponent={() => (
                    <TouchableOpacity
                      style={styles.dropdownIconImg}
                      onPress={() => this.drop_down.show()}>
                      <Image
                        style={styles.usericon}
                        source={require('../../assets/nav-menu.png')}></Image>
                    </TouchableOpacity>
                  )}></ModalDropdown>
              </View>
              <View style={styles.searchBox}>
                <View style={styles.searchArea}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#0D0D0F"
                    ref={component => (this.search_box = component)}
                    onSubmitEditing={() => this.getKeyWord()}
                    onChangeText={text =>
                      this.setState({searchingKeyWord: text})
                    }
                  />
                  <TouchableOpacity
                    style={styles.searchIconArea}
                    onPress={() => this.getKeyWord()}>
                    <Icon
                      name="search"
                      type="feather"
                      color="black"
                      size={35}
                    />
                  </TouchableOpacity>

                  <View style={styles.searchTemp}></View>
                </View>
              </View>
            </View>
          </View>
          {this.state.checkBooking && (
            <TouchableOpacity
              style={styles.routingIcon}
              onPress={() => {
                this.getCurrentBookingID(this.state.userID, 1);
              }}>
              <Icon name="navigation" type="feather" color="blue" size={40} />
            </TouchableOpacity>
          )}
          {this.state.checkBooking && (
            <TouchableOpacity
              style={styles.confirmIcon}
              onPress={() => {
               this.handleSuccessBookingPress();
              }}>
              <Image
                style={styles.geolocationIconSize}
                source={require('../../assets/carcheck.png')}></Image>
            </TouchableOpacity>
          )}
          {this.state.checkBooking && (
            <View style={styles.detailBookingInfoWrapper}>
              <TouchableOpacity
                style={styles.cancelBooking}
                onPress={() => {
                  this.handleCancelBookingPress();
                }}>
                <Icon name="x" type="feather" color="black" size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailBookingName}
                onPress={() => {
                  this.toggleShowBookingDetal();
                }}>
                <Text style={styles.bookingNameTxt}>
                  {this.state.curBookingName}
                </Text>
              </TouchableOpacity>
              <View style={styles.distanceToDes}>
                <Text>
                  {(this.state.distanceToDes / 1000).toFixed(1) + 'km'}
                </Text>
              </View>
              <View style={styles.distanceToNextStep}>
                <Text>{this.state.curStepToDes.distance + 'm'}</Text>
              </View>
              <View style={styles.instruction}>
                <Text style={styles.instructionTxt}>
                  {this.state.curStepToDes.instruction}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.geolocationIcon}
            onPress={() => {
              this.markCurLocation();
            }}>
            <Image
              style={styles.geolocationIconSize}
              source={this.state.testImg}></Image>
          </TouchableOpacity>
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showDataOverlay}
            isVisible={this.state.showListParkingLot}
            onBackdropPress={() => this.toggleShowParkingLot()}>
            <Text style={styles.titleList}> PARKING LIST</Text>
            <FlatList
              data={this.state.parkingList}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </Overlay>

          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showDataOverlay}
            isVisible={this.state.searchResultApperance}
            onBackdropPress={() => this.toggleShowSearchResult()}>
            <Text style={styles.titleList}> Result Found</Text>
            <FlatList
              data={this.state.searchingResult}
              renderItem={this.renderSearchingResultItem}
              keyExtractor={item => item.place_id}
            />
          </Overlay>

          {this.state.checkingLogin && (
            <TouchableOpacity
              style={styles.viewParkingLot}
              onPress={() => {
                this.toggleShowParkingLot();
                // // console.log(this.state.showListParkingLot);
              }}>
              <Text style={styles.showListButton}>P</Text>
            </TouchableOpacity>
          )}
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showDataOverlay}
            isVisible={this.state.showParkingDetail}
            onBackdropPress={() => this.toggleShowBookingDetal()}>
            <Text style={styles.titleList}> BOOKING DETAIL</Text>
            <View style={styles.darkLineWrapper}>
              <View style={styles.darkLine}></View>
            </View>

            <View style={styles.infoWrapper}>
              <Icon name="car" type="fontisto" color="#4A494B" size={24} />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.name}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Icon name="map-pin" type="feather" color="#4A494B" size={24} />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.address}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Icon
                name="dollar-sign"
                type="feather"
                color="#4A494B"
                size={24}
              />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.price}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Icon
                name="arrow-left-circle"
                type="feather"
                color="#4A494B"
                size={24}
              />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.area}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Icon name="clock" type="feather" color="#4A494B" size={24} />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.time}</Text>
              </View>
            </View>
          </Overlay>
        </View>
      </View>
    );
  }
}

export default HomeComponent;
