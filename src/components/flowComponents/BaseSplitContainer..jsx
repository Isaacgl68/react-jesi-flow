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
class BaseSplitContainer extends Component {



    constructor(props) {
        super(props);
        this.config = AppConfiguration.getTypeByName(this.props.flowData.type)||{};
        this.onAppend = this.onAppend.bind(this);
        this.onDeleteSelf = this.onDeleteSelf.bind(this);
        this.onCutSelf = this.onCutSelf.bind(this);
        this.onPasteAppend = this.onPasteAppend.bind(this);

    }

    onAppend(newComponentName){
        if (this.props.onAppend){
            this.props.onAppend(newComponentName,this.props.flowData.key);
        }
    }

    onDeleteSelf(){
        if (this.props.onDelete){
            this.props.onDelete(this.props.flowData.key);
        }
    }

    onCutSelf(){
        if (this.props.onCut){
            this.props.onCut(this.props.flowData.key);
        }
    }

    onPasteAppend(item){
        Store.pasteComponent(this.props.flowData.children, item);
    }

    renderChildrenComponents(){

       return  <Paper className="childrenComponents">
                <Grid container alignItems="stretch" justify="center" direction="row" wrap="nowrap">

           <SimpleFlowContainer flowData={this.props.flowData.children[0]}/>
           <SimpleFlowContainer flowData={this.props.flowData.children[1]}/>
                </Grid>
       </Paper>;
    }
    render() {
        return <div className="flowContainerRoot"><Grid container alignItems="center" justify="center" direction="column" >
            <FlowComponent onAppend={this.onAppend}
                           onDelete={this.onDeleteSelf}
                           onPasteAppend={this.onPasteAppendSelf}
                           onCut={this.onCutSelf}
                           flowData={this.props.flowData}></FlowComponent>
            {this.renderChildrenComponents()}
        </Grid></div>;


    }

}

BaseSplitContainer.propTypes = {
    flowData: PropTypes.PropTypes.instanceOf(BaseContainerDataType).isRequired,
    onDelete: PropTypes.func,
    onCut: PropTypes.func,
};

export default BaseSplitContainer;
