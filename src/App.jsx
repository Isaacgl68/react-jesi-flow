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
import AppModel from "./store/AppModel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import SourcePanel from "./app/SourcePanel";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


const muiTheme = createMuiTheme ({
	palette: {
		primary: lightBlue,
	},
});

export default class App extends Component {
	state = {
		toggleSideMenu:false,
		drawerNotOpenedYet:true,
		activeTab: 0,
	}

	constructor(props) {
		super(props);
		this.setToggleSideMenu = this.setToggleSideMenu.bind(this);
		//this.handleTabChange = this.handleTabChange.bind(this);
	}
	componentDidMount(){
		AppModel.getFlow();
		//Promise.resolve(data).then(Store.flowTreeFromJSON);

	}

	handleTabChange = (event, activeTab) => {
		this.setState({ activeTab });
	};

	setToggleSideMenu()
	{
		this.setState({toggleSideMenu: !this.state.toggleSideMenu, drawerNotOpenedYet:false});
	}
	upload(){
		AppModel.upsertFlow();
	}
	render() {
		const toggleSideMenuColor = (this.state.toggleSideMenu)?'darkslategray':'inherit';
		const open = this.state.toggleSideMenu;
		const drawerPaper = (this.state.drawerNotOpenedYet)? 'drawerPaper' : 'drawerPaper drawerOpen';
		const drawer = (this.state.drawerNotOpenedYet) ? 'drawer ' : 'drawer drawerOpen';
		const {activeTab} = this.state;
		return <div className="root">
			<MuiThemeProvider theme={muiTheme}>
			<AppBar position="sticky" color="primary" className="appBar"
			>
				<Toolbar>
					<IconButton className="appMenuButton" color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>

					<Grid container direction="row"
								justify="flex-start"
								alignItems="center" >
					<Typography variant="h5" color="textPrimary" >
						Flow Designer
					</Typography>
					<Tabs value={activeTab} textColor="secondary" onChange={this.handleTabChange}>
						<Tab label="Design" />
						<Tab label="Source" />
						<Tab label="Test" />
					</Tabs>
					</Grid>
					<div className="grow"></div>
					<IconButton className="appMenuButton" color="inherit" onClick={this.upload} aria-label="Upload">
						<UploadIcon />
					</IconButton>
					<IconButton className="appMenuButton" color={toggleSideMenuColor} onClick={this.setToggleSideMenu} aria-label="sideManu">
						<PageLayoutSidebarIcon />
					</IconButton>
				</Toolbar>

			</AppBar>
			</MuiThemeProvider>
			<Drawer
				className={drawer}
				variant="persistent"
				classes={{
					paper: drawerPaper,
				}}
				open={open}>
				<div/>
			</Drawer>
			{activeTab === 0 && <FlowCanvasPanel/>}
			{activeTab === 1 && <SourcePanel/>}
			{activeTab === 2 && <Typography variant="h5" color="textPrimary" >
				{'Under Constriction!\n Please visit us again. It is almost ready (summer 2025)'}
			</Typography>}
		</div>;
	}
}
