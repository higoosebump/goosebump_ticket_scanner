import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ScannerInfo extends Component {
  render() {
    const { icon, text, backgroundColor } = this.props

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.text}>{text}</Text>
        <Icon.Button
          name={icon}
          size={150}
          backgroundColor={'transparent'}
          iconStyle={styles.icon}
          onPress={this.props.done}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.4 * Dimensions.get('window').height,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  text: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
