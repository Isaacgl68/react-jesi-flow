import Store from './store';
import data from './db';

const store = new Store;

const get = () => Promise.resolve(data);

get().then(store.setState);

export default store;


