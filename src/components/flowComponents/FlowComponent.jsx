import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import'./flowComponent.scss';
import ArrowDownThick from 'mdi-react/ArrowDownThickIcon';
import PropTypes from 'prop-types';
import AppConfiguration from "../../controler/AppConfiguration";
import BaseContainerDataType from "../../store/dataTypes/BaseContainerDataType";
import BaseFlowDataType from "../../store/dataTypes/BaseFlowDataType";

@observer
class FlowComponent extends Component {

    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type)||{};
    }
    render() {


        return  <div className="flowComponentRoot">
            <div className="flowHeader">
                <Fab color="primary" aria-label="Add" className="selectionButton" size="medium">
                    {React.createElement(this.config.icon)}
                </Fab>
                <Typography variant="subtitle1" className="selectionText">
                   {this.config.label}
                </Typography>
            </div>
                <ArrowDownThick size={70} color="#3f51b5" className="arrow"/>
        </div>;


    }

}

FlowComponent.propTypes = {
    flowData: PropTypes.instanceOf(BaseFlowDataType).isRequired,
};

export default FlowComponent;
