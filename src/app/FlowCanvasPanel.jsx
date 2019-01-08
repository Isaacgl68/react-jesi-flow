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


@observer
class FlowCanvasPanel extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const startData = new BaseContainerDataType({type:FlowNodeTypes.START});
        return <Grid container alignItems="center" justify="center" direction="column">
                <SimpleFlowContainer flowData={startData}></SimpleFlowContainer>
        </Grid>;

    }

}

export default FlowCanvasPanel;