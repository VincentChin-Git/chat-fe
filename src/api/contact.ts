import request from './_request';

const prefix = '/contact';

const addContact = async (payload: any) => {
  return request.post(prefix + '/addContact', payload);
};

const getContact = async (payload: any) => {
  return request.get(prefix + '/getContact', payload);
};

const contactApi = {
  addContact,
  getContact,
};

export default contactApi;
