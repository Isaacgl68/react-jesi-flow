import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import FlowComponent from "../components/flowComponents/FlowComponent";


@observer
class FlowCanvasPanel extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return <div>
                <FlowComponent></FlowComponent>
        </div>;

    }

}

export default FlowCanvasPanel;