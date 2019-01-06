import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import'./flowComponent.scss';
import StartIcon from '@material-ui/icons/DonutLarge';

@observer
class FlowComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {config} = this.props;
        return <Grid container alignItems="center" className="flowComponentRoot" justify="center"  spacing={24}>
                <Fab color="primary" aria-label="Add" className="selectionButton" size="medium">
                    <StartIcon/>
                </Fab>
                <Typography variant="subtitle1" className="selectionText">
                   Start
                </Typography>
            </Grid>;


    }

}

export default FlowComponent;
