import * as FlowNodeTypes from '../utils/consts/FlowNodeTypes';
import {initTypeConfigMap} from './Configuration';



const tagsToTypeMapping = new Map([
    ['assign',FlowNodeTypes.ASSIGN],
    ['exit',FlowNodeTypes.EXIT],
    ['end',FlowNodeTypes.END],
    ['if',FlowNodeTypes.IF],
    ['while',FlowNodeTypes.WHILE],
    ['task',FlowNodeTypes.TASK],
    ['xpath',FlowNodeTypes.XPATH]

]);

const newTypesSelectionList1 = [
  FlowNodeTypes.ASSIGN,
  FlowNodeTypes.IF,
  FlowNodeTypes.WHILE,
  FlowNodeTypes.TASK,
  FlowNodeTypes.XPATH,
  FlowNodeTypes.EXIT]

const newTypesSelectionList = [
  {group:'components', label:'Components', isOpen:true, items:[
      FlowNodeTypes.ASSIGN,
      FlowNodeTypes.TASK,
      FlowNodeTypes.XPATH,
      FlowNodeTypes.EXIT,
      
    ]},
  {group:'containers',label:'Containers', isOpen:true, items:[
      FlowNodeTypes.IF,
      FlowNodeTypes.WHILE,
    ]},
  ]


class AppConfiguration{

    _typeConfigMap = null;
    constructor(){
        this.getTypeByName = this.getTypeByName.bind(this);
    }

    get  newTypesSelectionList(){
       return newTypesSelectionList;
    }
    get  typesMap(){
        const that = this;
        if (!that._typeConfigMap)that._typeConfigMap = initTypeConfigMap();
        return that._typeConfigMap;
    }
    getTypeByName(typeName){

        const config = this.typesMap.get(typeName);
        return config;
    }

    getRunTimeTypeByName(typeName,props){

        const runtimeClass = this.getTypeByName(typeName).dataClass;
        return  new runtimeClass(props);
    }

    getTypeByTag(tagName){
        const type =  tagsToTypeMapping.get(tagName);
        return this.typesMap.get(type);
    }
}
export default new AppConfiguration();