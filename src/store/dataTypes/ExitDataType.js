import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class ExitDataType extends BaseFlowDataType{


    properties ={
        text: ''
    }

    constructor({text = '', ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.EXIT;
        this.properties.text = text;
    }

    @computed get toolTip() {
        return this.properties.text;
    }

    @computed get outputXML() {
        const xml = `<exit text=${this.properties.text}/>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

    toJSON(){
        let obj = super.toJSON();
        obj.text = this.properties.text;
        return obj;
    }

}

export default ExitDataType;