import React, { Component } from 'react';

class SignupUserModel extends Component {
    handlecfPass = (text) => {
        this.setState({cfPass: text});
      };
      handleUsername = (text) => {
        this.setState({username: text});
      };
      handlePassword = (text) => {
        this.setState({password: text});
      };
    
      nextToRegister = (username, pass, cfPass) => {
        if (pass !== cfPass) {
          this.setState({showError: true});
        } else {
          // console.log(username);
          // console.log(pass);
          this.props.navigation.navigate('signupinfo',{
            username: username,
            password: pass
          });
          // this.props.navigation.navigate('signupinfo');
        }
      };
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default SignupUserModel;