import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Store from './../../../store/Store'
import Typography from "@material-ui/core/Typography";
import InputLabel from "./TaskEditor";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";


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

    constructor(props) {
        super(props);
        this.workingData = Object.assign(this.workingData,props.dataType.properties);

    }

    handleChange = name => event => {
        this.workingData[name]= event.target.value;
    };

    getValue() {
        const {dataType} = this.props;
        Store.assignProperties(dataType,this.workingData);
        return dataType;

    }


    render() {

        return <form>
            <Grid container direction="column" justify="center" alignItems="flex-start">
                <Typography variant="subtitle2" color="textPrimary" >
                    General Info
                </Typography>
                <FormControl className="formControl"  >
                    <InputLabel htmlFor="flowName">Flow Name</InputLabel>
                    <Select
                      value={this.workingData.flowName}
                      onChange={this.handleChange('flowName')}
                      input={<Input name="flowName" id="flowName" />}
                      className="selectEmpty"

                    >
                        <MenuItem value="CREATE">CREATE</MenuItem>
                        <MenuItem value="START">START</MenuItem>
                        <MenuItem value="SUSPEND">SUSPEND</MenuItem>
                        <MenuItem value="RESUME">RESUME</MenuItem>
                        <MenuItem value="ASSIGN">ASSIGN</MenuItem>
                        <MenuItem value="COMPLETE">COMPLETE</MenuItem>
                        <MenuItem value="REJECT">REJECT</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="fromText"
                    label="From"
                    className="textField"
                    value={this.workingData.from}
                    onChange={this.handleChange('from')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="fromText"
                    label="To"
                    className="textField"
                    value={this.workingData.to}
                    onChange={this.handleChange('to')}
                    margin="normal"
                    fullWidth
                />

            </Grid>
        </form>
    }
};

FlowEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default FlowEditor;