import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Store from "../store/Store"
import TextField from "@material-ui/core/TextField";




@observer
class SourcePanel extends Component {

    constructor(props) {
        super(props);
    }
    handleChange(){
        
    }


    render() {
        const  flowTree = Store.flowTree;
        if (!flowTree)return <div></div>;
        return <Grid container alignItems="flex-start" justify="flex-start" direction="row"
                     style={{marginLeft:15}}>
            <TextField
              inputProps={{
                  spellCheck: false,
              }}
              id="jsonText"
              label="Json"
              className="textField"
              value={JSON.stringify(flowTree, null, 2)}
              onChange={this.handleChange}
              multiline={true}
              margin="normal"
              fullWidth/>
        </Grid>;

    }

}

export default SourcePanel;