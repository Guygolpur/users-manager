import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Input, Button} from 'react-native-elements';
import * as actions from '../actions';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
  },
  addButton: {
    marginTop: 20,
  },
  title1: {
    textAlign: 'center',
    fontSize: 24,
  },
});

class AddUser extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'plus'} size={50} color={tintColor} />
    ),
  };

  onAddPress() {
    const {firstName, lastName, phone, email, company, jwt} = this.props;

    this.props.createNewContact({firstName, lastName, phone, email, company, jwt});

    this.props.navigation.navigate('Users');
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title1}>Add a new user</Text>
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
            value={this.props.phone}
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
            onPress={this.onAddPress.bind(this)}
            title="Add"
            titleStyle={{marginHorizontal: 5}}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {firstName, lastName, phone, email, company, project, notes, jwt} = state;
  return {firstName, lastName, phone, email, company, project, notes, jwt};
};

export default connect(mapStateToProps, actions)(AddUser);
