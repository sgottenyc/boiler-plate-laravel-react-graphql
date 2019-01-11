import React from 'react';
import Example from '../../components/Example';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('Render Example', () => {
  const component = renderer.create(
    <Example name="I am example" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/* To Do: Example for testing with enzyme */
test('Example Initial State', () => {
  // Render a checkbox with label in the document
  const example = shallow(<Example name="I am example" />);
  const text = example.find('div.card-body').text();
  expect(text).toEqual("Number of times clicked 0.");
});

/* To Do: Example for testing with enzyme */
test('Example Click Once', () => {
  // Render a checkbox with label in the document
  const example = shallow(<Example name="I am example" />);
  example.find('div.card-body').simulate('click');
  const text = example.find('div.card-body').text();
  expect(text).toEqual("Number of times clicked 1.");
});
