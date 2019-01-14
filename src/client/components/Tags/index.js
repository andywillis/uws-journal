import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

import style from './style.css';


class Tags extends Component {

  constructor(props) {
    super(props);
    this.setNode = this.setNode.bind(this);
  }

  componentDidMount() {
    const { updateTagListHeight } = this.props;
    if (updateTagListHeight) {
      setTimeout(() => {
        const { height } = window.getComputedStyle(this.node);
        updateTagListHeight(height);
      }, 500);
    }
  }


  setNode(node) {
    this.node = node;
  }

  render() {
    const { tags, cloud, tagList } = this.props;
    return (
      <nav className={style.tags}>
        <ul className={cloud && style.pad} ref={this.setNode}>
          {tags.map((tag) => {
            return (
              <Tag
                key={tag.id}
                txt={tag.txt}
                cloud={cloud}
                count={cloud && tagList[tag.txt]}
              />
            );
          })}
        </ul>
      </nav>
    );
  }
}


export default Tags;

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
