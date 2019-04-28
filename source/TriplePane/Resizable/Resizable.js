import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './_Resizable.scss';

export default class Resizable extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    handlers: PropTypes.array.isRequired,
    size: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired
  };

  static defaultProps = {
    handlers: []
  };

  constructor (props) {
    super(props);
    this.resizableRef = React.createRef();
  }

  minSize = {
    minWidth: 70,
    minHeight: 70
  }

  mouseDown = (handle, event) => {
    event.preventDefault();
    const clientPos = {
      x: event.clientX,
      y: event.clientY
    };
    const initialSize = {
      width: this.props.size().width,
      height: this.props.size().height
    };
    const parentSize = {
      width: document.getElementById(this.props.parentId).offsetWidth,
      height: document.getElementById(this.props.parentId).offsetHeight
    };
    this.bindedMouseMove = this.mouseMove.bind(this, handle, clientPos, initialSize, parentSize);
    document.addEventListener('mousemove', this.bindedMouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  moveHandleE (event, initialPos, initialSize, parentSize) {
    let newWidth = initialSize.width + (event.clientX - initialPos.x);
    if (newWidth >= this.minSize.minWidth && newWidth <= (parentSize.width - this.minSize.minWidth)) {
      this.props.size({
        width: newWidth
      });
    }
  }

  moveHandleW (event, initialPos, initialSize, parentSize) {
    let newWidth = initialSize.width + (event.clientX - initialPos.x);
    if (newWidth >= this.minSize.minWidth && newWidth <= (parentSize.width - this.minSize.minWidth)) {
      this.props.size({
        width: newWidth
      });
    }
  }

  moveHandleS (event, initialPos, initialSize, parentSize) {
    let newHeight = initialSize.height + (event.clientY - initialPos.y);
    if (newHeight >= this.minSize.minHeight && newHeight <= (parentSize.height - this.minSize.minHeight)) {
      this.props.size({
        height: newHeight
      });
    }
  }

  moveHandleN (event, initialPos, initialSize, parentSize) {
    let newHeight = initialSize.height + (event.clientY - initialPos.y);
    if (newHeight >= this.minSize.minHeight && newHeight <= (parentSize.height - this.minSize.minHeight)) {
      this.props.size({
        height: newHeight
      });
    }
  }

  moveHandleSE (event, initialPos, initialSize, parentSize) {
    this.moveHandleE(event, initialPos, initialSize, parentSize);
    this.moveHandleS(event, initialPos, initialSize, parentSize);
  }

  mouseUp = () => {
    document.removeEventListener('mousemove', this.bindedMouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    document.body.classList.remove('notransition');
    this.props.debouncingFunction(this.props.size().width, this.props.size().height);
  }

  mouseMove (handle, initialPos, initialSize, parentSize, event) {
    switch (handle) {
      case 'e': {
        this.moveHandleE(event, initialPos, initialSize, parentSize);
        break;
      }
      case 's': {
        this.moveHandleS(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'w': {
        this.moveHandleW(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'n': {
        this.moveHandleN(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'nw': {
        this.moveHandleN(event, initialPos, initialSize, parentSize);
        this.moveHandleW(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'ne': {
        this.moveHandleN(event, initialPos, initialSize, parentSize);
        this.moveHandleE(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'sw': {
        this.moveHandleS(event, initialPos, initialSize, parentSize);
        this.moveHandleW(event, initialPos, initialSize, parentSize);
        break;
      }
      case 'se': {
        this.moveHandleS(event, initialPos, initialSize, parentSize);
        this.moveHandleE(event, initialPos, initialSize, parentSize);
        break;
      }
      default: {}
    }
  }

  render () {
    const handlerElements = this.props.handlers.map((handler) =>
      <div key={handler} className={styles[handler]} onMouseDown={this.mouseDown.bind(this, handler)} />
    );

    return (
      <div ref={this.resizableRef} className={this.props.className + ' ' + styles.resizable}>
        {handlerElements}
        {this.props.children}
      </div>
    );
  }
}
