import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoList from './TodoList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from './Styles';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome to your Todo List Please sign in
        </Text>
        <Button
          title="Sign In"
          onPress={() => {
            this.props.navigation.navigate('SignIn');
          }}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  TodoList: { screen: TodoList },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
});

export default Routes;
