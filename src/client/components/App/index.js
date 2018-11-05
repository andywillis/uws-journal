// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

// React
import Header from '../Header';
import JournalContainer from '../../containers/Journal';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Spinner from '../Spinner';

// Redux
import { fetchData, setJournalDisplayed } from '../../redux/actions/journal';

// Style
import style from './style.css';

/**
 * @function App
 * @return {jsx} Component
 */
class App extends Component {

  static getRoutes({ isLoading, entries }) {
    if (isLoading || !entries.length) return <Spinner />;
    return (
      <Switch>
        <Route exact path="/" component={JournalContainer} />
        <Route exact path="/:type/:value" component={JournalContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }

  async componentDidMount() {
    const { fetchData, setJournalDisplayed } = this.props;
    await fetchData('/entries');
    setJournalDisplayed(true);
  }

  componentDidUpdate() {
    this.node.scrollIntoView();
  }

  render() {
    console.log(this.props)
    const { isDisplayed } = this.props;
    const appClasses = classNames(style.app, isDisplayed && style.visible);
    return (
      <div className={appClasses} ref={node => (this.node = node)}>
        <Header />
        {App.getRoutes(this.props)}
        <Footer />
      </div>
    );
  }
}

// Connect
const mapStateToProps = ({ journal }) => {
  return {
    entries: journal.entries,
    isDisplayed: journal.isDisplayed,
    isLoading: journal.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, callback) => dispatch(fetchData(url, callback)),
    setJournalDisplayed: bool => dispatch(setJournalDisplayed(bool))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

// Proptpypes
App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  setJournalDisplayed: PropTypes.func.isRequired
};
