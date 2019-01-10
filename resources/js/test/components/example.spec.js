import React from 'react';
import Example from '../../components/Example';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('Render Example', () => {
  const component = renderer.create(
    <Example name="I am example" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/* Example for testing with enzyme
test('Example changes after click', () => {
  // Render a checkbox with label in the document
  const example = shallow(<Example name="I am example" />);

  expect(checkbox.text()).toEqual('Off');

  example.find('input').simulate('click');

  expect(checkbox.text()).toEqual('On');
});
*/