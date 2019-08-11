import React, { PureComponent } from 'react';

import Resizable from '../Resizable/Resizable';

import css from './_TriplePane.scss';

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

  shouldRender = (mode, paneArea) => {
    if (mode === 'm1') {
      return paneArea === 'a';
    } else if (mode === 'm2' || mode === 'm3') {
      return paneArea !== 'c';
    } else {
      return true;
    }
  };

  render () {
    const { mode, areaa, areab, areac, paneClassName, id } = this.props;
    return (
      <div id={id} className={css.appcontent + ' ' + css[mode]} style={this.getGrid()}>
        {this.shouldRender(mode, areaa) ? <Resizable className={css[areaa] + ' ' + paneClassName} handlers={this.handlers[mode][areaa]} size={this.size} debouncingFunction={this.props.debouncingFunction}>
          {this.props.panea}
        </Resizable> : null}
        {this.shouldRender(mode, areab) ? <Resizable className={css[areab] + ' ' + paneClassName} handlers={this.handlers[mode][areab]} size={this.size} parentId={css.appcontent} debouncingFunction={this.props.debouncingFunction}>
          {this.props.paneb}
        </Resizable> : null}
        {this.shouldRender(mode, areac) ? <Resizable className={css[areac] + ' ' + paneClassName} handlers={this.handlers[mode][areac]} size={this.size} parentId={css.appcontent} debouncingFunction={this.props.debouncingFunction}>
          {this.props.panec}
        </Resizable> : null}
      </div>
    );
  }
}

TriplePane.defaultProps = {
  id: '',
  panec: null,
  areac: 'c'
};
