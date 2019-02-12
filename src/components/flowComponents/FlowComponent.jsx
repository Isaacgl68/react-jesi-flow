import React, {Component, Fragment} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import './flowComponent.scss';
import ArrowDownThick from 'mdi-react/ArrowDownThickIcon';
import ArrowDown from 'mdi-react/ArrowDownIcon';
import ArrowCollapseDownIcon from "mdi-react/ArrowCollapseDownIcon";
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
import EditIcon from '@material-ui/icons/Edit';
import Store from "../../store/Store";
import FlowComponentsList from "../dialogs/FlowComponentsList";
import FlowDialog from "../dialogs/FlowDialog";




@observer
class FlowComponent extends Component {
    addDialog;
    editorDialog;
    addOperationType

    state = {
      anchorEl: null,
    };
    ;

    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type) || {};
        this.onAddClose = this.onAddClose.bind(this);
        this.onMoreClose =  this.onMoreClose.bind(this);
    }

    isOpen() {
        return (!this.config.hideMenu && Store.activeComponent === this)
    }

    getActions(){
        return  [
            {icon: <EditIcon/>, name: 'edit', disabled:!this.config.editor},
            {icon: <DeleteIcon/>, name: 'delete', disabled:(this.props.disableDelete || this.config.disableDelete)},
            {icon: <MoreVert/>, name: 'more', },
        ];
    }

    handleClick = () => {
        Store.setActiveComponent(this);
        /*this.setState(state => ({
            open: !state.open,
        }));*/
    };

    onEditorClose(){

    }
    handleActionClick = (action, e) => {
        switch (action) {
            case 'edit':
                this.editorDialog.open();
                break;
            case 'delete':
              if (this.props.onDelete){
                this.props.onDelete(this.props.flowData.key);
              }
                break;
            case 'more':
              this.setState({ anchorEl: e.currentTarget });
                break;
            default:
                break
        }
    };
    onAddClose(item){
        if (this.addOperationType === 'insertInto'){
            if (this.props.onInsert){
                this.props.onInsert(item);
            }
        }else {
                if (this.props.onAppend) {
                    this.props.onAppend(item, this.props.flowData.key);
                }
        }
    }

  onMoreClose =  action => (event) =>{
    this.setState({ anchorEl: null });
      switch (action) {
          case 'insertInto':
              this.addOperationType = 'insertInto';
              this.addDialog.open();
              break;
          case 'insertAfter':
              this.addOperationType = 'insertAfter';
              this.addDialog.open();
              break;
          case 'cut':
              if (this.props.onCut){
                  this.props.onCut(this.props.flowData.key) ;
              }
              break;
          case 'pasteInto':
              if (this.props.onPasteInsert){
                  this.props.onPasteInsert(this.props.flowData.key) ;
              }
              break;
          case 'pasteAfter':
              if (this.props.onPasteAppend){
                  this.props.onPasteAppend(this.props.flowData.key) ;
              }
              break;
          default:
              break
      }
  }

  getSubMenuItems(){
        const menuItemArray = [];
        if (this.props.allowInto){
            menuItemArray.push( <MenuItem key="insertInto" onClick={this.onMoreClose('insertInto')}>Insert Into...</MenuItem>);
        }
      if (!this.props.disableAppend && !this.config.disableAppend){
          menuItemArray.push( <MenuItem key="insertAfter" onClick={this.onMoreClose('insertAfter')}>Insert After...</MenuItem>);
      }
      if (!this.props.disableDelete && !this.config.disableDelete){
          menuItemArray.push( <MenuItem key="cut" onClick={this.onMoreClose('cut')}>Cut</MenuItem>);
      }
      if (this.props.allowInto){
          menuItemArray.push( <MenuItem key="pasteInto" onClick={this.onMoreClose('pasteInto')}>Paste Into</MenuItem>);
      }
      if (!this.props.disableAppend && !this.config.disableAppend){
          menuItemArray.push( <MenuItem key="pasteAfter" onClick={this.onMoreClose('pasteAfter')}>Paste After</MenuItem>);
      }
        return menuItemArray;
  }

    renderMoreMenu(){
      const { anchorEl } = this.state;
      return <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.onMoreClose('')}
      >
          {this.getSubMenuItems()}
      </Menu>
    }

    renderEditorDialog(){
        if (this.config.editor){
            return  <FlowDialog contentComponent={this.config.editor} onClose={this.onEditorClose}  title={ `Edit ${this.config.label}`}
                                contentComponentParams={{dataType:this.props.flowData}} maxWidth="sm"
                                ref={(editorDialog) => this.editorDialog = editorDialog}  />;
        }else return '';
    }

    renderArrow(){
      if (this.props.showArrow){
        if(this.props.arrowIconType === 'container'){
          return <ArrowCollapseDownIcon size={35} color="#3f51b5" className="arrow arrowCollapse"/>
        }else{
          return <ArrowDown size={40} color="#3f51b5" className="arrow"/>
        }

      }
      return '';
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
                    {this.getActions().map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            disabled={action.disabled}
                            tooltipPlacement="top"
                            onClick={(e) => this.handleActionClick(action.name, e)}
                        />
                    ))}
                </SpeedDial>
                <Typography variant="subtitle1" className="selectionText">
                    {this.config.label}
                </Typography>
            </div>
          { this.renderArrow()}
            <FlowDialog contentComponent={FlowComponentsList} onClose={this.onAddClose}  title="New Component"
                        ref={(addDialog) => this.addDialog = addDialog}  />
            {this.renderEditorDialog()}
            {this.renderMoreMenu()}
        </div>;


    }

}
FlowComponent.defaultProps = {
    disableAppend: false,
    disableDelete: false,
    allowInto: false,
    showArrow:true,
};


FlowComponent.propTypes = {
    flowData: PropTypes.instanceOf(BaseFlowDataType).isRequired,
    onInsert: PropTypes.func,
    onAppend: PropTypes.func,
    onDelete: PropTypes.func,
    onCut: PropTypes.func,
    onPasteInsert: PropTypes.func,
    onPasteAppend: PropTypes.func,
    allowAppend: PropTypes.bool,
    disableDelete: PropTypes.bool,
    allowInto: PropTypes.bool,
    showArrow:PropTypes.bool,
    arrowIconType:PropTypes.string
};

export default FlowComponent;
