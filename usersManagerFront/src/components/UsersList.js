import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {connect} from 'react-redux';
import UsersItem from './UsersItem';
import UsersDetail from './UsersDetail';
import {loadInitialContacts} from '../actions';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
});

class UsersList extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  UNSAFE_componentWillMount() {
    this.props.loadInitialContacts(this.props.jwt);
  }

  renderInitialView() {
    if (this.props.detailView === true) {
      return <UsersDetail />;
    } else {
      this.props.loadInitialContacts(this.props.jwt);
      return (
        <FlatList
          data={this.props.users}
          renderItem={({item}) => <UsersItem users={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }
  render() {
    return <View style={styles.container}>{this.renderInitialView()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    detailView: state.detailView,
    jwt: state.jwt,
  };
};

export default connect(mapStateToProps, {loadInitialContacts})(UsersList);
