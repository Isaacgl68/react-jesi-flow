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
import '../dialogs/dialogs.scss'





class EditSelect extends Component {

  state = {
    editOn: false,
    value:'',
    isManagingFocus: false,
  }

  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.setState({value: this.props.value});
  }
  componentWillUnmount(){
    clearTimeout(this._timeoutID);
    this._timeoutID  = null;
  }

  get selectValue(){
    return (this.state.value)? {label : this.state.value,value:this.state.value}:'';
  }

  handleSelectChange =  (event) => {
    this.setState({value:event.label})
    if (this.props.onChange){
      this.props.onChange({target:{ value:event.label}})
    }
  };

  getValue () {
    return this.state.value;
  }

  handleChange =  (event) => {
    this.setState({value:event.target.value})
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  _onBlur = () => {
    this._timeoutID = setTimeout(() => {
      if (this.state.isManagingFocus) {
        if (this.props.onBlur){
          this.props.onBlur(event);
        }
        if (this._timeoutID) {
          this.setState({
            isManagingFocus: false,
          });
        }
      }
    }, 0);
  }

  _onFocus = () => {
    clearTimeout(this._timeoutID);
    if (!this.state.isManagingFocus) {
      this.setState({
        isManagingFocus: true,
      });
    }
  }

  renderAsText(){
    const labelStyle = (this.props.formLabel)? {}:{display:'none'};
    return <FormControl required  className="formControl ignoreBlur" >
      <FormLabel className="" style={labelStyle}>{this.props.formLabel}</FormLabel>
      <TextField
        id="sourceText"
        className="textField ignoreBlur"
        value={this.state.value}
        onChange={this.handleChange}
        margin="normal"
    /></FormControl>
  }
  renderAsSelect(){

    const labelStyle = (this.props.formLabel)? {}:{display:'none'};
   return <FormControl required  className="formControl" >
      <FormLabel className="" style={labelStyle}>{this.props.formLabel}  </FormLabel>
      <AsyncSelect cacheOptions defaultOptions className="aaa"
                   styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                   menuPortalTarget={document.body}
                   menuPosition={'absolute'}
                   menuPlacement={'bottom'}
                   loadOptions={this.props.loadOptions}
                   value={this.selectValue}
                   isSearchable={this.props.isSearchable}
                   onChange={this.handleSelectChange}/>


    </FormControl>
  }

  render() {
    const iconTop = (this.props.formLabel)? 28:9;
    return <Grid  onBlur={this._onBlur}
                  onFocus={this._onFocus} container className="marginBottom" wrap="nowrap"
                  direction="row" justify="flex-start" alignItems="center" style={this.props.style} >
      { this.state.editOn ? this.renderAsText():this.renderAsSelect() }
      <IconButton style={{marginLeft:5, marginTop:iconTop, outline:'none'}} className="marginLeft ignoreBlur" color="primary"
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
  onUpdate: PropTypes.func,//for table cell editor
  loadOptions: PropTypes.func.isRequired,
  isSearchable:PropTypes.bool
};

export default EditSelect;