// @flow

import React, {Component} from 'react'
import {Meteor} from 'meteor/meteor'
import Counts from '../collections/Counts'
import $ from 'jquery'

import styles from './App.css'

export default class App extends Component {
  state = {value: 0};
  observer: ?{stop: Function};
  sub: ?{stop: Function};

  componentWillMount() {
    if (Meteor.isClient) {
      this.sub = Meteor.subscribe('counts', 'a')
      this.observer = Counts.find({_id: 'a'}).observeChanges({
        added: (id: string, fields: Object): any => this.setState(fields),
        changed: (id: string, fields: Object): any => this.setState(fields),
      })
    }
  }
  componentWillUnmount() {
    if (Meteor.isClient) {
      if (this.observer != null) this.observer.stop()
      if (this.sub != null) this.sub.stop()
    }
  }

  componentDidMount() {
    $(this.refs.test).checkbox();
  }

  render(): React.Element<any> {
    return (
      <div className={styles.app}>
        <h1>Welcome to Crater!</h1>
        <h3 className="counter">Counter: {this.state.value}</h3>
        <h3>Meteor.settings.public.test: <span className="settings-test">{Meteor.settings.public.test}</span></h3>
        <div className="ui blue button">test</div>
        <div className="ui checkbox" ref="test">
          <input type="checkbox" name="test"/>
          <label>Testing</label>
        </div>
      </div>
    )
  }
}
