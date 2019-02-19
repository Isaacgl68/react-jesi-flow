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
class ParameterEditor extends Component {

    @observable workingData = {
        source:'',
    };
    @observable parameterLines = [{ variableName:'', variableValue:'' }];

    constructor(props) {
        super(props);
        this.workingData = Object.assign(this.workingData,props.dataType.properties);
        this.init();

    }
    init(){
        if (this.workingData.source) {
            let lines = this.workingData.source.split(';');
            this.parameterLines = lines.map(line => {
                const index =  line.indexOf('=');
                if(index > 0) {
                    return { variableName:line.substring(0,index),
                        variableValue:line.substring(index+1)};
                }else{
                    return { variableName:'', variableValue:'' }
                }
            });
        }
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

ParameterEditor.defaultProps = {
    maxRows: 0,
}

ParameterEditor.propTypes = {
    dataType: PropTypes.object.isRequired,
    maxRows:  PropTypes.number
};

export default ParameterEditor;