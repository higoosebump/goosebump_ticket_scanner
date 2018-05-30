import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'

export default class StyledStatusBar extends Component {
  render() {
    const majorVersionIOS = parseInt(Platform.Version, 10)
    const height = majorVersionIOS < 11 ? 20 : 0

    return (
      <View
        style={{
          height: Platform.OS === 'ios' ? height : StatusBar.currentHeight,
          backgroundColor: this.props.backgroundColor
        }}>
        <StatusBar translucent {...this.props} />
      </View>
    )
  }
}
