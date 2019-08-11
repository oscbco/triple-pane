import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Resizable extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    handlers: PropTypes.array.isRequired,
    size: PropTypes.func.isRequired
  };

  static defaultProps = {
    handlers: []
  };

  handlerStyles = {
    e: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '100%',
      right: '-5px',
      cursor: 'col-resize',
      zIndex: '6001'
    },
    s: {
      background: 'transparent',
      position: 'absolute',
      width: '100%',
      height: '10px',
      bottom: '-5px',
      left: '0px',
      cursor: 'ns-resize',
      zIndex: '6002'
    },
    w: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '100%',
      left: '-5px',
      cursor: 'col-resize',
      zIndex: '6003'
    },
    n: {
      background: 'transparent',
      position: 'absolute',
      width: '100%',
      height: '10px',
      top: '-5px',
      cursor: 'row-resize',
      zIndex: '6004'
    },
    nw: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '10px',
      top: -'5px',
      left: -'5px',
      cursor: 'nw-resize',
      zIndex: '6005'
    },
    ne: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '10px',
      top: '-5px',
      right: '-5px',
      cursor: 'nesw-resize',
      zIndex: '6006'
    },
    sw: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '10px',
      left: '-5px',
      bottom: '-5px',
      cursor: 'nesw-resize',
      zIndex: '6007'
    },
    se: {
      background: 'transparent',
      position: 'absolute',
      width: '10px',
      height: '10px',
      bottom: '-5px',
      right: '-5px',
      cursor: 'nwse-resize',
      zIndex: '6008'
    }
  }

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
      width: this.resizableRef.current.parentNode.offsetWidth,
      height: this.resizableRef.current.parentNode.offsetHeight
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
      <div key={handler} style={this.handlerStyles[handler]} onMouseDown={this.mouseDown.bind(this, handler)} />
    );

    return (
      <div ref={this.resizableRef} className={this.props.className}>
        {handlerElements}
        {this.props.children}
      </div>
    );
  }
}
