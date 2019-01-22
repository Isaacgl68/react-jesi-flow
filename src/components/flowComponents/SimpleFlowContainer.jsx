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


@observer
class SimpleFlowContainer extends Component {



    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type)||{};
        this.onInsert = this.onInsert.bind(this);
        this.onAppend = this.onAppend.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onDeleteSelf = this.onDeleteSelf.bind(this);
    }
    onInsert(newComponentName, childKey ){
        Store.addComponent(newComponentName,this.props.flowData.children, childKey);
    }
    onAppend(newComponentName){
        Store.addComponent(newComponentName,this.props.flowData.children);
    }
    onDelete(childKey){
        Store.deleteComponent(childKey,this.props.flowData.children );
    }
    onDeleteSelf(){
        if (this.props.onDelete){
            this.props.onDelete(this.props.flowData.key);
        }
    }
    renderChildrenComponents(){
       return <Paper className="childrenComponents">
           {
               this.props.flowData.children.map(childData => {
                   const childConfig = AppConfiguration.getTypeByName(childData.type);
                  return React.createElement(childConfig.component,{flowData:childData, key:childData.key,
                      onAdd:this.onInsert, onDelete:this.onDelete});
               })
           }
           </Paper>;
    }
    render() {
        return <div className="flowContainerRoot"><Grid container alignItems="center" justify="center" direction="column" >
            <FlowComponent onAdd={this.onAppend} onDelete={this.onDeleteSelf} flowData={this.props.flowData}></FlowComponent>
            {this.renderChildrenComponents()}
        </Grid></div>;


    }

}

SimpleFlowContainer.propTypes = {
    flowData: PropTypes.PropTypes.instanceOf(BaseContainerDataType).isRequired,
    onDelete: PropTypes.func
};

export default SimpleFlowContainer;
