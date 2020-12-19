import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Input, Button} from 'react-native-elements';
import * as actions from '../actions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: 380
  },
  fieldStyles: {
    width: 40,
  },
  addButton: {
    marginTop: 20,
  },
  title1: {
    top: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    left: 325,
    color: 'rgba(233,166,154,0.8)',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

class UpdateUser extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'plus'} size={50} color={tintColor} />
    ),
  };

  onUpdatePress() {
    const {firstName, lastName, phone, email, company, _id, jwt} = this.props;

    this.props.saveContact({firstName, lastName, phone, email, company, _id, jwt});
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
        <SimpleLineIcons
            name={'close'}
            size={30}
            style={styles.closeIcon}
            onPress={() => this.props.noneSelected()}
          />
          <Text style={styles.title1}>Update User</Text>
          <Input
            disabledInputStyle={{background: '#ddd'}}
            leftIcon={<Icon name="user" size={20} />}
            placeholder="First Name"
            value={this.props.firstName}
            onChangeText={(value) =>
              this.props.formUpdate({prop: 'firstName', value})
            }
          />
          <Input
            disabledInputStyle={{background: '#ddd'}}
            leftIcon={<Icon name="user" size={20} />}
            placeholder="Last Name"
            value={this.props.lastName}
            onChangeText={(value) =>
              this.props.formUpdate({prop: 'lastName', value})
            }
          />
          <Input
            disabledInputStyle={{background: '#ddd'}}
            leftIcon={<Icon name="user" size={20} />}
            placeholder="Phone Number"
            value={this.props.phone.toString()}
            onChangeText={(value) =>
              this.props.formUpdate({prop: 'phone', value})
            }
          />
          <Input
            disabledInputStyle={{background: '#ddd'}}
            leftIcon={<Icon name="user" size={20} />}
            placeholder="Email Address"
            value={this.props.email}
            onChangeText={(value) =>
              this.props.formUpdate({prop: 'email', value})
            }
          />
          <Input
            disabledInputStyle={{background: '#ddd'}}
            leftIcon={<Icon name="user" size={20} />}
            placeholder="Company"
            value={this.props.company}
            onChangeText={(value) =>
              this.props.formUpdate({prop: 'company', value})
            }
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
            onPress={this.onUpdatePress.bind(this)}
            title="Update"
            titleStyle={{marginHorizontal: 5}}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    company,
    project,
    notes,
    _id,
    jwt
  } = state;
  return {firstName, lastName, phone, email, company, project, notes, _id, jwt};
};

export default connect(mapStateToProps, actions)(UpdateUser);
