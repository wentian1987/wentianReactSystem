import React from 'react';
import Title from 'react-title-component';
import contributingText from '../../../../../README.md';
import MarkdownElement from '../../MarkdownElement';

const Contributing = () => (
  <div>
    <Title render={(previousTitle) => `Contributing - ${previousTitle}`} />
    <MarkdownElement text={contributingText} />
  </div>
);

export default Contributing;
