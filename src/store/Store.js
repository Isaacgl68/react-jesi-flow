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
	@observable clipBoard;

	constructor(){
		this.flowTreeFromJSON = this.flowTreeFromJSON.bind(this);
	}
	@action setState = state => Object.assign(this, state);

	@action setActiveComponent(component){
		this.activeComponent = component;
	}
	@action addComponent(componentTypeName, targetArray, encoreKey, insertBeforeInd){
		const dataClass  = AppConfiguration.getTypeByName(componentTypeName).dataClass;
		const newComp =new dataClass();
		if(encoreKey){
			let index = targetArray.findIndex(component => component.key === encoreKey);
			index = (insertBeforeInd) ? index: index +1;
			targetArray.splice(index, 0, newComp);
		}else{
			targetArray.unshift(newComp);
		}
	}

	@action deleteComponent(componentkey, targetArray){
		this.undoFlowTree = cloneDeep(this.flowTree);
		const index = targetArray.findIndex(component => component.key === componentkey);
		targetArray.splice(index, 1);
	}

	@action cutComponent(componentkey, targetArray){
		this.undoFlowTree = cloneDeep(this.flowTree);
		const index = targetArray.findIndex(component => component.key === componentkey);
		this.clipBoard = targetArray.splice(index, 1)[0];
	}

	@action pasteComponent(targetArray, encoreKey, insertBeforeInd){
		if (!this.clipBoard) return;
		if(encoreKey){
			let index = targetArray.findIndex(component => component.key === encoreKey);
			index = (insertBeforeInd) ? index: index +1;
			targetArray.splice(index, 0, this.clipBoard);
		}else{
			targetArray.unshift(this.clipBoard);
		}
		this.clipBoard = null;
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
