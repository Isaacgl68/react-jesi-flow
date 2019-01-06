import React from 'react';
import { observer } from 'mobx-react';

const Form = ({ store: { first, last, assignToString, setState, datatype } = {} } = {}) => <form
	noValidate onSubmit={e => e.preventDefault()}
>
	<label>First Name <input
		type="text" value={datatype.name} onChange={function(e){
			datatype.name =  e.target.value;
		setState({datatype})}
	}
	/></label>
	<label>Last Name <input
		type="text" value={last} onChange={e => setState({ last: e.target.value })}
	/></label>

	<p>{assignToString}</p>
</form>;


export default observer(Form);
