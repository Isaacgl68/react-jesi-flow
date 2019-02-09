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
import SimpleFlowContainer from "./SimpleFlowContainer";


@observer
class RootFlowContainer extends SimpleFlowContainer {



    constructor(props) {
        super(props);

    }

   // onAppend(newComponentName){
   //     const exitKey = this.props.flowData.children[this.props.flowData.children.length-1] .key
    //    Store.addComponent(newComponentName,this.props.flowData.children,exitKey,true);
    //}

  //  onPasteAppend(item){
  //      const exitKey = this.props.flowData.children[this.props.flowData.children.length-1] .key
  //      Store.pasteComponent(this.props.flowData.children, exitKey,true);
  //  }

    onDeleteSelf(){}

    onCutSelf(){}


}

RootFlowContainer.propTypes = {
    flowData: PropTypes.PropTypes.instanceOf(BaseContainerDataType).isRequired,
    onDelete: PropTypes.func
};

export default RootFlowContainer;
