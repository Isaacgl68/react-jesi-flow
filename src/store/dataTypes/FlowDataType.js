import { observable, action, computed } from 'mobx';
import BaseFlowDataType from "./BaseFlowDataType";
import * as FlowNodeTypes from "../../utils/consts/FlowNodeTypes";

class FlowDataType extends BaseFlowDataType{

    properties ={
        flowName: '',
        defaultFlowName: '',
        input: '',
        parameters: '',
        synchronic: true,
        checkExist: false,
        // Additional
        parallelThreadQueue: '',
        correlationID: '',
        sourceID: '',
        sourceApp: '',
        callerID: '',
        userID: '',
        activityCode: '',
        statusCode: '',
        filter: '',
        noteText: '',

    }



    constructor({flowName = '', defaultFlowName = '', input = '',
                    parameters = '', synchronic = true, checkExist = false,
                    parallelThreadQueue = '', correlationID = '', sourceID = '',
                    sourceApp = '', callerID = '', userID = '',
                    activityCode = '', statusCode = '', filter = '',
                    noteText = '', ...config}= {}){
        super(config);
        this.type = FlowNodeTypes.FLOW;
        this.properties.flowName = flowName;
        this.properties.defaultFlowName = defaultFlowName;
        this.properties.input = input;
        this.properties.parameters = parameters;
        this.properties.synchronic = synchronic;
        this.properties.checkExist = checkExist;
        this.properties.parallelThreadQueue = parallelThreadQueue;
        this.properties.correlationID = correlationID;
        this.properties.sourceID = sourceID;
        this.properties.callerID = callerID;
        this.properties.userID = userID;
        this.properties.activityCode = activityCode;
        this.properties.statusCode = statusCode;
        this.properties.filter = filter;
        this.properties.noteText = noteText;
    }
    @computed get toolTip() {
        return`${this.properties.name}: ${this.properties.to} = ${this.properties.to}`;
    }


    @computed get outputXML() {
        const xml = `<flow name=${this.properties.flowName} defaultName=${this.properties.defaultName} 
        synchronic=${(this.properties.synchronic)? 'yes': 'no'}/>`;
        return xml;
    }

    toJSON(){
        let obj = super.toJSON();
        obj.flowName = this.properties.flowName;
        obj.defaultFlowName = this.properties.defaultFlowName;
        obj.input = this.properties.input;
        obj.parameters = this.properties.parameters;
        obj.synchronic = this.properties.synchronic;
        obj.checkExist = this.properties.checkExist;
        obj.parallelThreadQueue = this.properties.parallelThreadQueue;
        obj.correlationID = this.properties.correlationID;
        obj.sourceID = this.properties.sourceID;
        obj.callerID = this.properties.callerID;
        obj.userID = this.properties.userID;
        obj.activityCode = this.properties.activityCode;
        obj.statusCode = this.properties.statusCode;
        obj.filter = this.properties.filter;
        obj.noteText = this.properties.noteText;
        return obj;
    }

    @action parseInputXML(inputXml) {

    }

}

export default FlowDataType;