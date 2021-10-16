import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/AddPlateStyles'
import AddPlateModel from '../model/AddPlateModel'

class AddPlateComponent extends AddPlateModel {
  state = {
    plateNumber: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputPlate}>
          <TextInput
            style={styles.inputText}
            placeholder="XXAB.XXXX..."
            placeholderTextColor="#7575a3"
            onChangeText={this.handlePlate}
          />
        </View>
        <TouchableOpacity style={styles.btnConfirm} onPress={() => {this.registerNewPlate(this.state.plateNumber)}}>
          <Text style={styles.confirmText}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddPlateComponent;
