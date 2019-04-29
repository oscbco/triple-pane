import React, { PureComponent } from 'react';

import Resizable from '../Resizable/Resizable';

import styles from './_TriplePane.scss';
export default class TriplePane extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height
    };
  }

  size = (size) => {
    if (size) {
      this.setState(size);
    }

    return {
      width: this.state.width,
      height: this.state.height
    };
  }

  getGrid = () => {
    return {
      gridTemplateColumns: '[start]' + this.state.width + 'px [a] auto [end]',
      gridTemplateRows: '[start]' + this.state.height + 'px [a] auto [end]',
      ...this.props.style
    };
  }

  handlers = {
    m1: {
      a: []
    },
    m2: {
      a: ['e'],
      b: []
    },
    m3: {
      a: ['s'],
      b: []
    },
    m4: {
      a: ['e', 's', 'se'],
      b: ['s'],
      c: []
    },
    m5: {
      a: ['e'],
      b: ['s', 'sw'],
      c: []
    },
    m6: {
      a: ['s'],
      b: [],
      c: ['e', 'ne']
    },
    m7: {
      a: ['s', 'se'],
      b: ['w'],
      c: []
    }
  };

  render () {
    const { mode, areaa, areab, areac } = this.props;
    return (
      <div className={styles.appcontent + ' ' + styles[mode]} style={this.getGrid()}>
        <Resizable className={styles[areaa]} handlers={this.handlers[mode][areaa]} size={this.size} debouncingFunction={this.props.debouncingFunction}>
          {this.props.panea}
        </Resizable>
        {mode !== 'm1' ? <Resizable className={styles[areab]} handlers={this.handlers[mode][areab]} size={this.size} parentId={styles.appcontent} debouncingFunction={this.props.debouncingFunction}>
          {this.props.paneb}
        </Resizable> : null}
        {(mode !== 'm1' && mode !== 'm2' && mode !== 'm3') ? <Resizable className={styles[areac]} handlers={this.handlers[mode][areac]} size={this.size} parentId={styles.appcontent} debouncingFunction={this.props.debouncingFunction}>
          {this.props.panec}
        </Resizable> : null}
      </div>
    );
  }
}
