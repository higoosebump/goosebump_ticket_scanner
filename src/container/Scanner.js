import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QRCodeScanner from 'react-native-qrcode-scanner'

import * as scannerActions from '../redux/modules/scanner'

import StatusBar from '../components/StatusBar'
import ScannerInfo from '../components/ScannerInfo'

class Scanner extends Component {
  constructor(props) {
    super(props)
    this.state = { scanning: false }
    this.scan = this.scan.bind(this)
    this.done = this.done.bind(this)
  }

  scan(qrCode) {
    this.setState({ scanning: true })
    const { data } = qrCode
    const { scanRequest } = this.props.scannerActions
    scanRequest(data)
  }

  done() {
    this.setState({ scanning: false })
  }

  getInfo() {
    const { fetching, data, error } = this.props.scanner
    const infos = {
      scan: {
        icon: 'qrcode',
        text: 'Scan un ticket mamen',
        backgroundColor: '#0a072e'
      },
      valid: {
        icon: 'check-circle-o',
        text:
          data && data.ticket
            ? `Ticket #${data.ticket.id} : ${data.ticket.first_name} ${
                data.ticket.last_name
              }`
            : '',
        backgroundColor: '#00FF00'
      },
      invalid: {
        icon: 'times-circle-o',
        text: data && data.error ? data.error.message : '',
        backgroundColor: '#FF0000'
      },
      invalidTicket: {
        icon: 'times-circle-o',
        text:
          data && data.ticket && data.error
            ? `Ticket #${data.ticket.id} : ${data.error.message}`
            : '',
        backgroundColor: '#FF0000'
      },
      error: {
        icon: 'times-circle-o',
        text: error,
        backgroundColor: '#FF0000'
      }
    }

    const state = error
      ? 'error'
      : !this.state.scanning || fetching
        ? 'scan'
        : data && data.valid
          ? 'valid'
          : data && !data.valid && data.ticket
            ? 'invalidTicket'
            : 'invalid'

    return infos[state]
  }

  render() {
    const { fetching } = this.props.scanner
    const { icon, text, backgroundColor } = this.getInfo()

    return (
      <SafeAreaView style={{ backgroundColor }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={backgroundColor}
          networkActivityIndicatorVisible={fetching}
        />
        <QRCodeScanner onRead={this.scan} reactivate reactivateTimeout={4000} />
        <ScannerInfo
          icon={icon}
          text={text}
          backgroundColor={backgroundColor}
          done={this.done}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  scanner: state.scanner
})

const mapDispatchToProps = dispatch => ({
  scannerActions: bindActionCreators(scannerActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Scanner)
