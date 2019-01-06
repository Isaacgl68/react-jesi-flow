import { observable, action, computed } from 'mobx';
import AssignDataType from "../store/dataTypes/AssignDataType";

class Store {
	@observable first = 'Alon';
	@observable last = 'Valadji';
	@observable datatype = new AssignDataType({name:'isaac', from:'tel-Aviv' ,to: 'new-york', objectIndex: 1});

	@action setState = state => Object.assign(this, state);

	@computed get fullName() {
		return `${this.first} ${this.last}`;
	}

	@computed get assignToString() {
		return `${this.datatype.name} ${this.datatype.from}`;
	}

	toJSON() {
		const first = this.first;
		const last = this.last;
		const fullName = this.fullName;

		return {
			first,
			last,
			fullName
		};
	}
}

export default Store;
