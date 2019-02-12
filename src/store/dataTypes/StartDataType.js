import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";
import BaseContainerDataType from "./BaseContainerDataType";


class StartDataType extends BaseContainerDataType{

    properties ={
        id: ''
    }
    constructor({id = '', ...config}= {}) {
        super(config);
        this.type = FlowNodeTypes.START;
        this.properties.id = id;
    }

    @computed get toolTip() {
        return this.id;
    }

    @computed get outputXML() {
        const xml = `<start id=${this.properties.id }/>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

    toJSON(){
        let obj = super.toJSON();
        obj.id = this.properties.id;
        return obj;
    }
}

export default StartDataType;