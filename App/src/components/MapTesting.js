import React, {Component, PermissionsAndroid} from 'react';
import styles from '../styles/MapStyles';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import TestBase from '../model/TestBase';
import API from '../common/api';
import {Icon, Overlay} from 'react-native-elements';
const axios = require('axios');

class MapTesting extends TestBase {
  state = {
    bookingItem: [],
    showParkingDetail: false,
    bookingDetail:{
      name: '',
      address: '',
      price: '',
      area: '',
      time: '',
    }
  };
  componentDidMount() {
    this.getHistoryFromServer();
    // console.log(this.state.bookingItem);
  }
  getBookingDetail(item) {
    this.setState({bookingDetail:{
      name: item.title,
      address: item.address,
      area: item.area,
      price: item.price,
      time: item.time
    }});
    this.toggleShowBookingDetal();
  }
  toggleShowBookingDetal() {
    this.setState({showParkingDetail: !this.state.showParkingDetail});
  }
  getHistoryFromServer() {
    axios.get(API.user + this.props.route.params + '/booking').then(
      response => {
        // console.log(response.data);
        this.createBookingHistoryList(response.data);
      },
      error => {
        console.log(error.response.data.message);
      },
    );
  }

  createBookingHistoryList(data) {
    for (var i = data.length - 1; i >= 0; i--) {
      // console.log(data);
      this.createBookingHistoryItem(data[i]);
    }
  }

  createBookingHistoryItem(data) {
    var newItem;
    newItem = {
      address: data.parkinglotAddress,
      area: data.areaName,
      price: data.price,
      title: data.parkinglotName,
      id: data._id,
      time: data.created_at,
      status: {
        icon:
          data.status == 'Failed'
            ? 'x-square'
            : data.status == 'Booked'
            ? 'clipboard'
            : 'check-square',
        color:
          data.status == 'Failed'
            ? 'red'
            : data.status == 'Booked'
            ? 'blue'
            : 'green',
        style:
          data.status == 'Failed'
            ? styles.statusAreaWrapperCancel
            : data.status == 'Booked'
            ? styles.statusAreaWrapperBooked
            : styles.statusAreaWrapperSuccess,
      },
    };
    this.addBookingHistoryItem(newItem);
    // console.log(newItem);
  }

  addBookingHistoryItem(item) {
    this.setState({bookingItem: [...this.state.bookingItem, item]});
    console.log(this.state.bookingItem);
  }
  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => {
        this.getBookingDetail(item);
      }}>
      <View style={styles.infoAreaWrapper}>
        <View style={styles.priceAreaWrapper}>
          <View style={styles.areaNameWrapper}>
            <Text>{item.area}</Text>
          </View>
          <Icon name="dollar-sign" type="feather" color="#E8D731" size={18} />
          <Text>{item.price}</Text>
        </View>
        <View style={styles.nameAreaWrapper}>
          <Text style={styles.titleTxt}> {item.title} </Text>
        </View>
        <View style={styles.detailAreaWrapper}>
          <Icon name="clock" type="feather" color="#808080" size={18} />
          <View style={styles.timeAreaWrapper}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.bottomWrapper}></View>
      </View>
      <View style={item.status.style}>
        <Icon
          name={item.status.icon}
          type="feather"
          color={item.status.color}
          size={34}
        />
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Booking history</Text>
        </View>

        <View style={styles.body}>
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
              <Icon name="dollar-sign" type="feather" color="#4A494B" size={24} />
              <View style={styles.txtInfoWrapper}>
                <Text>{this.state.bookingDetail.price}</Text>
              </View>
            </View>
            <View style={styles.infoWrapper}>
              <Icon name="arrow-left-circle" type="feather" color="#4A494B" size={24} />
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
          <FlatList
            data={this.state.bookingItem}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}
export default MapTesting;
