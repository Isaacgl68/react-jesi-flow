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
import PageLayoutSidebarIcon from "mdi-react/PageLayoutSidebarLeftIcon";
import "./app.scss"
import AppConfiguration from "./controler/AppConfiguration";
import Drawer from "@material-ui/core/Drawer";
import UrlParse from 'url-parse';
import {get, put, post} from './utils/rest-utilities';


const getFlowUrl = '/api/flows/';

export default class App extends Component {
	state = {
		toggleSideMenu:false,
		drawerNotOpenedYet:true
	}

	constructor(props) {
		super(props);
		this.setToggleSideMenu = this.setToggleSideMenu.bind(this);
	}
	componentDidMount(){
		const pUrl = UrlParse(window.location, true);
		let flowId = pUrl.query['flow'] || "1";
		Store.setState({flowId});
		//Promise.resolve(data).then(Store.flowTreeFromJSON);
		get(`${getFlowUrl}${flowId}`).then(Store.flowTreeFromJSON);
	}
	setToggleSideMenu()
	{
		this.setState({toggleSideMenu: !this.state.toggleSideMenu, drawerNotOpenedYet:false});
	}
	upload(){
		put(`${getFlowUrl}${Store.flowId}`,Store.flowTree).then(resp => {
		}).catch(error => {
			if (error.status === 404){
				post(`${getFlowUrl}`,Store.flowTree);
			}
		});
	}
	render() {
		const toggleSideMenuColor = (this.state.toggleSideMenu)?'darkslategray':'inherit';
		const open = this.state.toggleSideMenu;
		const drawerPaper = (this.state.drawerNotOpenedYet)? 'drawerPaper' : 'drawerPaper drawerOpen';
		const drawer = (this.state.drawerNotOpenedYet) ? 'drawer ' : 'drawer drawerOpen';
		return <div className="root">
			<AppBar position="sticky" className="appBar">
				<Toolbar>
					<IconButton className="appMenuButton" color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className="grow">
						Flow Designer
					</Typography>
					<IconButton className="appMenuButton" color="inherit" onClick={this.upload} aria-label="Upload">
						<UploadIcon />
					</IconButton>
					<IconButton className="appMenuButton" color={toggleSideMenuColor} onClick={this.setToggleSideMenu} aria-label="sideManu">
						<PageLayoutSidebarIcon />
					</IconButton>
				</Toolbar>

			</AppBar>
			<Drawer
				className={drawer}
				variant="persistent"
				classes={{
					paper: drawerPaper,
				}}
				open={open}>
				<div/>
			</Drawer>
			<FlowCanvasPanel/>
		</div>;
	}
}
