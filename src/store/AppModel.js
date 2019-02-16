import {get, put, post} from './../utils/rest-utilities';
import UrlParse from "url-parse";
import Store from "./Store";
const baseUrl = '/api';
const flowsUrl = `${baseUrl}/flows/`;

const _slvNames = {
    FLOWS_SLV: 'flowsSLV',
    FLOWS_VARS_SLV: 'flowVariablesSLV',
    QUEUE_SLV:'queueSLV',

};
const cache = new Map();

class AppModel {

  slvNames = _slvNames;
  getFlow(){
    const pUrl = UrlParse(window.location, true);
    let flowId = pUrl.query['flow'] || "1";
    Store.setState({flowId});
    return get(`${flowsUrl}${flowId}`).then(Store.flowTreeFromJSON);
  }

  upsertFlow(){
    return put(`${flowsUrl}${Store.flowId}`,Store.flowTree).then(resp => {
    }).catch(error => {
      if (error.status === 404){
        return post(`${flowsUrl}`,Store.flowTree);
      }
    });
  }

  getSLV(slvName, paramsString = '', options = {}){
    const key = `${slvName}/${paramsString}`;
    if (cache.get(key)){
      return Promise.resolve(cache.get(key));
    }else{
      return get(`${baseUrl}/${slvName}/${paramsString}`).then((data) => {cache.set(key,data.payload);
        return data.payload} );
    }

  }


}

export default new AppModel();