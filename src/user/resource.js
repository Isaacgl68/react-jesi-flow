import Store from '../store/Store';
import data from './db';

const store = new Store;

const get = () => Promise.resolve(data);

get().then(store.setState);

export default store;


