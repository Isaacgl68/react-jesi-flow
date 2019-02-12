import DonutLarge from '@material-ui/icons/DonutLarge';
import ExitRun from 'mdi-react/ExitRunIcon';
import ClipboardArrowDown from 'mdi-react/ClipboardArrowDownIcon';
import Sync from 'mdi-react/SyncIcon';
import DefaultIcon from 'mdi-react/RadioButtonUncheckedIcon';
import ArrowDecisionIcon from 'mdi-react/ArrowDecisionIcon';
import CodeEqualIcon from 'mdi-react/CodeEqualIcon';
import CodeNotEqualIcon from 'mdi-react/CodeNotEqualIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import XamlIcon from 'mdi-react/XamlIcon';



import AlertIcon from 'mdi-react/AlertIcon';
import * as FlowNodeTypes from "../utils/consts/FlowNodeTypes";
import DataTypeFactory from "../store/dataTypes/DataTypeFactory";
import SimpleFlowContainer from "../components/flowComponents/SimpleFlowContainer";
import AssignDataType from "../store/dataTypes/AssignDataType";
import {default as FlowComponent} from "../components/flowComponents/FlowComponent";
import ExitDataType from "../store/dataTypes/ExitDataType";
import IfDataType from "../store/dataTypes/IfDataType";
import WhileDataType from "../store/dataTypes/WhileDataType";
import EndDataType from "../store/dataTypes/EndDataType";
import AssignEditor from "../components/dialogs/editors/AssignEditor";
import BaseSplitContainer from "../components/flowComponents/BaseSplitContainer.";
import BaseContainerDataType from "../store/dataTypes/BaseContainerDataType";
import ConditionEditor from "../components/dialogs/editors/ConditionEditor";
import ExitEditor from "../components/dialogs/editors/ExitEditor";
import TaskDataType from "../store/dataTypes/TaskDataType";
import TaskEditor from "../components/dialogs/editors/TaskEditor";
import XpathDataType from "../store/dataTypes/XpathDataType";
import XpathEditor from "../components/dialogs/editors/XpathEditor";
import StartDataType from "../store/dataTypes/StartDataType";
import StartEditor from "../components/dialogs/editors/StartEditor";

export const Icons = {
    startIcon:DonutLarge,
    exit:ExitRun,
    assign:ClipboardArrowDown,
    if:ArrowDecisionIcon,
    ifChild:CodeEqualIcon,
    elseChild:CodeNotEqualIcon,
    while:Sync,
    defaultIcon:DefaultIcon,
    task:AccountIcon,
    xpath:XamlIcon
}
export function initTypeConfigMap(){
    return new Map([
        [FlowNodeTypes.START,{type:FlowNodeTypes.START, dataClass: StartDataType,
            icon:Icons['startIcon'],label: 'Start', editor:StartEditor, component:SimpleFlowContainer ,disableDelete:true, disableAppend:true}],
        [FlowNodeTypes.END,{type:FlowNodeTypes.END, dataClass: EndDataType, icon:Icons['exit'],label: 'Exit', editor:null, component: FlowComponent, hideMenu:true }],
        [FlowNodeTypes.ASSIGN,{type:FlowNodeTypes.ASSIGN, dataClass: AssignDataType, icon:Icons['assign'],label: 'Assign', editor:AssignEditor,
            component: FlowComponent }],
        [FlowNodeTypes.EXIT,{type:FlowNodeTypes.EXIT, dataClass: ExitDataType, icon:Icons['exit'],label: 'Exit', editor:ExitEditor,
            component: FlowComponent, disableDelete:true, disableAppend:true  }],
        [FlowNodeTypes.IF,{type:FlowNodeTypes.IF, dataClass: IfDataType, icon:Icons['if'],label: 'If/Else', editor:ConditionEditor, component:BaseSplitContainer }],
        [FlowNodeTypes.IF_IF_CHILD,{type:FlowNodeTypes.IF_IF_CHILD, dataClass: BaseContainerDataType, icon:Icons['ifChild'],label: 'If',
            editor:null, disableDelete:true, disableAppend:true, component:SimpleFlowContainer }],
        [FlowNodeTypes.IF_ELSE_CHILD,{type:FlowNodeTypes.IF_ELSE_CHILD, dataClass: BaseContainerDataType, icon:Icons['elseChild'],
            label: 'Else', editor:null,disableDelete:true, disableAppend:true,component:SimpleFlowContainer }],
        [FlowNodeTypes.WHILE,{type:FlowNodeTypes.WHILE, dataClass: WhileDataType, icon:Icons['while'],label: 'While', editor:ConditionEditor,
            component:SimpleFlowContainer }],
        [FlowNodeTypes.TASK,{type:FlowNodeTypes.TASK, dataClass: TaskDataType, icon:Icons['task'],label: 'Task', editor:TaskEditor,
            component:FlowComponent }],
        [FlowNodeTypes.XPATH,{type:FlowNodeTypes.XPATH, dataClass: XpathDataType, icon:Icons['xpath'],label: 'XPath', editor:XpathEditor,
            component:FlowComponent }],
    ]);
}
