import React, { Component } from 'react';

import styles from './style.css';

class App extends Component {

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    return <div className={styles.App}>React boilerplate app</div>;
  }

}

export default App;
