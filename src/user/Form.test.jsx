import React from 'react';
import Form from './Form';
import renderer from 'react-test-renderer';

describe('User', () => {
	test('<Form />', () => {
		const tree = renderer
			.create(<Form />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('<Form /> with store', () => {
		const store = {
			first: 'Test',
			last: 'Test',
			fullName: 'Test Test'
		};

		const tree = renderer
			.create(<Form store={store} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	})
});
