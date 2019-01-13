import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import findIndex from "lodash/findIndex"
import AppConfiguration from "../../controler/AppConfiguration";

class BaseContainerDataType extends BaseFlowDataType{

    @observable.shallow  children = [];

    constructor(config){
        super(config);
    }

    @action appendChild(newChild){
        this.children.push(child);
    }

    @action insertChild(newChild, insertAfter){
        const index = findIndex(this.children,(element) => element.key === insertAfter.key);
        if (index){
            this.children.splice(index,0,newChild)
        }
    }

    @action deleteChild(child){
        const index = findIndex(this.children,(element) => element.key === insertAfter.key);
        if (index){
            this.children.splice(index,1);
        }
    }

    toJSON(){
        let obj = super.toJSON();
        const children = this.children.map( child => child.toJSON());
        obj.children = children;
        return obj;
    }

    static fromJSON(jsonObj){
        const runtimeObject = super.fromJSON(jsonObj);

       if (jsonObj.children) {
            const children =  jsonObj.children.map(child => {
                const dataClass = AppConfiguration.getTypeByName(child.type).dataClass;
                return dataClass.fromJSON(child);
            });
            runtimeObject.children = children;
        }
       return runtimeObject;

    }



    @action parseInputXML(inputXml) {

    }

}

export default BaseContainerDataType;