import request from './_request';

const prefix = '/aws';

const uploadImgSignature = async (payload: any) => {
  return request.get(prefix + '/uploadImgSignature', payload);
};

const uploadVideoSignature = async (payload: any) => {
  return request.get(prefix + '/uploadVideoSignature', payload);
};

const directUpload = async (url: any, blob: Blob) => {
  return request.put(url, blob);
};

const awsApi = {
  directUpload,
  uploadImgSignature,
  uploadVideoSignature,
};

export default awsApi;
