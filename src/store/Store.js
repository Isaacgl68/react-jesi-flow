import { observable, action, computed } from 'mobx';
import AssignDataType from "./dataTypes/AssignDataType";
import BaseContainerDataType from "./dataTypes/BaseContainerDataType";
import * as FlowNodeTypes from "../utils/consts/FlowNodeTypes";
import AppConfiguration from "../controler/AppConfiguration";
import cloneDeep from 'lodash/cloneDeep'

class Store {

	@observable flowTree = new BaseContainerDataType({type:FlowNodeTypes.START});
	undoFlowTree;
	@observable activeComponent;

	constructor(){
		this.flowTreeFromJSON = this.flowTreeFromJSON.bind(this);
	}
	@action setState = state => Object.assign(this, state);

	@action setActiveComponent(component){
		this.activeComponent = component;
	}
	@action addComponent(componentTypeName, targetArray, insertAfterKey){
		const newComp =new AppConfiguration.getTypeByName(componentTypeName).dataClass();
		if(insertAfter){
			const index = targetArray.findIndex(component => component.key === insertAfterKey);
			targetArray.splice(index, 0, newComp);
		}else{
			targetArray.push(newComp);
		}
	}

	@action deleteComponent(componentkey, targetArray){
		this.undoFlowTree = cloneDeep(this.flowTree);
		const index = targetArray.findIndex(component => component.key === componentkey);
		targetArray.splice(index, 1);
	}

	flowTreeToJSON() {
		return this.flowTree.toJSON();
	}

	@action flowTreeFromJSON(jsonObj){
		const root = BaseContainerDataType.fromJSON(jsonObj);
		this.flowTree = root;
	}
}

export default new Store();
