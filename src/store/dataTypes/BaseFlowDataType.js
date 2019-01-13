import { observable, action, computed } from 'mobx';
import uuidv1  from 'uuid/v1';
import AppConfiguration from "../../controler/AppConfiguration";

class BaseFlowDataType {
    @observable objectIndex = 0;
    key;
    type;

    constructor({objectIndex, key, type } = {}){

        this.key = key || uuidv1();
        this.type = type;
        this.objectIndex = objectIndex;
    }
    get toolTip() {return ''; }

    toJSON(){
        let {key, type, objectIndex} = this;
        return {key, type, objectIndex};
    }

    static fromJSON(jsonObj){
        return  AppConfiguration.getRunTimeTypeByName(jsonObj.type,jsonObj);
    }


    get outputXML() { return '';}

    parseInputXML(inputXml) {}

    getDisplayXML() { return '';}
}

export default BaseFlowDataType;