import request from './_request';

const prefix = '/msg';

const getMsgs = async (payload: any) => {
  return request.get(prefix + '/getMsgs', payload);
};

const getOverviewMsg = async (payload: any) => {
  return request.get(prefix + '/getOverviewMsg', payload);
};

const sendMsg = async (payload: any) => {
  return request.post(prefix + '/sendMsg', payload);
};

const updateMsgStatus = async (payload: any) => {
  return request.post(prefix + '/updateMsgStatus', payload);
};

const msgApi = {
  getMsgs,
  updateMsgStatus,
  sendMsg,
  getOverviewMsg,
};

export default msgApi;
