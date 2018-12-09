import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header';
import JournalContainer from '../../containers/Journal';
import Footer from '../Footer';
import NotFound from '../NotFound';
import TagCloud from '../TagCloud';
import Spinner from '../Spinner';

import {
  fetchData,
  setJournalDisplayed,
  toggleTagCloudVisibility
} from '../../redux/actions/journal';

import style from './style.css';

const icons = [
  { id: 3, type: 'tagcloud', active: true, sticky: true },
  { id: 0, type: 'mail', active: true },
  { id: 1, type: 'flickr', active: true },
  { id: 4, type: 'rss', active: false }
];

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
        <Route exact path="/:viewType/:value" component={JournalContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }

  constructor(props) {
    super(props);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  async componentDidMount() {
    const { fetchData, setJournalDisplayed } = this.props;
    await fetchData('/entries');
    setJournalDisplayed(true);
  }

  componentDidUpdate() {
    this.node.scrollIntoView();
  }

  handleIconClick(type) {

    const { toggleTagCloudVisibility } = this.props;

    switch (type) {
      case 'mail': {
        const address = 'dev@awillis.fastmail.fm';
        const subject = 'Message from uws site';
        window.location.href = [
          'mailto:', address, '?', 'subject=', subject
        ].join('');
        break;
      }

      case 'flickr': {
        window.open('https://www.flickr.com/photos/urbanwhaleshark/');
        break;
      }

      case 'twitter': {
        window.open('https://twitter.com/urbanwhaleshark');
        break;
      }

      case 'tagcloud': {
        toggleTagCloudVisibility();
        break;
      }

      default:
        break;
    }
  }

  render() {

    const { tagCloudVisibility } = this.props;

    return (
      <div className={style.app} ref={node => (this.node = node)}>
        <Header icons={icons} handleIconClick={this.handleIconClick} />
        <TagCloud visible={tagCloudVisibility} />
        {App.getRoutes(this.props)}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ journal }) => {
  return {
    entries: journal.entries,
    isLoading: journal.isLoading,
    tagCloudVisibility: journal.tagCloud.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, callback) => dispatch(fetchData(url, callback)),
    setJournalDisplayed: bool => dispatch(setJournalDisplayed(bool)),
    toggleTagCloudVisibility: () => dispatch(toggleTagCloudVisibility())
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
