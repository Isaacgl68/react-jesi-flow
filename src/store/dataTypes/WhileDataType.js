import { observable, action, computed } from 'mobx';
import BaseContainerDataType from "./BaseContainerDataType";
import * as FlowNodeTypes from '../../utils/consts/FlowNodeTypes'
import BaseFlowDataType from "./BaseFlowDataType";

class WhileDataType extends BaseContainerDataType {


    properties = {
        name: '',
        condition: '',
    }

    constructor({name = '', condition = '', ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.WHILE;
        this.properties.name = name;
        this.properties.condition = condition;
    }

    @computed get toolTip() {
        return  `${this.properties.name}: if (${this.properties.condition})`;
    }

    @computed get outputXML() {
        const xml = `<while name=${this.properties.name} condition=${this.properties.condition} 
                    </while>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.name;
        obj.condition = this.properties.condition;
        return obj;
    }

}

export default WhileDataType;