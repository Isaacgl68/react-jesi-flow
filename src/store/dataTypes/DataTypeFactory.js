import AssignDataType from './AssignDataType';
import ExitDataType from './ExitDataType';
import IfDataType from './IfDataType';
import WhileDataType from './WhileDataType';

const classes ={
    AssignDataType,
    ExitDataType,
    IfDataType,
    WhileDataType

}

class DataTypeFactory {
    static createDataType(typeName, config){
        return new classes[typeName](config);
    }
    static getDataTypeClass(typeName){
        return classes[typeName];
    }
}

export default DataTypeFactory;