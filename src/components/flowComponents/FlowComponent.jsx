import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import'./flowComponent.scss';
import StartIcon from '@material-ui/icons/DonutLarge';
import ArrowDownThick from 'mdi-react/ArrowDownThickIcon';


@observer
class FlowComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {config} = this.props;

        return  <div className="flowComponentRoot">
            { /* <Grid container direction="column" alignItems="center" justify="center"  spacing={24}> */}
            <div className="flowHeader">
                <Fab color="primary" aria-label="Add" className="selectionButton" size="medium">
                    <StartIcon/>
                </Fab>
                <Typography variant="subtitle1" className="selectionText">
                   Start
                </Typography>
            </div>
                <ArrowDownThick size={70} color="#3f51b5" className="arrow"/>

                {/* </Grid> */}
        </div>;


    }

}

export default FlowComponent;
