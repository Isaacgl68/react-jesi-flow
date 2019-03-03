import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import {observer} from "mobx-react";
import {computed, observable} from "mobx";
import Store from './../../../store/Store'
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import AsyncSelect from 'react-select/lib/Async';
import InputLabel from "@material-ui/core/InputLabel";
import AppModel from "../../../store/AppModel";
import FormLabel from "@material-ui/core/FormLabel";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import FunctionVariantIcon from 'mdi-react/FunctionVariantIcon';
import EditSelect from "../../ui/EditSelect";
import ParameterEditor from "./ParameterEditor";



@observer
class FlowEditor extends Component {

    @observable workingData = {
        flowName: '',
        defaultFlowName: '',
        input: '',
        parameters: '',
        synchronic: true,
        checkExist: false,
        // Additional
        parallelThreadQueue: '',
        correlationID: '',
        sourceID: '',
        sourceApp: '',
        callerID: '',
        userID: '',
        activityCode: '',
        statusCode: '',
        filter: '',
        noteText: '',

    };
    @observable viewState

    constructor(props) {
        super(props);
        this.workingData = Object.assign(this.workingData, props.dataType.properties);

    }


    @computed get selectInput(){
        return (this.workingData.input)? {label : this.workingData.input, value:this.workingData.input}: '';
    }
    @computed get selectQueue(){
        return (this.workingData.parallelThreadQueue)? {label : this.workingData.parallelThreadQueue, value:this.workingData.parallelThreadQueue}
        : '';
    }


    handleChange = name => (event) => {
        this.workingData[name] =  event.target.value;
    };

    handleSelectChange = name => (event) => {
        this.workingData[name] =  event.label;
    };

    getValue() {
        const {dataType} = this.props;
        Store.assignProperties(dataType, this.workingData);

        return dataType;

    }

    loadFlowsList() {
        return AppModel.getSLV(AppModel.slvNames.FLOWS_SLV, '1');
    }


    loadFlowVarList() {
        return AppModel.getSLV(AppModel.slvNames.FLOWS_VARS_SLV, '1');
    }

    loadQueueList() {
        return AppModel.getSLV(AppModel.slvNames.QUEUE_SLV, '1');
    }

    existsSelected = (e , val) => {
        this.workingData.checkExist = val;
    }
    synchronicSelected = (e,val) => {
        this.workingData.synchronic = val;
    }

    handleEditChange = editField => () => {
        this[editField] = !this[editField]
    }



