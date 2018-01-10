import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import styles from './Styles';
import { serverUrl } from './constants';
import axios from 'axios';

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  };
  componentDidMount() {
    const myToken = AsyncStorage.getItem('token')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(err);
      });
  }
  createUser = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(serverUrl, newUser)
      .then(res => {
        const token = res.data.token;
        if (token) {
          AsyncStorage.setItem('token', token)
            .then(AsyncRes => {
              //route to TOdos
              this.props.navigation.navigate('TodoList');
            })
            .catch(error => {
              throw new Error(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <TextInput
          style={styles.inputStyles}
          name="email"
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          placeholder="Email"
        />
        <TextInput
          style={styles.inputStyles}
          name="email"
          onSubmitEditing={this.createUser}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          placeholder="Password"
        />
      </View>
    );
  }
}
export default SignUp;
