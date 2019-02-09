import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class TaskDataType extends BaseFlowDataType{




    @observable name = '';
    @observable id = '';
    @observable input = '';
    @observable operation = '';

    constructor({name, id, input,operation,...config}= {}){
        super(config);
        this.type = FlowNodeTypes.TASK;
        this.name = name || '';
        this.id = id || '';
        this.input = input || '';
        this.operation = operation || '';
    }
    @computed get toolTip() {
        return`${this.name}: ${this.id} = ${this.operation}`;
    }


    @computed get outputXML() {
        const xml = `<assign name=${this.name} id=${this.id} input=${this.input} operation=${this.operation}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.name;
        obj.id = this.id;
        obj.input = this.input;
        obj.operation = this.operation;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default TaskDataType;