import React from 'react';
import { connect } from 'react-redux';

import Heading from '../../Common/Heading';
import Para from '../../Para';
import Blockquote from '../../Blockquote';
import Image from '../../Common/Image';
import Table from '../../Table';


function Body({ body, deviceWidth }) {
  return (
    <div>
      {body.map((part) => {
        switch (part.type) {
          case 'image':
            return (
              <Image
                key={part.id}
                src={part.src}
                alt={part.alt}
                deviceWidth={deviceWidth}
                percentageStretch="80"
                percentageMarginCorrection="10"
              />
            );
          case 'blockquote':
            return <Blockquote key={part.id} html={part.html} />;
          case 'h2':
            return <Heading key={part.id} level="h3" color="black">{part.txt}</Heading>            ;
          case 'table':
            return <Table key={part.id} html={part.html} />;
          default:
            return <Para key={part.id} html={part.html} />;
        }
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    deviceWidth: state.journal.deviceWidth
  };
}

export default connect(mapStateToProps)(Body);
