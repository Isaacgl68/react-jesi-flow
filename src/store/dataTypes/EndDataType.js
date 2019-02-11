import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";
import ExitDataType from "./ExitDataType";

class EndDataType extends ExitDataType{
    constructor({text ='', ...config}= {}) {
        super(config);
        this.type = FlowNodeTypes.END;
        this.properties.text = text;
    }
}

export default EndDataType;