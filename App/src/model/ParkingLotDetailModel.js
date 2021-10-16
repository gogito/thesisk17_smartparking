import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from '../styles/ParkingLotDetailStyles';
import API from '../common/api'
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Overlay} from 'react-native-elements';
// import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
const axios = require('axios');
var updateDataInterval;
class ParkingLotDetailModel extends Component {

    
      toggleShowParkingSLot() {
        // console.log(this.state.showBooking);
        this.setState({showBooking: !this.state.showBooking});
      }
      toggleShowNoticeFailed() {
        // console.log(this.state.showBooking);
        this.setState({showNoticeFailed: !this.state.showNoticeFailed});
      }
      toggleShowNoticeSuccess() {
        // console.log(this.state.showBooking);
        this.setState({showNocticeSuccess: !this.state.showNocticeSuccess});
      }
      addItemToList(item) {
        this.state.areaList.push(item);
        // console.log(this.state.areaList);
      }
      createAreaList() {
        this.setState({areaList: []});
        // console.log(this.state.areaList);
        var data = this.props.route.params.area;
        for (var i = 0; i < data.length; i++) {
          if (data[i].freeslot != '0')
            var curItem = {
              areaName: data[i].name.toString(),
              emptySlot: data[i].freeslot,
              price: data[i].price,
            };
    
          this.addItemToList(curItem);
          // console.log(curItem);
        }
        // console.log(this.state.areaList);
      }
      handleBookingPress() {
        this.toggleShowParkingSLot();
        // this.createAreaList();
      }
      checkBookingAvailable(area) {
        axios.get(API.user + this.state.userID).then(
          response => {
            // console.log(JSON.stringify(response.data.currentBooking));
            curBooking = response.data.currentBooking;
            if (
              response.data.currentBooking === undefined ||
              response.data.currentBooking === ''
            ) {
              // this.setState({bookingAvalable: false});
              this.booking(area);
            } else {
              this.setState({spinner: false});
              this.toggleShowNoticeFailed();
              // this.setState({bookingAvalable: true});
            }
          },
          error => {
            console.log(error.response.data);
          },
        );
        this.setState({spinner: false});
        // console.log(this.state.bookingAvalable);
        // return this.state.bookingAvalable;
      }
      booking(area) {
        axios
          .post(API.booking, {
            userID: this.state.userID,
            parkinglotID: this.state.parkingLotID,
            areaName: area,
          })
          .then(
            response => {
              // console.log(JSON.stringify(response.data));
              this.setState({spinner: false});
              this.toggleShowNoticeSuccess();
            },
            error => {
              console.log(error.response.data.message);
              this.setState({spinner: false});
              this.toggleShowNoticeFailed();
            },
          );
      }
     
      renderSuccessBooking() {
        return (
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showParkingDetailOverlay}
            isVisible={this.state.showNotice}
            onBackdropPress={() => this.toggleShowNotice()}>
            <Image
              style={styles.noticeIcon}
              source={require('./../../assets/success.png')}></Image>
          </Overlay>
        );
      }
      renderFailedBooking() {
        return (
          <Overlay
            fullScreen="true"
            windowBackgroundColor="#EF2440"
            overlayBackgroundColor="red"
            overlayStyle={styles.showParkingDetailOverlay}
            isVisible={this.state.showNotice}
            onBackdropPress={() => this.toggleShowNotice()}>
            <Image
              style={styles.noticeIcon}
              source={require('./../../assets/cancel.png')}></Image>
          </Overlay>
        );
      }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ParkingLotDetailModel;