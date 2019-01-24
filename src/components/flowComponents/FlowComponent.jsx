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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    state = {
      anchorEl: null,
    };

    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type) || {};
        this.onAddClose = this.onAddClose.bind(this);
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
    handleActionClick = (action, e) => {
        switch (action) {
            case 'add':
                this.addDialog.open();
                break;
            case 'delete':
              if (this.props.onDelete){
                this.props.onDelete(this.props.flowData.key);
              }
                break;
            case 'more':
              this.setState({ anchorEl: event.currentTarget });
                break;
            default:
                break
        }
    };
    onAddClose(item){
      if (this.props.onAdd){
        this.props.onAdd(item,this.props.flowData.key);
      }
    }

  onMoreClose(item){
    this.setState({ anchorEl: null });
  }

    renderMoreMenu(){
      const { anchorEl } = this.state;
      return <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.onMoreClose}
      >
        <MenuItem onClick={this.onMoreClose}>Insert Into</MenuItem>
        <MenuItem onClick={this.onMoreClose}>Insert After</MenuItem>
        <MenuItem onClick={this.onMoreClose}>Cut</MenuItem>
      </Menu>
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
                            onClick={(e) => this.handleActionClick(action.name, e)}
                        />
                    ))}
                </SpeedDial>
                <Typography variant="subtitle1" className="selectionText">
                    {this.config.label}
                </Typography>
            </div>
            <ArrowDownThick size={70} color="#3f51b5" className="arrow"/>
            <FlowDialog contentComponent={FlowComponentsList} onClose={this.onAddClose} ref={(addDialog) => this.addDialog = addDialog}  />
        </div>;


    }

}

FlowComponent.propTypes = {
    flowData: PropTypes.instanceOf(BaseFlowDataType).isRequired,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func
};

export default FlowComponent;
