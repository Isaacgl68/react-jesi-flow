import { observable, action, computed } from 'mobx';
import uuidv1  from 'uuid/v1';

class BaseFlowDataType {
    @observable objectIndex = 0;
    objectId;
    type;

    constructor({objectIndex, objectId, type } = {}){

        this.objectId = objectId || uuidv1();
        this.type = type;
        this.objectIndex = objectIndex;
    }
    get toolTip() {return ''; }


    get outputXML() { return '';}

    parseInputXML(inputXml) {}

    getDisplayXML() { return '';}
}

export default BaseFlowDataType;