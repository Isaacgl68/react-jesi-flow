import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ToggleIcon from 'material-ui-toggle-icon'
import IconButton  from '@material-ui/core/IconButton';
import PencilIcon from 'mdi-react/PencilIcon';
import PencilIOffIcon from 'mdi-react/PencilOffIcon';
import TextField from "@material-ui/core/TextField";





class EditSelect extends Component {

  state = {
    editOn: false
  }

  constructor(props) {
    super(props);
  }


  componentDidMount(){

  }

  get selectValue(){
    return (this.props.value)? {label : this.props.value,value:this.props.value}:'';
  }

  handleSelectChange =  (event) => {
    if (this.props.onChange){
      this.props.onChange({target:{ value:event.label}})
    }
  };

  handleChange =  (event) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };
  renderAsText(){
    return <FormControl required  className="formControl">
      <FormLabel className="" >{this.props.formLabel}</FormLabel>
      <TextField
        id="sourceText"
        className="textField"
        value={this.props.value}
        onChange={this.handleChange}
        margin="normal"
    /></FormControl>
  }
  renderAsSelect(){
   return <FormControl required  className="formControl">
      <FormLabel className="" >{this.props.formLabel}</FormLabel>
      <AsyncSelect cacheOptions defaultOptions className="aaa"
                   loadOptions={this.props.loadOptions}
                   value={this.selectValue}
                   isSearchable={this.props.isSearchable}
                   onChange={this.handleSelectChange}/>

    </FormControl>
  }

  render() {
    return <Grid container className="marginBottom" direction="row" justify="flex-start" alignItems="center" style={this.props.style}>
      { this.state.editOn ? this.renderAsText():this.renderAsSelect() }
      <IconButton style={{marginLeft:5, marginTop:28, outline:'none'}} className="marginLeft" color="primary"
          onClick={() => this.setState({ editOn: !this.state.editOn })}
      >
        <ToggleIcon
            on={this.state.editOn}
            onIcon={<PencilIcon />}
            offIcon={<PencilIOffIcon />}
        />
      </IconButton>

    </Grid>
  }

}

EditSelect.propTypes = {
  value: PropTypes.string,
  formLabel:PropTypes.string,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func.isRequired,
  isSearchable:PropTypes.bool
};

export default EditSelect;