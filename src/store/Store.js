import { observable, action, computed } from 'mobx';
import AssignDataType from "./dataTypes/AssignDataType";
import BaseContainerDataType from "./dataTypes/BaseContainerDataType";
import * as FlowNodeTypes from "../utils/consts/FlowNodeTypes";
import AppConfiguration from "../controler/AppConfiguration";

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

	flowTreeToJSON() {
		return this.flowTree.toJSON();
	}

	@action flowTreeFromJSON(jsonObj){
		const root = BaseContainerDataType.fromJSON(jsonObj);
		this.flowTree = root;
	}
}

export default new Store();
