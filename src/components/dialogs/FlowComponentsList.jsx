import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppConfiguration from "../../controler/AppConfiguration";

class FlowComponentsList extends Component {

    state = {
        selectedItem: null,
    };

    constructor(props) {
        super(props);

    }

    handleListItemClick(event, item) {
        this.setState({selectedItem: item});
    }

    getValue() {
        return this.state.selectedItem;
    }

    renderListItems() {
        const newTypesSelectionList = AppConfiguration.newTypesSelectionList;
        const itemsList = newTypesSelectionList.map((item) => {
            const config = AppConfiguration.getTypeByName(item);
            return <ListItem button
                             key={item}
                             selected={this.state.selectedItem === item}
                             onClick={event => this.handleListItemClick(event, item)}>
                <ListItemIcon>
                    {(config.icon)?React.createElement(config.icon):React.createElement('defaultIcon')}
                </ListItemIcon>
                <ListItemText primary={config.label}/>
            </ListItem>
        });
        return itemsList;

    }

    render() {

        return <List component="nav">
            {this.renderListItems()}
        </List>
    }
};

FlowComponentsList.propTypes = {};

export default FlowComponentsList;