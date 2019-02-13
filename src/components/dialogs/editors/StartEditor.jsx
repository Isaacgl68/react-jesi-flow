import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {pick} from "lodash";
import Store from "../../../store/Store";


@observer
class StartEditor extends Component {

    @observable workingData = {
        id:'',
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
        Store.setState({flowId:this.workingData.id});
        return dataType;

    }


    render() {

        return <form>
            <Grid container direction="column" justify="center" alignItems="flex-start">
                <TextField
                    autoFocus
                    id="nameText"
                    label="Flow Id"
                    className="textField"
                    value={this.workingData.id}
                    onChange={this.handleChange('id')}
                    margin="normal"
                    fullWidth
                />


            </Grid>
        </form>
    }
};

StartEditor.propTypes = {
    dataType: PropTypes.object.isRequired
};

export default StartEditor;