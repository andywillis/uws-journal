import React, { Component } from 'react';
import { connect } from 'react-redux';
import compileClasses from 'classnames';

import {
  addFavourite,
  removeFavourite
} from '../../redux/actions/user';

import style from './style.css';


/**
 * Favourite box with click/key accessibilty
 *
 * @class Favourite
 * @extends {Component}
 */
class Favourite extends Component {

  constructor(props) {
    super(props);
    this.state = { status: props.status };
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ status: newProps.status });
  }

  handleFavourite(e) {

    const { key, type } = e;

    if (type === 'click' || (type === 'keyup' && key === 'Enter')) {

      const { addFavourite, removeFavourite, id } = this.props;
      const { status } = this.state;

      if (status !== 'active') {
        addFavourite(id);
      } else {
        removeFavourite(id);
      }

    }

  }

  render() {
    const { status } = this.state;
    const classNames = compileClasses(style.favourite, style[status]);
    return (
      <button
        className={classNames}
        type="button"
        tabIndex="0"
        onClick={this.handleFavourite}
        onKeyUp={this.handleFavourite}
      >&#x2605;
      </button>
    );
  }
}


function mapStateToProps(state, newProps) {
  const { favourites } = state.user;
  const status = favourites.includes(newProps.id)
    ? 'active'
    : 'inactive';
  return { status };
}

function mapDispatchToProps(dispatch) {
  return {
    addFavourite: id => dispatch(addFavourite(id)),
    removeFavourite: id => dispatch(removeFavourite(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
