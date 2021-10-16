import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from '../styles/ParkingLotDetailStyles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Overlay, Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import ParkingLotDetailModel from '../model/ParkingLotDetailModel';
const axios = require('axios');
var updateDataInterval;
class ParkingLotDetailComponent extends ParkingLotDetailModel {
  constructor(props) {
    super(props);
  }
  state = {
    tableHead: ['Area', 'Empty', 'Booked'],
    tableData: [
      ['A1', 1, 3],
      ['A2', 1, 3],
    ],
    showBooking: false,
    showNoticeFailed: false,
    showNocticeSuccess: false,
    areaList: this.props.route.params.area,
    userID: this.props.route.params.userID,
    parkingLotID: this.props.route.params._id,
    spinner: false,
    bookingAvalable: true,
  };
  updateAreaDB(data) {
    var dataTable = [];
    for (var i = 0; i < data.length; i++) {
      var curRow = [data[i].name, data[i].freeslot, data[i].fullslot];
      // console.log(curRow);
      dataTable.push(curRow);
    }
    this.setState({tableData: dataTable});
    // console.log(this.state.tableData);
  }
  componentDidMount() {
    setTimeout(() => {
      this.updateAreaDB(this.props.route.params.area);
    }, 300);

    this.updateParkingLotDB(this.state.parkingLotID);

    // console.log('Detail Component created');
  }
  componentWillUnmount() {
    // clearInterval(updateDataInterval);
    clearInterval(updateDataInterval);
    // console.log('Detail Component mount');
  }
  async getDataFromServer(parkinglotID) {
    // console.log('DATA UPDATING');
    axios
      .get('http://gogito.duckdns.org:3002/parkinglots/' + parkinglotID)
      .then(
        response =>{
          this.setState({areaList: response.data.area});
          this.updateAreaDB(response.data.area);
        },
        error => {
          console.log(error.response.data);
        },
      );
  }
  updateParkingLotDB(parkinglotID) {
    console.log('BEGIN UPDATE DATA / 2S');
    updateDataInterval = setInterval(
      () => this.getDataFromServer(parkinglotID),
      500,
    );
  }
  stopUpdateParkingLotDB() {
    console.log('END UPDATE DATA / 2S');
    clearInterval(updateDataInterval);
  }
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parkingLotItemWrapper}
      onPress={() => {
        this.checkBookingAvailable(item.name);
      }}>
      <View style={styles.parkingLotItemNameWrapper}>
        <View>
          <Text>{item.name}</Text>
        </View>
      </View>
      <View style={styles.parkingLotItemStatusWrapper}>
        <Text>{item.freeslot}</Text>
      </View>
      <View style={styles.parkingLotItemIconWrapper}>
        <Text>{item.price + 'VND'}</Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parkingLotImgWrapper}>
          <Image
            style={styles.backgroundImg}
            source={{
              uri:
                'https://irp-cdn.multiscreensite.com/md/unsplash/dms3rep/multi/photo-1506521781263-d8422e82f27a.jpg',
            }}></Image>
        </View>
        {/* Detail */}
        <View style={styles.parkingLotDetailWrapper}>
          <View style={styles.singleDetailWrapper}>
            <Image
              style={styles.detailIcon}
              source={require('../../assets/addressIcon.png')}></Image>
            <Text style={styles.detailTittle}>Address</Text>
          </View>
          <View style={styles.singleDetailContentWrapper}>
            <Text style={styles.singleDetailContentTxt}>
              {this.props.route.params.address}
            </Text>
          </View>
          {/* NEW ITEM */}
          <View style={styles.singleDetailWrapper}>
            <Image
              style={styles.detailIcon}
              source={require('../../assets/parkingSize.png')}></Image>
            <Text style={styles.detailTittle}>Status</Text>
          </View>
          <View style={styles.singleDetailContentWrapper}>
            <ScrollView style={styles.tableScroll}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row
                  data={this.state.tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows data={this.state.tableData} textStyle={styles.text} />
              </Table>
            </ScrollView>

            {/* OVERLAY BOOKING */}
            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showParkingDetailOverlay}
              isVisible={this.state.showBooking}
              onBackdropPress={() => {
                // this.stopUpdateParkingLotDB();
                this.toggleShowParkingSLot();
              }}>
              <Text style={styles.titleList}> BOOKING</Text>
              <View style={styles.header}>
                <View style={styles.headerName}>
                  <Text style={styles.headerTxt}>Area</Text>
                </View>

                <View style={styles.headerSlot}>
                  <Text style={styles.headerTxt}>Free Slot</Text>
                </View>
                <View style={styles.headerPrice}>
                  <Text style={styles.headerTxt}>Price</Text>
                </View>
              </View>
              <FlatList
                data={this.state.areaList}
                renderItem={this.renderItem}
                keyExtractor={item => item.name}
                extraData={this.state}
              />
            </Overlay>
            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showNoticeOverlay}
              isVisible={this.state.showNoticeFailed}
              onBackdropPress={() => this.toggleShowNoticeFailed()}>
              <View style={styles.resultNotice}>
                <Image
                  style={styles.noticeIcon}
                  source={require('./../../assets/cancel.png')}></Image>
                <Text style={styles.noticeTxt}>Failed</Text>
              </View>

              <View style={styles.btnNotice}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.toggleShowNoticeFailed()}>
                  <Image
                    style={styles.noticeIconBtn}
                    source={require('./../../assets/return.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.props.navigation.navigate('home')}>
                  <Image
                    style={styles.noticeIconBtn}
                    source={require('./../../assets/home.png')}></Image>
                </TouchableOpacity>
              </View>
            </Overlay>

            <Overlay
              fullScreen="true"
              windowBackgroundColor="#EF2440"
              overlayBackgroundColor="red"
              overlayStyle={styles.showNoticeOverlay}
              isVisible={this.state.showNocticeSuccess}
              onBackdropPress={() => this.toggleShowNoticeSuccess()}>
              <Image
                style={styles.noticeIcon}
                source={require('./../../assets/success.png')}></Image>
              <Text style={styles.noticeTxt}>Success</Text>
              <TouchableOpacity></TouchableOpacity>
            </Overlay>

            <Spinner
              visible={this.state.spinner}
              textContent={'Processing...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
          {/* /////FLOAT COMPONENT */}
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => {
              this.handleBookingPress();
            }}>
            <Text style={styles.bookTxt}> BOOK </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon name="arrow-left" type="feather" color="black" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.parkingLotNameWrapper}>
          <View style={styles.parkingLotIcon}>
            <Image
              style={styles.iconSize}
              source={require('../../assets/fullSlots.png')}></Image>
          </View>
          <View style={styles.parkingLotName}>
            <Text style={styles.parkingLotNameTxt}>
              {this.props.route.params.name}
            </Text>
          </View>
        </View>
        {/* /////////////////////////////////////////// */}
      </View>
    );
  }
}

export default ParkingLotDetailComponent;
