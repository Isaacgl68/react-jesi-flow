import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {pick} from "lodash";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";


@observer
class TaskEditor extends Component {

    state = {
    };
    @observable workingData = {
        name:'',
        id: '',
        input:'',
        operation:'CREATE'
    };

    constructor(props) {
        super(props);
        this.workingData = pick(props.dataType,['name', 'id', 'input', 'operation'] );
        this.workingData.operation = this.workingData.operation || 'CREATE';

    }

    handleChange = name => event => {
        this.workingData[name]= event.target.value;
    };

    getValue() {
        const {dataType} = this.props;
        dataType.name = this.workingData.name;
        dataType.id = this.workingData.id;
        dataType.input = this.workingData.input;
        dataType.operation = this.workingData.operation;
        return dataType;

    }


    render() {

        return <form>
            <Grid container direction="column" justify="center" alignItems="flex-start">
                <TextField
                    autoFocus
                    id="nameText"
                    label="Name"
                    className="textField"
                    value={this.workingData.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="idText"
                    label="Id"
                    className="textField"
                    value={this.workingData.id}
                    onChange={this.handleChange('id')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="inputText"
                    label="Input"
                    className="textField"
                    value={this.workingData.input}
                    onChange={this.handleChange('input')}
                    margin="normal"
                    fullWidth
                />
                <FormControl className="formControl"  >
                    <InputLabel htmlFor="operation">Operation</InputLabel>
                <Select
                    value={this.workingData.operation}
                    onChange={this.handleChange('operation')}
                    input={<Input name="operation" id="operation" />}
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


            </Grid>
        </form>
    }
};

TaskEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default TaskEditor;