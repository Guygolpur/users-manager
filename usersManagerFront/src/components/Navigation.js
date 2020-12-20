import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {jwtHandler} from '../actions';

import UsersList from './UsersList';
import AddUser from './AddUser';

const TabNavigator = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutBtn: {
    flexDirection: 'row-reverse',
    padding: 20,
  },
});

function Navigation(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logOutBtn}>
        <Button title="Log Out" onPress={() => props.jwtHandler('')} />
      </View>
      <TabNavigator.Navigator>
        <TabNavigator.Screen
          name="Users"
          component={UsersList}
          tabBarOptions={{activeTintColor: 'green'}}
        />
        <TabNavigator.Screen name="Add" component={AddUser} />
      </TabNavigator.Navigator>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
  };
};

export default connect(mapStateToProps, {jwtHandler})(Navigation);
