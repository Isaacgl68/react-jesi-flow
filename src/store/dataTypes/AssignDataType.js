import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class AssignDataType extends BaseFlowDataType{

    properties ={
       name: '',
       from: '',
       to: '',
    }



    constructor({name = '', from = '', to = '', ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.ASSIGN;
        this.properties.name = name;
        this.properties.from = from;
        this.properties.to = to;
    }
    @computed get toolTip() {
        return`${this.properties.name}: ${this.properties.to} = ${this.properties.to}`;
    }


    @computed get outputXML() {
        const xml = `<assign name=${this.properties.name} from=${this.properties.from} to=${this.properties.to}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.properties.name;
        obj.from = this.properties.from;
        obj.to = this.properties.to;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default AssignDataType;