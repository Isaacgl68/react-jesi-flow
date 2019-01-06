import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class ExitDataType extends BaseFlowDataType{

    @observable text = '';


    constructor({text, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.EXIT;
        this.text = text;
    }

    @computed get toolTip() {
        return this.text;
    }

    @computed get outputXML() {
        const xml = `<exit text=${this.text}/>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

}

export default ExitDataType;