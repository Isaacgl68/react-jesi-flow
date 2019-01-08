import * as FlowNodeTypes from '../utils/consts/FlowNodeTypes';
import Icons from './IconsConfiguration';

const typeConfigMap = new Map([
    [FlowNodeTypes.START,{type:FlowNodeTypes.START, dataName:'BaseFlowDataType', icon:Icons['startIcon'],label: 'Start', editorName:null, componentName:'' }],
    [FlowNodeTypes.ASSIGN,{type:FlowNodeTypes.ASSIGN, dataName:'AssignDataType', icon:'',label: 'Assign', editorName:'', componentName:'' }],
    [FlowNodeTypes.EXIT,{type:FlowNodeTypes.EXIT, dataName:'ExitDataType', icon:'',label: 'Exit', editorName:'', componentName:'' }],
    [FlowNodeTypes.IF,{type:FlowNodeTypes.IF, dataName:'IfDataType', icon:'',label: 'If/Else', editorName:'', componentName:'' }],
    [FlowNodeTypes.WHILE,{type:FlowNodeTypes.WHILE, dataName:'WhileDataType', icon:'',label: 'While', editorName:'', componentName:'' }],
    ]);

const tagsToTypeMapping = new Map([
    ['assign',FlowNodeTypes.ASSIGN],
    ['exit',FlowNodeTypes.EXIT],
    ['if',FlowNodeTypes.IF],
    ['while',FlowNodeTypes.WHILE]

]);
class AppConfiguration{
    static get  typesMap(){
        return typeConfigMap;
    }
    static getTypeByName(typeName){
        return typeConfigMap.get(typeName);
    }

    static getTypeByTag(tagName){
        const type =  tagsToTypeMapping.get(tagName);
        return typeConfigMap.get(type);
    }
}
export default AppConfiguration;