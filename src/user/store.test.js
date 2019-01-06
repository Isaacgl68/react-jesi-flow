import Store from './store';

describe('User store', () => {
	test('Store snap', () => {
		const store = new Store();

		expect(store).toMatchSnapshot();
	});

	test('Store object', () => {
		const store = new Store();
		const first = store.first;
		const last = store.last;
		const fullName = store.fullName;

		expect({
			first,
			last,
			fullName
		}).toMatchObject({
			first: 'Alon',
			last: 'Valadji',
			fullName: 'Alon Valadji'
		});
	});

	test('Store setState', () => {
		const store = new Store();
		store.setState({ first: 'Test', last: 'Test'});

		expect(store).toMatchSnapshot();
	})
});

