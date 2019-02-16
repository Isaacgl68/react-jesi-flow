import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppConfiguration from "../../controler/AppConfiguration";
import DefaultIcon from 'mdi-react/RadioButtonUncheckedIcon';
import Collapse from "@material-ui/core/Collapse";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import './../flowComponents/flowComponent.scss';


class FlowComponentsList extends Component {

    state = {
        selectedItem: null,
        isCollapse:{ components: true},
    };

    constructor(props) {
        super(props);
        this.handleListItemClick = this.handleListItemClick.bind(this);

    }

    handleListItemClick = item => (event) => {
        this.setState({selectedItem: item});
    }

    getValue() {
        return this.state.selectedItem;
    }

    renderGroupItems(groupItems) {
        const itemsList = groupItems.map((item) => {
            const config = AppConfiguration.getTypeByName(item);
            return <ListItem button
                             style={{paddingLeft:20}}
                             key={item}
                             selected={this.state.selectedItem === item}
                             onClick={this.handleListItemClick(item)}>

                <ListItemIcon>
                    {(config.icon)?React.createElement(config.icon):React.createElement(DefaultIcon)}
                </ListItemIcon>
                <ListItemText primary={config.label}/>
            </ListItem>
        });
        return itemsList;

    }

    handleCollapseClick = (group) =>() => {
        this.setState({ isCollapse:{[group]: !this.state.isCollapse[group] }});
    }



    renderListItems() {
        const newTypesSelectionList = AppConfiguration.newTypesSelectionList;
        const itemsList = newTypesSelectionList.map((groupData) => {
            return <Fragment><ListItem button
                                       onClick={this.handleCollapseClick(groupData.group)}
                                       key={groupData.group}
                                     >
                <ListItemText primary={groupData.label}/>
                {this.state.isCollapse[groupData.group] ? <ChevronRightIcon/> : <ChevronDownIcon/>}
            </ListItem>
              <Collapse in={this.state.isCollapse[groupData.group]} timeout="auto" unmountOnExit>
                  <List component="nav" disablePadding key={'subList-'+groupData.group}>
                      { this.renderGroupItems(groupData.items) }
                  </List>
              </Collapse></Fragment>
        });
        return itemsList;

    }

    render() {
        return <List component="div" key={'main'}>
            {this.renderListItems()}
        </List>
    }
};

FlowComponentsList.propTypes = {};

export default FlowComponentsList;