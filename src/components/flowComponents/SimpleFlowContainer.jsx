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


@observer
class SimpleFlowContainer extends Component {



    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type)||{};
    }
    renderChildrenComponents(){
       return <Paper className="childrenComponents">
           {
               this.props.flowData.children.map(childData => {
                   const childConfig = AppConfiguration.getTypeByName(childData.type);
                  return React.createElement(childConfig.component,{flowData:childData, key:childData.key});
               })
           }
           </Paper>;
    }
    render() {

        return <div className="flowContainerRoot"><Grid container alignItems="center" justify="center" direction="column" >
            <FlowComponent flowData={this.props.flowData}></FlowComponent>
            {this.renderChildrenComponents()}
        </Grid></div>;


    }

}

SimpleFlowContainer.propTypes = {
    flowData: PropTypes.PropTypes.instanceOf(BaseContainerDataType).isRequired,
};

export default SimpleFlowContainer;
