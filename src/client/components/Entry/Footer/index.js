import React from 'react';

import Tags from '../../Tags';


function Footer({ tags }) {
  return ( 
    <footer>
      <Tags tags={tags} />
    </footer>
  );
}


export default Footer;
