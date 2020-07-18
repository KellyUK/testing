import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CommentList from '../CommentList';

import App from '../App';
import CommentBox from '../CommentBox';

Enzyme.configure({ adapter: new Adapter() });

let wrapped;

beforeEach(() => {
  wrapped = mount(<CommentBox />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(1);
});

it('has a text area users can type in', () => {
  wrapped.find('textarea').simulate('change', {
    target: { value: 'new comment' },
  });
  wrapped.update();
  expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
});

it('clears the text area after submit', () => {
  wrapped.find('textarea').simulate('change', {
    target: { value: 'new comment' },
  });
  wrapped.update();
  expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  wrapped.find('form').simulate('submit');
  wrapped.update();
  expect(wrapped.find('textarea').prop('value')).toEqual('');
});
