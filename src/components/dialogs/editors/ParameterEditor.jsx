import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cloneDeep from 'lodash/cloneDeep';
import '../dialogs.scss';
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { observable } from "mobx";
import {pick, remove} from "lodash";
import Store from './../../../store/Store'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'bootstrap/dist/css/bootstrap.css';
import {IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from 'mdi-react/CheckIcon'
import BackburgerIcon from 'mdi-react/BackburgerIcon';
import EditSelect from "../../ui/EditSelect";


const  options = [{
    value: 'A',
    label: 'A'
}, {
    value: 'B',
    label: 'B'
}, {
    value: 'C',
    label: 'C'
}, {
    value: 'D',
    label: 'D'
}, {
    value: 'E',
    label: 'E'
}]

@observer
class ParameterEditor extends Component {

    //@observable parameterLines = [{ variableName:'', variableValue:'' }];
    state =  {
        parameterLines:[],
        selectedRow:[]
    }
    counter = 0;
    columns = [ {
        dataField: 'variableName',
        text: 'Variable Name',
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
            <EditSelect
                loadOptions={this.loadList}
                value={value}
                { ...editorProps }
            />
        )
    },
        {
            dataField: 'variableValue',
            text: 'Variable Value',
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <EditSelect
                    loadOptions={this.loadList}
                    value={value}
                    { ...editorProps }
                />
            )
        }];

    loadList =() =>{
        return Promise.resolve(options);
    }




    constructor(props) {
        super(props);


    }
    componentDidMount(){
        this.init();
    }
    init(){
        let parameterLines = [{ key:this.counter++, variableName:'', variableValue:'' }];
        if (this.props.source) {
            let lines = this.props.source.split(';');
            parameterLines = lines.map((line,row) => {
                const index =  line.indexOf('=');
                if(index > 0) {
                    return { key:this.counter++,
                        variableName:line.substring(0,index),
                        variableValue:line.substring(index+1)};
                }else{
                    return { key:this.counter++, variableName:'', variableValue:'' }
                }
            });

        }
        this.setState({parameterLines});
    };

    onAdd = () => {
        const parameterLines = this.state.parameterLines;
        parameterLines.push({key:this.counter++ ,variableName:'', variableValue:'' });
        this.setState(parameterLines);
    };

    onDelete = () => {
    if(this.state.selectedRow && this.state.selectedRow.length> 0){
        let parameterLines = this.state.parameterLines;
        parameterLines = remove(parameterLines, (line)=>{return (line.key !== this.state.selectedRow[0]);});
        this.setState({parameterLines, selectedRow:[]});
    }

    };

    onSelect = (row, isSelect, rowIndex, e) => {
        this.setState({selectedRow:[row.key]});
    }

    onSet = () => {
        if (this.props.onBack ){
            const len = this.state.parameterLines.length-1;
            const target= this.state.parameterLines.reduce((previousValue,currentItem,index) =>{
                if (currentItem.variableName && currentItem.variableValue) {
                    return `${previousValue}${currentItem.variableName}=${currentItem.variableValue}`.concat(index !== len? ';':'')
                }else return previousValue;
            },'');
            this.props.onBack(true, target);
        }
    }
    onCancel = () => {
        if (this.props.onBack){
            this.props.onBack(false);
        }
    }



    render() {

        return <Grid container direction="column" justify="center" alignItems="flex-start" >
            <Grid container className="marginBottom" direction="row" justify="flex-start" alignItems="center" >
                <IconButton onClick={this.onDelete}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={this.onAdd}>
                    <AddIcon/>
                </IconButton>


            </Grid>
            <div style={{position: 'relative'}}>
                <BootstrapTable
                    wrapperClasses="propsTable"
                    keyField="key"
                    data={ this.state.parameterLines }
                    columns={ this.columns }
                    cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
                    selectRow={ { mode: 'radio', clickToSelect: false ,selected: this.state.selectedRow, onSelect:this.onSelect} }
                    striped
                    hover
                    condensed
                    bootstrap4
                />
            </div>
            <Grid container className="marginBottom" direction="row" justify="flex-end" alignItems="center" >
                <IconButton onClick={this.onCancel}>
                    <BackburgerIcon/>
                </IconButton>
                <IconButton onClick={this.onSet}>
                    <CheckIcon/>
                </IconButton>


            </Grid>
            </Grid>
    }


};

ParameterEditor.defaultProps = {
    maxRows: 0,
}

ParameterEditor.propTypes = {
    source: PropTypes.string.isRequired,
    maxRows:  PropTypes.number,
    onBack:PropTypes.func,
};

export default ParameterEditor;