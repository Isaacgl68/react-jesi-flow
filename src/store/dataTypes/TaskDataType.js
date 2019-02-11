import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class TaskDataType extends BaseFlowDataType{


    properties ={
        name: '',
        id: '',
        input: '',
        operation: ''
    }



    constructor({name = '', id = '', input = '' ,operation = 'CREATE' ,...config}= {}){
        super(config);
        this.type = FlowNodeTypes.TASK;
        this.properties.name = name;
        this.properties.id = id;
        this.properties.input = input;
        this.properties.operation = operation;
    }
    @computed get toolTip() {
        return`${this.properties.name}: ${this.properties.id} = ${this.properties.operation}`;
    }


    @computed get outputXML() {
        const xml = `<assign name=${this.properties.name} id=${this.properties.id} input=${this.properties.input} operation=${this.properties.operation}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.properties.name;
        obj.id = this.properties.id;
        obj.input = this.properties.input;
        obj.operation = this.properties.operation;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default TaskDataType;