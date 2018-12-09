import React, { Component } from 'react';
import classNames from 'classnames';

import style from './style.css';

/**
 * @function Icon
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
class Icon extends Component {

  constructor(props) {
    super(props);
    this.state = { on: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { dataset } = e.target;
    const { sticky, handleIconClick } = this.props;
    handleIconClick(dataset.type);
    if (sticky) {
      const { on } = this.state;
      this.setState({ on: !on });
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
        onClick={this.handleClick}
        data-type={type}
      />
    );
  }
}

export default Icon;
