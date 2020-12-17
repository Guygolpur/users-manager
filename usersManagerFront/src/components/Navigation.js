import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UsersList from './UsersList';
import AddUser from './AddUser';

const TabNavigator = createBottomTabNavigator();

function Navigation() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="Users" component={UsersList} />
      <TabNavigator.Screen name="Add" component={AddUser} />
    </TabNavigator.Navigator>
  );
}

export default Navigation;
