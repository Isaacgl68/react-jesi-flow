import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import {computed, observable} from "mobx";
import {pick} from "lodash";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Store from './../../../store/Store'
import Select from "react-select/lib/Select";
import FormLabel from "@material-ui/core/FormLabel";


const operations = [{label:"CREATE" },{label:"START" },{label:"SUSPEND" }
,{label:"RESUME" },{label:"COMPLETE" },{label:"REJECT"}];


@observer
class TaskEditor extends Component {

    @observable workingData = {
        name:'',
        id: '',
        input:'',
        operation:'CREATE'
    };


    constructor(props) {
        super(props);
        this.workingData = Object.assign(this.workingData,props.dataType.properties);

    }

    @computed get selectOperation(){
        return (this.workingData.operation)? {label : this.workingData.operation}: '';
    }

    handleSelectChange = name => (event) => {
        this.workingData[name] =  event.label;
    };

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
                    <FormLabel className="marginBottom" >Operation</FormLabel>
                    <Select      defaultOptions
                                 loadOptions={operations}
                                 value={this.selectOperation}
                                 onChange={this.handleSelectChange('operation')}/>
                </FormControl>



            </Grid>
        </form>
    }
};

TaskEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default TaskEditor;