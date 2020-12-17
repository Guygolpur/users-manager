import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import DetailView from './DetailView';
import UpdateUser from './UpdateUser';
import * as actions from '../actions';

class UsersDetail extends Component {
  renderDetails() {
    if (this.props.toUpdate) {
      return <UpdateUser />;
    } else {
      return <DetailView />;
    }
  }

  render() {
    return <View>{this.renderDetails()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    toUpdate: state.toUpdate,
  };
};

export default connect(mapStateToProps, actions)(UsersDetail);
