import React, { Component } from 'react';

import Form from './user/Form';
import store from './user/resource';
import FlowCanvasPanel from './app/FlowCanvasPanel'

export default class App extends Component {
	render() {
		return <div>
			{/* <Form store={store}/> */}
			<FlowCanvasPanel></FlowCanvasPanel>
		</div>;
	}
}
