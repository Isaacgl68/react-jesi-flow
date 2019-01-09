import * as FlowNodeTypes from '../utils/consts/FlowNodeTypes';
import Icons from './IconsConfiguration';

import {default as FlowComponent} from "../components/flowComponents/FlowComponent";


const tagsToTypeMapping = new Map([
    ['assign',FlowNodeTypes.ASSIGN],
    ['exit',FlowNodeTypes.EXIT],
    ['if',FlowNodeTypes.IF],
    ['while',FlowNodeTypes.WHILE]

]);


class AppConfiguration{

    _typeConfigMap = null;
    initTypeConfigMap(){
        this._typeConfigMap = new Map([
            [FlowNodeTypes.START,{type:FlowNodeTypes.START, dataName:'BaseFlowDataType', icon:Icons['startIcon'],label: 'Start', editorName:null, component:SimpleFlowContainer }],
            [FlowNodeTypes.ASSIGN,{type:FlowNodeTypes.ASSIGN, dataName:'AssignDataType', icon:Icons['startIcon'],label: 'Assign', editorName:'', component: FlowComponent }],
            [FlowNodeTypes.EXIT,{type:FlowNodeTypes.EXIT, dataName:'ExitDataType', icon:'',label: 'Exit', editorName:'', component:FlowComponent }],
            [FlowNodeTypes.IF,{type:FlowNodeTypes.IF, dataName:'IfDataType', icon:'',label: 'If/Else', editorName:'', component:null }],
            [FlowNodeTypes.WHILE,{type:FlowNodeTypes.WHILE, dataName:'WhileDataType', icon:'',label: 'While', editorName:'', component:null }],
        ]);
    }
    get  typesMap(){
        if (!this._typeConfigMap)this.initTypeConfigMap();
        return this._typeConfigMap;
    }
    getTypeByName(typeName){

        const config = this.typesMap.get(typeName);
        return config;
    }

    getTypeByTag(tagName){
        const type =  tagsToTypeMapping.get(tagName);
        return this.typesMap.get(type);
    }
}
export default new AppConfiguration();