import {get, put, post} from './../utils/rest-utilities';
import UrlParse from "url-parse";
import Store from "./Store";
const getFlowUrl = '/api/flows/';

class AppModel {
  getFlow(){
    const pUrl = UrlParse(window.location, true);
    let flowId = pUrl.query['flow'] || "1";
    Store.setState({flowId});
    return get(`${getFlowUrl}${flowId}`).then(Store.flowTreeFromJSON);
  }

  upsertFlow(){
    return put(`${getFlowUrl}${Store.flowId}`,Store.flowTree).then(resp => {
    }).catch(error => {
      if (error.status === 404){
        return post(`${getFlowUrl}`,Store.flowTree);
      }
    });
  }
}

export default new AppModel();