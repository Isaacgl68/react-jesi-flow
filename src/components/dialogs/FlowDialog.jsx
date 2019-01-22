import React, {Component, Fragment} from 'react';
import * as PropTypes from "prop-types";
import FlowDialogActions from './FlowDialogActions'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';



class FlowDialog extends Component {

    state = {
        open: false,
    };
    contentComponentRef;
    constructor(props) {
        super(props);
    }

    handleActionClick = (action) => {

        switch (action) {
            case 'cancel':
                this.close();
                break;
            case 'ok':
                this.close();
                if (this.props.onClose){
                    this.props.onClose(this.contentComponentRef.getValue());
                }
                break;
            default:
                break
        }
    };

    onValueChanged(value){

    }

    open(){
        this.setState({open:true})
    };

    close(){
        this.setState({open:false})
    }

    handleEntering = () => {
    };

    createContentComponent(){
        const { contentComponent, contentComponentParams = {} } = this.props;
        contentComponentParams.ref = (ref)=> {this.contentComponentRef = ref};
            return  React.createElement(this.props.contentComponent, contentComponentParams );
    }

    render() {
        const { title, ...other } = this.props;
        return <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={this.handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={this.state.open}
        >
            <DialogTitle id="confirmation-dialog-title"><div>{title}</div></DialogTitle>
            <DialogContent>
                {this.createContentComponent()}
            </DialogContent>
            <DialogActions>
                <FlowDialogActions onClose={this.handleActionClick}></FlowDialogActions>
            </DialogActions>
        </Dialog>
    }
};

FlowDialog.propTypes = {
    onClose: PropTypes.func,
    title:PropTypes.string,
    contentComponent:PropTypes.func.isRequired,
    contentComponentParams:PropTypes.object
};

export default FlowDialog;