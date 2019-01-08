import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";

class BaseContainerDataType extends BaseFlowDataType{

    @observable.shallow  children;

    constructor({children, ...config}= {}){
        super(config);

        this.children = children || [];
    }


    @action parseInputXML(inputXml) {

    }

}

export default BaseContainerDataType;