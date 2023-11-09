import request from './_request';

const prefix = '/aws';

const uploadImgSignature = async (payload: any) => {
  return request.get(prefix + '/uploadImgSignature', payload);
};

const uploadVideoSignature = async (payload: any) => {
  return request.get(prefix + '/uploadVideoSignature', payload);
};

const directUpload = async (url: string, filePath: any) => {
  return request.put(url, filePath);
};

const awsApi = {
  directUpload,
  uploadImgSignature,
  uploadVideoSignature,
};

export default awsApi;
