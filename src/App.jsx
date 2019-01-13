import React, { Component } from 'react';
import data from './user/db';
import Store from './store/Store'

import FlowCanvasPanel from './app/FlowCanvasPanel'




export default class App extends Component {

	componentDidMount(){
		Promise.resolve(data).then(Store.flowTreeFromJSON);
	}
	render() {
		return <div>
			{/* <Form store={store}/> */}
			<FlowCanvasPanel></FlowCanvasPanel>
		</div>;
	}
}
