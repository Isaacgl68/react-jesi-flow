import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {pick} from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Store from './../../../store/Store'
import Switch from "@material-ui/core/Switch";


@observer
class XpathEditor extends Component {

    @observable workingData = {
        query: '',
        input: '',
        isArray: false
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
                <TextField
                    autoFocus
                    id="nameText"
                    label="Input"
                    className="textField"
                    value={this.workingData.input}
                    onChange={this.handleChange('input')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="fromText"
                    label="Query"
                    className="textField"
                    value={this.workingData.query}
                    onChange={this.handleChange('query')}
                    multiline={true}
                    rows={4}
                    rowsMax={6}
                    margin="normal"
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.workingData.isArray}
                            onChange={this.handleChange('isArray')}
                            value="isArray"
                            color="primary"
                        />
                    }
                    label="Is Array"
                    labelPlacement="start"
                />

            </Grid>
        </form>
    }
};

XpathEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default XpathEditor;