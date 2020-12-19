import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {getTheme} from 'react-native-material-kit';
import * as actions from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
    top: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  title2: {
    top: 35,
    textAlign: 'center',
    fontSize: 18,
  },
  contactDetails: {
    top: 55,
  },
  image: {
    flex: 0,
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    left: 325,
    color: 'rgba(233,166,154,0.8)',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
    width: 260,
  },
  textIcons: {
    color: '#26a69a',
  },
  actionArea: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  editIcon: {
    color: '#26a6e4',
  },
  deleteIcon: {
    color: '#e9a69a',
  },
  sections: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    width: 100,
  },
  editDeleteArea: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211, 0.3)',
  },
});

class DetailView extends Component {
  updateTest() {
    this.props.updateContact(this.props.userSelected);
  }
  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require('../images/background.jpg')}
            style={[theme.cardImageStyle, styles.image]}
          />
          <EvilIcon name={'user'} size={100} style={styles.icon} />
          <SimpleLineIcons
            name={'close'}
            size={30}
            style={styles.closeIcon}
            onPress={() => this.props.noneSelected()}
          />
          <Text style={(theme.cardTitleStyle, styles.title1)}>
            {this.props.userSelected.firstName}{' '}
            {this.props.userSelected.lastName}
          </Text>
          <Text style={(theme.cardTitleStyle, styles.title2)}>
            from {this.props.userSelected.company}
          </Text>
          <View style={styles.contactDetails}>
            <View style={styles.textArea}>
              <MaterialCommunityIcons
                name={'phone'}
                size={30}
                style={styles.textIcon}
              />
              <Text style={theme.cardContentStyle}>
                {this.props.userSelected.phone}
              </Text>
            </View>

            <View style={styles.textArea}>
              <MaterialCommunityIcons
                name={'email'}
                size={30}
                style={styles.textIcon}
              />
              <Text style={theme.cardContentStyle}>
                {this.props.userSelected.email}
              </Text>
            </View>
          </View>
          <View style={styles.editDeleteArea}>
            <TouchableOpacity style={styles.sections}>
              <MaterialCommunityIcons
                name={'autorenew'}
                size={40}
                style={styles.editIcon}
                onPress={() => {
                  this.updateTest();
                }}
              />
              <Text style={theme.cardContentStyle}>EDIT</Text>
            </TouchableOpacity>
            <View style={styles.editArea}>
              <TouchableOpacity
                style={styles.sections}
                onPress={() => {
                  this.props.deleteContact(
                    this.props.userSelected._id,
                    this.props.jwt,
                  );
                }}>
                <MaterialCommunityIcons
                  name={'delete-forever'}
                  size={40}
                  style={styles.deleteIcon}
                />
                <Text style={theme.cardContentStyle}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSelected: state.userSelected,
    toUpdate: state.toUpdate,
    jwt: state.jwt,
  };
};

export default connect(mapStateToProps, actions)(DetailView);
