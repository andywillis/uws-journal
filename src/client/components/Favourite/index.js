// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import {
  addFavourite,
  removeFavourite
} from '../../redux/actions/user';

// Style
import style from './style.css';

/**
 * @function Favourite
 * @return {jsx} Component
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

  handleFavourite() {

    const { addFavourite, removeFavourite, id } = this.props;
    const { status } = this.state;

    if (status !== 'active') {
      addFavourite(id);
    } else {
      removeFavourite(id);
    }

  }

  render() {
    const { status } = this.state;
    return (
      <div className={style.favourite}>
        <span
          tabIndex="0"
          role="button"
          className={style[status]}
          onClick={this.handleFavourite}
          onKeyUp={this.handleFavourite}
        >&#x2605;
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, newProps) => {

  const { favourites } = state.user;

  const status = favourites.includes(newProps.id)
    ? 'active'
    : 'inactive';

  return { status };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavourite: id => dispatch(addFavourite(id)),
    removeFavourite: id => dispatch(removeFavourite(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);

Favourite.propTypes = {
  status: PropTypes.string.isRequired,
  addFavourite: PropTypes.func.isRequired,
  removeFavourite: PropTypes.func.isRequired
};
