import React, {Component, Fragment} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import'./flowComponent.scss';

import PropTypes from 'prop-types';
import AppConfiguration from "../../controler/AppConfiguration";
import BaseContainerDataType from "../../store/dataTypes/BaseContainerDataType";
import FlowComponent from "./FlowComponent";
import Paper from "@material-ui/core/Paper";
import Store from "../../store/Store";
import CollapseIcon from "../ui/CollapseIcon";
import {SnackbarProvider, withSnackbar} from 'notistack';
import Button from "@material-ui/core/Button";




@observer
class SimpleFlowContainer extends Component {

state = {
    isCollapse: false
}
    undoKey

    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type)||{};
        this.onInsert = this.onInsert.bind(this);
        this.onAppend = this.onAppend.bind(this);
        this.onAppendSelf = this.onAppendSelf.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onDeleteSelf = this.onDeleteSelf.bind(this);
        this.onCut = this.onCut.bind(this);
        this.onCutSelf = this.onCutSelf.bind(this);
        this.onPasteInsert = this.onPasteInsert.bind(this);
        this.onPasteAppend = this.onPasteAppend.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
        this. onUndo = this.onUndo.bind(this);

    }
    onInsert(newComponentName ){
        Store.addComponent(newComponentName,this.props.flowData.children);
    }

    onAppend(newComponentName, childKey){
        Store.addComponent(newComponentName,this.props.flowData.children, childKey);
    }
    onAppendSelf(newComponentName){
        if (this.props.onAppend){
            this.props.onAppend(newComponentName,this.props.flowData.key);
        }
    }
    onDelete(childKey){
        Store.deleteComponent(childKey,this.props.flowData.children );
        this.undoKey = this.props.enqueueSnackbar('Component Deleted.', {
            action: <Button color="inherit" size="small">UNDO</Button>,
            onClickAction: this.onUndo,
            autoHideDuration: 10000,
        });
    }
    onDeleteSelf(){
        if (!this.props.isRoot && this.props.onDelete){
            this.props.onDelete(this.props.flowData.key);
        }
    }

    onUndo(){
        Store.undoLast();
        this.props.closeSnackbar(this.undoKey);
    }
    onCut(item) {
        Store.cutComponent(item, this.props.flowData.children);
        this.undoKey = this.props.enqueueSnackbar('Component Cut.', {
            action: <Button color="inherit" size="small">UNDO</Button>,
           onClickAction: this.onUndo
        });
    }
    onCutSelf(){
        if (!this.props.isRoot && this.props.onCut){
            this.props.onCut(this.props.flowData.key);
        }
    }
    onPasteInsert(){
        Store.pasteComponent(this.props.flowData.children)
    }
    onPasteAppend(item){
        Store.pasteComponent(this.props.flowData.children, item);
    }
    onPasteAppendSelf(item){
        if (this.props.onPasteAppend){
            this.props.onPasteAppend(this.props.flowData.key);
        }
    }
    renderChildrenComponents(){
        if (this.state.isCollapse) {
            return <Paper className="childrenComponentsClose"/>
        }
        return <Paper className="childrenComponents">
           {
               this.props.flowData.children.map(childData => {
                   const childConfig = AppConfiguration.getTypeByName(childData.type);
                   const isContainer = childConfig.component instanceof  SimpleFlowContainer;
                   return React.createElement(childConfig.component,{
                      flowData:childData, key:childData.key,
                      onInsert:this.onInsert, onAppend:this.onAppend,
                      onDelete:this.onDelete,
                      onPasteInsert:this.onPasteInsert, onPasteAppend:this.onPasteAppend,
                      onCut:this.onCut
                  });
               })
           }
           </Paper>;
    }
    onCollapse(collapse) {
        this.setState({isCollapse: collapse})
    }

    renderCollapse(){
        if (this.state.isCollapse) {
            return <ChevronRightIcon className="collapse" onClick={this.onCollapse}/>;
        } else{
            return <ChevronDownIcon className="collapse" onClick={this.onCollapse}/>;
        }
    }
    render() {
        return <div className="flowContainerRoot">
            <CollapseIcon onChange={this.onCollapse}/>
            <Grid container alignItems="center" justify="center" direction="column" >
            <FlowComponent onAppend={this.onAppendSelf}
                           onInsert={this.onInsert}
                           onDelete={this.onDeleteSelf}
                           onPasteInsert={this.onPasteInsert}
                           onPasteAppend={this.onPasteAppendSelf}
                           onCut={this.onCutSelf}
                           allowInto
                           arrowIconType="container"
                           flowData={this.props.flowData}></FlowComponent>
            {this.renderChildrenComponents()}
        </Grid></div>;


    }

}

SimpleFlowContainer.propTypes = {
    flowData: PropTypes.PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    onCut: PropTypes.func,
    isRoot:PropTypes.bool
};

export default withSnackbar(SimpleFlowContainer);
