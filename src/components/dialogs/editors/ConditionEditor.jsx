import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {pick} from "lodash";
import Store from './../../../store/Store'


@observer
class ConditionEditor extends Component {

    @observable workingData = {
        name:'',
        condition: ''
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
                    label="Name"
                    className="textField"
                    value={this.workingData.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="conditionText"
                    label="Condition"
                    className="textField"
                    value={this.workingData.condition}
                    onChange={this.handleChange('condition')}
                    margin="normal"
                    fullWidth
                />

            </Grid>
        </form>
    }
};

ConditionEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default ConditionEditor;