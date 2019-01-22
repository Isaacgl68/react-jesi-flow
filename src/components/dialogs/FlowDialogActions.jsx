import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

class FlowDialogActions extends Component {


    constructor(props) {
        super(props);
    }


    render() {
        return <Fragment>
            <Button onClick={()=>this.props.onClose('cancel')} color="primary">
                Cancel
            </Button>
            <Button onClick={()=>this.props.onClose('ok')} color="default">
                Ok
            </Button>
        </Fragment>
    }
}

FlowDialogActions.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default FlowDialogActions;
