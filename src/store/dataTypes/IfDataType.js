import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import BaseContainerDataType from "./BaseContainerDataType";
import * as FlowNodeTypes from '../../utils/consts/FlowNodeTypes'

class IfDataType extends BaseContainerDataType{

    @observable name = '';
    @observable condition = '';
    ifChild = new BaseContainerDataType({type:FlowNodeTypes.IF_IF_CHILD});
    elseChild = new BaseContainerDataType({type:FlowNodeTypes.IF_ELSE_CHILD});

    constructor({name, condition, ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.IF;
        this.children.push(new BaseContainerDataType({type:FlowNodeTypes.IF_IF_CHILD}));
        this.children.push(new BaseContainerDataType({type:FlowNodeTypes.IF_ELSE_CHILD}));
        this.name = name;
        this.condition = condition;
    }

    @computed get toolTip() {
        return  `${this.name}: if (${this.condition})`;
    }


    @computed get outputXML() {
        const xml = `<if name=${this.name} condition=${this.condition}  
                    <then></then>
                    <else></else>
                    </if>`;
        return xml;
    }

    @action parseInputXML(inputXml) {

    }

}

export default IfDataType;