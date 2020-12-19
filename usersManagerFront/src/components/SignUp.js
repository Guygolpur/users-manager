import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {signInOrUp, jwtHandler} from '../actions';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    textAlign: 'center',
    fontSize: 24,
    bottom: 50,
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
var validationMessage = '';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      jwt: '',
      isPopupVisible: false,
    };
  }

  togglePopup = () => {
    this.setState({isPopupVisible: !this.state.isPopupVisible});
  };

  checkEmailValidation() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      return true;
    } else {
      return false;
    }
  }

  onSignUp() {
    const {email, password, rePassword} = this.state;
    let isEmailValid = this.checkEmailValidation();
    if (isEmailValid) {
      if (
        password.localeCompare(rePassword) === 0 &&
        password.length > 0 &&
        rePassword.length > 0
      ) {
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

        fetch('https://users-manager-server.herokuapp.com/api/admins/signup', {
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
            this.props.signInOrUp(false);
          })
          .catch((error) => {
            error.json().then((message) => {
              validationMessage = message.msg;
              this.togglePopup();
            });
          });
      } else {
        validationMessage = 'Passwords are not equale';
        this.togglePopup();
      }
    } else {
      validationMessage = 'Email is not valid';
      this.togglePopup();
    }
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <Icon
          name="arrow-back-circle-outline"
          color="#00aced"
          size={60}
          onPress={() => {
            this.props.signInOrUp(false);
          }}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title1}>Create New Account</Text>
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
          <View style={styles.container}>
            <TextInput
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              label="Email Address"
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              label="Password"
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              value={this.state.rePassword}
              onChangeText={(rePassword) => this.setState({rePassword})}
              label="Confirm Password"
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
              onPress={this.onSignUp.bind(this)}
              title="Sign up"
              titleStyle={{marginHorizontal: 5}}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAccountExists: state.isAccountExists,
  };
};

export default connect(mapStateToProps, {jwtHandler, signInOrUp})(SignUp);
