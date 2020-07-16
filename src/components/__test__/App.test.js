import React from 'react';
import ReactDOM from 'react-dom';
import enzyme from 'enzyme';
import App from '../App';

it('shows a comment box', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.innerHTML).toContain('<CommentBox/>');
  ReactDOM.unmountComponentAtNode(div);
});
