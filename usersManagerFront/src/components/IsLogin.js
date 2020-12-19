import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {jwtHandler, signInOrUp} from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class IsLogin extends Component {
  UNSAFE_componentWillMount() {
    this.props.jwtHandler();
  }

  isLogin() {
    return (
      <NavigationContainer>
        {!this.props.jwt ? (
          <View style={styles.container}>
            {!this.props.isAccountExists ? <SignIn /> : <SignUp />}
          </View>
        ) : (
          <Navigation />
        )}
      </NavigationContainer>
    );
  }

  render() {
    return <View style={styles.container}>{this.isLogin()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
    isAccountExists: state.isAccountExists,
  };
};

export default connect(mapStateToProps, {jwtHandler, signInOrUp})(IsLogin);
