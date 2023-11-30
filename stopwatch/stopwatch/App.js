import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    };
    this.handleStartPress = this.handleStartPress.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    this.handleClearPress = this.handleClearPress.bind(this);
  }

  laps() {
    return this.state.laps.map(function (time, index) {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>Kết quả {index + 1}</Text>
          <Text style={styles.lapText}>{formatTime(time)}</Text>
        </View>
      );
    });
  }

  startStopButton() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        underlayColor="lightblue"
        onPress={this.handleStartPress}
        style={[styles.button, style]}
      >
        <Text>{this.state.running ? 'Dừng' : 'Bắt đầu'}</Text>
      </TouchableHighlight>
    );
  }

  lapButton() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="lightblue"
        onPress={this.handleLapPress}
      >
        <Text>Kết quả</Text>
      </TouchableHighlight>
    );
  }

  clearButton() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="lightblue"
        onPress={this.handleClearPress}
      >
        <Text>Xóa </Text>
      </TouchableHighlight>
    );
  }

  handleClearPress() {
  if (!this.state.running) {
    this.setState({ laps: [], timeElapsed: null });
  }
}

  handleLapPress() {
    var lap = this.state.timeElapsed;
    this.setState({
      laps: this.state.laps.concat([lap]),
    });
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
      return;
    }

    this.setState({ startTime: new Date() });
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 30);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.lapButton()}
            {this.startStopButton()}
            {this.clearButton()}
          </View>
        </View>
        <ScrollView style={styles.scrollView}>{this.laps()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  header: {
    flex: 1,
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    padding: 5,
    marginTop: 10,
  },
  button: {
    borderWidth: 5,
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
  },
  timer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
  scrollView: {
    flex: 1,
    marginTop: -150,
  },
});
