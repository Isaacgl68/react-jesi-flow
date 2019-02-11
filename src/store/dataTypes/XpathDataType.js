import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class XpathDataType extends BaseFlowDataType{


    properties ={
        query: '',
        input: '',
        isArray: false,
    }

    constructor({query ='', input = '', isArray = false, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.XPATH;
        this.properties.query = query;
        this.properties.input = input;
        this.properties.isArray = isArray;
    }
    @computed get toolTip() {
        return`${this.query}`;
    }


    @computed get outputXML() {
        const xml = `<invoke type="Xpath" input=${this.properties.input} query=${this.properties.query} 
                isArray=${this.properties.isArray}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.query = this.properties.query;
        obj.input = this.properties.input;
        obj.isArray = this.properties.isArray;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default XpathDataType;