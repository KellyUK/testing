import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Root from '../root';
import App from '../components/App';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'fetched 1' }, { name: 'fetched 2' }],
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', done => {
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  wrapped.find('.fetch-comments').simulate('click');

  let request = moxios.requests.mostRecent();

  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
