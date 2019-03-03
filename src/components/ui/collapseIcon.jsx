import React, { Component } from 'react';
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import PropTypes from "prop-types";




class CollapseIcon extends Component {

  state = {
    isCollapse: false
  }

  constructor(props) {
    super(props);
    this.onCollapse = this.onCollapse.bind(this);
  }
  onCollapse() {
    const newState = !this.state.isCollapse;
    if (this.props.onChange){
      this.props.onChange(newState);
    }
    this.setState({isCollapse: newState});
  }

  componentDidMount(){
    if (this.props.collapse !== this.state.isCollapse){
      this.setState({isCollapse: this.props.collapse});
    }

  }

  render(){
    if (this.state.isCollapse) {
      return <ChevronRightIcon className="collapseIcon" onClick={this.onCollapse} />;
    } else{
      return <ChevronDownIcon className="collapseIcon" onClick={this.onCollapse}/>;
    }
  }

}

CollapseIcon.propTypes = {
  collapse: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CollapseIcon;