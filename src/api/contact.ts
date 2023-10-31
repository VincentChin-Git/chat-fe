import request from './_request';

const prefix = '/contact';

const getContact = async (payload: any) => {
  return request.get(prefix + '/getContact', payload);
};

const contactApi = {
  getContact,
};

export default contactApi;
