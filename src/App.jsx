import React, { Component } from 'react';
import data from './user/db';
import Store from './store/Store'

import FlowCanvasPanel from './app/FlowCanvasPanel'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "mdi-react/MenuIcon";
import UploadIcon from "mdi-react/UploadIcon";
import PageLayoutSidebarRightIcon from "mdi-react/PageLayoutSidebarRightIcon";
import "./app.scss"
import AppConfiguration from "./controler/AppConfiguration";




export default class App extends Component {
	state = {
		toggleSideMenu:false
	}

	constructor(props) {
		super(props);
		this.setToggleSideMenu = this.setToggleSideMenu.bind(this);
	}
	componentDidMount(){
		Promise.resolve(data).then(Store.flowTreeFromJSON);
	}
	setToggleSideMenu()
	{
		this.setState({toggleSideMenu: !this.state.toggleSideMenu});
	}
	render() {
		const toggleSideMenuColor = (this.state.toggleSideMenu)?'darkslategray':'inherit';
		return <div className="root">
			<AppBar position="static" className="appBar">
				<Toolbar>
					<IconButton className="appMenuButton" color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className="grow">
						Flow Designer
					</Typography>
					<IconButton className="appMenuButton" color="inherit" aria-label="Upload">
						<UploadIcon />
					</IconButton>
					<IconButton className="appMenuButton" color={toggleSideMenuColor} onClick={this.setToggleSideMenu} aria-label="Upload">
						<PageLayoutSidebarRightIcon />
					</IconButton>
				</Toolbar>

			</AppBar>
			<FlowCanvasPanel></FlowCanvasPanel>
		</div>;
	}
}