    renderMain() {
        const showSyncGroup = (this.workingData.synchronic)?{display:'none'}:{};
        const defaultNameGroup = (this.workingData.checkExist)?{}:{display:'none'};

        return <Fragment><Grid container direction="column" justify="center" alignItems="flex-start" >
                <Typography variant="h6" color="textPrimary" className="marginBottom">
                    General Info
                </Typography>
                    <EditSelect
                        loadOptions={this.loadFlowsList}
                        value={this.workingData.flowName}
                        formLabel="Flow Name"
                        onChange={this.handleChange('flowName')}
                    />
                <FormControl className="formControl" fullWidth>
                    <FormLabel className="marginBottom" >Input</FormLabel>
                    <AsyncSelect cacheOptions defaultOptions
                                 loadOptions={this.loadFlowVarList}
                                 value={this.selectInput}
                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                 menuPortalTarget={document.body}
                                 menuPosition={'absolute'}
                                 menuPlacement={'bottom'}
                                 onChange={this.handleSelectChange('input')}/>
                </FormControl>
                <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.workingData.synchronic}
                            onChange={this.synchronicSelected}
                            value="synchronic"
                            color="primary"
                        />
                    }
                    label="Synchronic"
                    labelPlacement="end"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.workingData.checkExist}
                            onChange={this.existsSelected}
                            value="checkExist"
                            color="primary"
                        />
                    }
                    label="Only IF Exist"
                    labelPlacement="end"
                />
                </FormGroup>
                <EditSelect
                    style={defaultNameGroup}
                    loadOptions={this.loadFlowsList}
                    value={this.workingData.defaultFlowName}
                    formLabel="Default Flow"
                    onChange={this.handleChange('defaultFlowName')}
                />

            </Grid>
            <Grid container direction="column" justify="center" alignItems="flex-start" style={showSyncGroup}>
                <Typography variant="h6" color="textPrimary" className="marginBottom">
                    Event Info
                </Typography>
                <div className="marginBottom marginLeft"><Typography variant="h6"  color="textPrimary" >
                    Header Fields
                </Typography></div>
                <FormControl className="formControl" fullWidth>
                    <FormLabel className="marginBottom" >Parallel Queue</FormLabel>
                    <AsyncSelect cacheOptions defaultOptions
                                 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                 menuPortalTarget={document.body}
                                 menuPosition={'absolute'}
                                 menuPlacement={'bottom'}
                                 loadOptions={this.loadQueueList}
                                 value={this.selectQueue}
                                 onChange={this.handleSelectChange('parallelThreadQueue')}/>
                </FormControl>
                <TextField
                    id="corrlationText"
                    label="Correlation ID"
                    className="textField"
                    value={this.workingData.correlationID}
                    onChange={this.handleChange('correlationID')}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    id="sourceIDText"
                    label="Source ID"
                    className="textField"
                    value={this.workingData.sourceID}
                    onChange={this.handleChange('sourceID')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="sourceAppText"
                    label="Source Application"
                    className="textField"
                    value={this.workingData.sourceApp}
                    onChange={this.handleChange('sourceApp')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="callerIDText"
                    label="Caller ID"
                    className="textField"
                    value={this.workingData.callerID}
                    onChange={this.handleChange('callerID')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="userIDText"
                    label="User ID"
                    className="textField"
                    value={this.workingData.userID}
                    onChange={this.handleChange('userID')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="callerIDText"
                    label="Caller ID"
                    className="textField"
                    value={this.workingData.callerID}
                    onChange={this.handleChange('callerID')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="userIDText"
                    label="User ID"
                    className="textField"
                    value={this.workingData.userID}
                    onChange={this.handleChange('userID')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="activityCodeText"
                    label="Activity Code"
                    className="textField"
                    value={this.workingData.activityCode}
                    onChange={this.handleChange('activityCode')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="statusCodeText"
                    label="Status Code"
                    className="textField"
                    value={this.workingData.statusCode}
                    onChange={this.handleChange('statusCode')}
                    margin="normal"
                    fullWidth
                />


                <div className="marginLeft"><Typography variant="h6"  color="textPrimary" >
                    Data Fields
                </Typography></div>
                <TextField
                    id="filterText"
                    label="Filter"
                    className="textField"
                    value={this.workingData.filter}
                    onChange={this.handleChange('filter')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="noteTextText"
                    label="Note Text"
                    className="textField"
                    multiline
                    rows={2}
                    value={this.workingData.noteText}
                    onChange={this.handleChange('noteText')}
                    margin="normal"
                    fullWidth
                />
                <Grid container className="marginBottom" direction="row" justify="flex-start" alignItems="center" >
                    <TextField
                        style={{flexGrow:1}}
                        id="parametersText"
                        label="Parameters"
                        className="textField"
                        disabled
                        value={this.workingData.parameters}
                        onChange={this.handleChange('parameters')}
                        margin="normal"
                    />
                    <IconButton className="marginLeft" color="primary" aria-label="edit" onClick={()=> this.viewState = 'parameters' }>
                        <FunctionVariantIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Fragment>
    }

    renderParameterEditor() {
        return <ParameterEditor source={this.workingData.parameters} onBack={this.onParametersBack}/>;
    }

    renderByView(){
         if (this.viewState === 'parameters' ){
            return this.renderParameterEditor();
        }else{
            return this.renderMain();
        }
    }

    render() {
            return <form style={{height: 500}}>
                { this.renderByView()}
            </form>
    }


    onParametersBack =  (success,value) => {
        if (success){
            this.workingData.parameters =value;
        }
        this.viewState = null;

    }
};

FlowEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default FlowEditor;