import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FlowComponent from "../components/flowComponents/FlowComponent";
import BaseFlowDataType from "../store/dataTypes/BaseFlowDataType";
import AppConfiguration from "../controler/AppConfiguration";
import * as FlowNodeTypes from "../utils/consts/FlowNodeTypes";
import BaseContainerDataType from "../store/dataTypes/BaseContainerDataType";
import SimpleFlowContainer from "../components/flowComponents/SimpleFlowContainer";
import Store from "../store/Store"
import RootFlowContainer from "../components/flowComponents/RootFlowContainer";


@observer
class FlowCanvasPanel extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const  startData = Store.flowTree;
        if (!startData)return <div></div>;
        //const childData = new BaseFlowDataType({type:FlowNodeTypes.ASSIGN});
        //startData.children = [childData];
        return <Grid container alignItems="center" justify="center" direction="column">
                <RootFlowContainer flowData={startData}></RootFlowContainer>
        </Grid>;

    }

}

export default FlowCanvasPanel;