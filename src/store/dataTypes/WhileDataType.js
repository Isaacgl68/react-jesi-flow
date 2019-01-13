import { observable, action, computed } from 'mobx';
import BaseContainerDataType from "./BaseContainerDataType";
import * as FlowNodeTypes from '../../utils/consts/FlowNodeTypes'
import BaseFlowDataType from "./BaseFlowDataType";

class WhileDataType extends BaseContainerDataType {

    @observable name = '';
    @observable condition = '';

    constructor({name, condition, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.WHILE;
        this.children.push(new BaseContainerDataType({type:FlowNodeTypes.WHILE_CHILD}));
        this.name = name;
        this.condition = condition;
    }

    @computed get toolTip() {
        return  `${this.name}: if (${this.condition})`;
    }

    @computed get outputXML() {
        const xml = `<while name=${this.name} condition=${this.condition} 
                    </while>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

    toJSON(){
        let obj = super.toJSON();
        obj.name = this.name;
        obj.condition = this.condition;
        return obj;
    }

}

export default WhileDataType;