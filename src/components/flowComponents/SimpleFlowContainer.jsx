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
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";


@observer
class SimpleFlowContainer extends Component {

state = {
    isCollapse: false
}

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
    }
    onDeleteSelf(){
        if (this.props.onDelete){
            this.props.onDelete(this.props.flowData.key);
        }
    }
    onCut(item){
        Store.cutComponent(item, this.props.flowData.children);
    }
    onCutSelf(){
        if (this.props.onCut){
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
    onCollapse() {
    this.setState({isCollapse: !this.state.isCollapse})
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
            {this.renderCollapse()}
            <Grid container alignItems="center" justify="center" direction="column" >
            <FlowComponent onAppend={this.onAppendSelf}
                           onInsert={this.onInsert}
                           onDelete={this.onDeleteSelf}
                           onPasteInsert={this.onPasteInsert}
                           onPasteAppend={this.onPasteAppendSelf}
                           onCut={this.onCutSelf}
                           allowInto
                           flowData={this.props.flowData}></FlowComponent>
            {this.renderChildrenComponents()}
        </Grid></div>;


    }

}

SimpleFlowContainer.propTypes = {
    flowData: PropTypes.PropTypes.instanceOf(BaseContainerDataType).isRequired,
    onDelete: PropTypes.func,
    onCut: PropTypes.func,
};

export default SimpleFlowContainer;
