import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class XpathDataType extends BaseFlowDataType{

    @observable query = '';
    @observable input = '';
    @observable isArray = false;



    constructor({query, input, isArray, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.XPATH;
        this.query = query || '';
        this.input = input || '';
        this.isArray = isArray || false;
    }
    @computed get toolTip() {
        return`${this.query}`;
    }


    @computed get outputXML() {
        const xml = `<invoke type="Xpath" input=${this.input} query=${this.query} isArray=${this.isArray}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.query = this.query;
        obj.input = this.input;
        obj.isArray = this.isArray;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default XpathDataType;