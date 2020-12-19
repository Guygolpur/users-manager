import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {jwtHandler, signInOrUp} from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    textAlign: 'center',
    fontSize: 24,
    bottom: 40,
  },
  inputContainer: {
    top: 13,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  registrationWrapper: {
    top: 50,
  },
  registrationTitle: {
    textAlign: 'center',
  },
  registration: {
    textAlign: 'center',
    color: 'blue',
  },
  validationPopup: {
    flex: 1,
    top: 240,
  },
  validationPopupMessage: {
    fontSize: 35,
    textAlign: 'center',
    color: '#a8b1bf',
  },
  validationPopupButton: {
    paddingTop: 30,
  },
});

var statusOk = true;
var validationMessage = '';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      jwt: '',
      isPopupVisible: false,
    };
  }

  checkEmailValidation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      return true;
    } else {
      return false;
    }
  };

  onLogin() {
    const {email, password} = this.state;
    let isEmailValid = this.checkEmailValidation();
    if (isEmailValid) {
      var details = {
        email: email,
        password: password,
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('https://users-manager-server.herokuapp.com/api/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            jwt: data.token,
          });
          this.props.jwtHandler(data.token);
        })
        .catch((error) => {
          error.json().then((message) => {
            validationMessage = message.message;
            this.togglePopup();
          });
        });
    } else {
      validationMessage = 'Email is not valid';
      this.togglePopup();
    }
  }

  onCreateAccount() {
    this.props.signInOrUp(true);
  }

  togglePopup = () => {
    this.setState({isPopupVisible: !this.state.isPopupVisible});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title1}>Sign In</Text>
        <Modal isVisible={this.state.isPopupVisible}>
          <View style={styles.validationPopup}>
            <Text style={styles.validationPopupMessage}>
              {validationMessage}
            </Text>
            <View style={styles.validationPopupButton}>
              <Button title="OK" onPress={this.togglePopup} />
            </View>
          </View>
        </Modal>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            label="Email"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            label="Password"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button
            buttonStyle={{width: 150}}
            containerStyle={{margin: 5}}
            disabledStyle={{
              borderWidth: 2,
              borderColor: '#00F',
            }}
            disabledTitleStyle={{color: '#00F'}}
            linearGradientProps={null}
            iconContainerStyle={{background: '#000'}}
            loadingProps={{animating: true}}
            loadingStyle={{}}
            onPress={this.onLogin.bind(this)}
            title="Login"
            titleStyle={{marginHorizontal: 5}}
          />
          <View style={styles.registrationWrapper}>
            <Text style={styles.registrationTitle}>Dont have an account?</Text>
            <Text
              style={styles.registration}
              onPress={this.onCreateAccount.bind(this)}>
              Create New Account
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
    isAccountExists: state.isAccountExists,
  };
};

export default connect(mapStateToProps, {jwtHandler, signInOrUp})(SignIn);
