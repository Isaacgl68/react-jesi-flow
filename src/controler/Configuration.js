import DonutLarge from '@material-ui/icons/DonutLarge';
import ExitRun from 'mdi-react/ExitRunIcon';
import ClipboardArrowDown from 'mdi-react/ClipboardArrowDownIcon';
import Sync from 'mdi-react/SyncIcon';



import AlertIcon from 'mdi-react/AlertIcon';
import * as FlowNodeTypes from "../utils/consts/FlowNodeTypes";
import DataTypeFactory from "../store/dataTypes/DataTypeFactory";
import SimpleFlowContainer from "../components/flowComponents/SimpleFlowContainer";
import AssignDataType from "../store/dataTypes/AssignDataType";
import {default as FlowComponent} from "../components/flowComponents/FlowComponent";
import ExitDataType from "../store/dataTypes/ExitDataType";
import IfDataType from "../store/dataTypes/IfDataType";
import WhileDataType from "../store/dataTypes/WhileDataType";

export const Icons = {
    startIcon:DonutLarge,
    exit:ExitRun,
    assign:ClipboardArrowDown,
    while:Sync
}
export function initTypeConfigMap(){
    return new Map([
        [FlowNodeTypes.START,{type:FlowNodeTypes.START, dataClass: DataTypeFactory.getDataTypeClass('BaseContainerDataType'), icon:Icons['startIcon'],label: 'Start', editorName:null, component:SimpleFlowContainer }],
        [FlowNodeTypes.ASSIGN,{type:FlowNodeTypes.ASSIGN, dataClass: AssignDataType, icon:Icons['assign'],label: 'Assign', editorName:'', component: FlowComponent }],
        [FlowNodeTypes.EXIT,{type:FlowNodeTypes.EXIT, dataClass: ExitDataType, icon:Icons['exit'],label: 'Exit', editorName:'', component: FlowComponent, hideMenu:true }],
        [FlowNodeTypes.IF,{type:FlowNodeTypes.IF, dataClass: IfDataType, icon:'',label: 'If/Else', editorName:'', component:null }],
        [FlowNodeTypes.WHILE,{type:FlowNodeTypes.WHILE, dataClass: WhileDataType, icon:Icons['while'],label: 'While', editorName:'', component:SimpleFlowContainer }],
    ]);
}
