import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoList from './TodoList';
import styles from './Styles';
class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to your Todo List</Text>
        <Button
          title="Todo List"
          onPress={() => {
            this.props.navigation.navigate('TodoList');
          }}
        />
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  TodoList: { screen: TodoList }
});

export default Routes;
