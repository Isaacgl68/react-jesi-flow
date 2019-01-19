import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import './flowComponent.scss';
import ArrowDownThick from 'mdi-react/ArrowDownThickIcon';
import PropTypes from 'prop-types';
import AppConfiguration from "../../controler/AppConfiguration";
import BaseFlowDataType from "../../store/dataTypes/BaseFlowDataType";
//////////////////
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Store from "../../store/Store";
import FlowComponentsList from "../dialogs/FlowComponentsList";
import FlowDialog from "../dialogs/FlowDialog";


const actions = [
    {icon: <AddIcon/>, name: 'add'},
    {icon: <DeleteIcon/>, name: 'delete'},
    {icon: <MoreVert/>, name: 'more'},

];

@observer
class FlowComponent extends Component {
    addDialog;


    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type) || {};
    }

    isOpen() {
        return (!this.config.hideMenu && Store.activeComponent === this)
    }

    handleClick = () => {
        Store.setActiveComponent(this);
        /*this.setState(state => ({
            open: !state.open,
        }));*/
    };
    handleActionClick = (action) => {
        switch (action) {
            case 'add':
                this.addDialog.open();
                break;
            case 'delete':
                break;
            case 'more':
                break;
            default:
                break
        }
    };
    onAddClose(item){

    }

    render() {

        return <div className="flowComponentRoot">
            <div className="flowHeader">
                <SpeedDial
                    className="selectionButton"
                    ariaLabel={"SpeedDial" + this.props.flowData.key}
                    icon={<SpeedDialIcon icon={React.createElement(this.config.icon)}/>}
                    onClick={this.handleClick}
                    open={this.isOpen()}
                    direction="left"
                    hidden={false}
                >
                    {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipPlacement="top"
                            onClick={this.handleActionClick(action.name)}
                        />
                    ))}
                </SpeedDial>
                <Typography variant="subtitle1" className="selectionText">
                    {this.config.label}
                </Typography>
            </div>
            <ArrowDownThick size={70} color="#3f51b5" className="arrow"/>
            <FlowDialog contentComponent={FlowComponentsList} onClose={this.onAddClose} ref={this.addDialog}  />
        </div>;


    }

}

FlowComponent.propTypes = {
    flowData: PropTypes.instanceOf(BaseFlowDataType).isRequired,
};

export default FlowComponent;
