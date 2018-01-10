import React from 'react';
import axios from 'axios';

import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';

import styles from './Styles';
import { serverUrl } from './constants';

export default class TodoList extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: ''
  };

  componentDidMount() {
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        if (token !== null) {
          axios
            .get(serverUrl, {
              headers: {
                Authorization: token
              }
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.data
                };
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  }

  componentWillUnmount() {
    const tasks = this.state.tasks.slice();
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleTextChange = text => {
    this.setState({ text });
  };

  addTodo = () => {
    console.log('clicked');
    if (this.state.text === '') {
      this.setState({ error: `No message in text field.` });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 2000);
      return;
    }
    this.setState(prevState => {
      let { text, tasks } = prevState;
      return {
        tasks: tasks.concat({ key: tasks.length, text }),
        text: ''
      };
    });
  };

  deleteTask = index => {
    this.setState(prevState => {
      let tasks = prevState.tasks.slice();
      tasks.splice(index, 1);
      return { tasks };
    });
  };

  render() {
    // console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.tasks.length > 0
            ? 'You have stuff to do!'
            : `You're free to play PUBG`}
        </Text>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) => {
            return (
              <View key={item._id}>
                <View style={styles.listCont}>
                  <Text style={styles.textItem}>{item.email}</Text>
                  <Button onPress={() => this.deleteTask(index)} title="X" />
                </View>
                <View style={styles.hr} />
              </View>
            );
          }}
        />
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Task"
        />
      </View>
    );
  }
}
