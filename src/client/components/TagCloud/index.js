import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Tags from '../Tags';

import {
  toggleTagCloudVisibility,
  setTagCloudHeight
} from '../../redux/actions/journal';

import style from './style.css';

function getSortedWordArray(tags) {
  return Object.entries(tags)
    .map(([ key, count ], i) => ({ id: i, txt: key, count }))
    .sort((a, b) => a.txt > b.txt);
}

class TagCloud extends Component {

  constructor(props) {
    super(props);
    this.updateTagListHeight = this.updateTagListHeight.bind(this);
  }

  componentDidUpdate(props) {
    const { height } = props;
    document.documentElement.style.setProperty('--slide-height', height);
  }

  updateTagListHeight(height) {
    const { setTagCloudHeight } = this.props;
    setTagCloudHeight(height);
  }

  render() {

    const { visible, tagList } = this.props;

    if (tagList) {

      const arr = getSortedWordArray(tagList);
      const className = classNames(style.tagCloud, visible && style.visible);

      return (
        <React.Fragment>
          <div className={className}>
            <Tags
              tags={arr}
              tagList={tagList}
              cloud
              updateTagListHeight={this.updateTagListHeight}
            />
          </div>
        </React.Fragment>
      );
    }
    return <div />;
  }
}

function mapStateToProps(state) {
  const { tags, tagCloud } = state.journal;
  const { visible, height } = tagCloud;
  return { tagList: tags, visible, height };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTagCloudVisibility: visible => dispatch(toggleTagCloudVisibility(visible)),
    setTagCloudHeight: height => dispatch(setTagCloudHeight(height))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagCloud);
