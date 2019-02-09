import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class AssignDataType extends BaseFlowDataType{

    @observable name = '';
    @observable from = '';
    @observable to = '';

    constructor({name, from, to, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.ASSIGN;
        this.name = name || '';
        this.from = from || '';
        this.to = to || '';
    }
    @computed get toolTip() {
        return`${this.name}: ${this.to} = ${this.to}`;
    }


    @computed get outputXML() {
        const xml = `<assign name=${this.name} from=${this.from} to=${this.to}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.name;
        obj.from = this.from;
        obj.to = this.to;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default AssignDataType;