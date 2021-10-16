import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import styles from '../styles/UserProfileStyles'
class UserProfileComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(
    //   this.props.route.params.name.FName +
    //     ' ' +
    //     this.props.route.params.name.LName,
    // );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
              }}
            />

            <Text style={styles.name}>
              {this.props.route.params.name.FName +
                ' ' +
                this.props.route.params.name.LName}{' '}
            </Text>
            <Text style={styles.userInfo}>
              {this.props.route.params.email}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <Image
              style={styles.icon}
              source={require('../../assets/personal-id.png')}></Image>
            <View style={styles.info}>
              <Text style={styles.infoContent}>{"      " + this.props.route.params.personalID}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default UserProfileComponent;
