import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

import style from './style.css';

/**
 * @function Tags
 * @param  {type} tags Components
 * @return {type} {description}
 */
class Tags extends Component {

  componentDidMount() {
    const { updateTagListHeight } = this.props;
    if (updateTagListHeight) {
      const { height } = window.getComputedStyle(this.node);
      updateTagListHeight(height);
    }
  }

  render() {
    const { tags, cloud, tagList } = this.props;
    return (
      <div className={style.tags}>
        <ul className={cloud && style.pad} ref={node => (this.node = node)}>
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
      </div>
    );  
  }
};

export default Tags;

// Function proptypes
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
