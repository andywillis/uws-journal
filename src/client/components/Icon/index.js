import React, { Component } from 'react';
import classNames from 'classnames';

import style from './style.css';


class Icon extends Component {

  constructor(props) {
    super(props);
    this.state = { on: false };
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {

    const { key, type } = e;

    if (type === 'click' || (type === 'keyup' && key === 'Enter')) {

      const { dataset } = e.target;
      const { sticky, handleIconClick } = this.props;

      handleIconClick(dataset.type);

      if (sticky) {
        const { on } = this.state;
        this.setState({ on: !on });
      }

    }
  
  }

  render() {

    const { type, active } = this.props;
    const { on } = this.state;

    const className = classNames(
      style.icon,
      active && style.active,
      on && style.on
    );

    return (
      <button
        type="button"
        className={className}
        tabIndex="0"
        aria-label={type}
        onClick={this.handleEvent}
        onKeyUp={this.handleEvent}
        data-type={type}
      />
    );
  }
}


export default Icon;
