import React, { Component } from 'react';
import API from '../common/api'
const axios = require('axios');
class AddPlateModel extends Component {
    handlePlate = (text) => {
        this.setState({plateNumber: text});
      };
      registerNewPlate(plateNumber){
          // console.log(plateNumber);
          // console.log(this.props.route.params);
        axios
        .put(API.user + this.props.route.params, {
          infoArray:{
              carplateNumber: plateNumber
          }
        })
        .then((response) => {
          // console.log(JSON.stringify(response.data));
        //   this.props.navigation.navigate('login');
        })
        .catch((error) => {
          console.log(error.response.message);
        });
      };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AddPlateModel;