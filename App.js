import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';

export default class App extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: ''
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  addTodo = () => {
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
              <View>
                <View style={styles.listCont}>
                  <Text style={styles.textItem}>{item.text}</Text>
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

const styles = StyleSheet.create({
  list: {
    width: '100%'
  },
  hr: {
    height: 1,
    backgroundColor: '#d3d3d3'
  },
  textItem: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
  inputStyles: {
    borderWidth: 1,
    borderColor: '#000000',
    width: '90%',
    height: 40,
    marginBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  listCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 50,
    color: '#000000',
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
