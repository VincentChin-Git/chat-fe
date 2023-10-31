import request from './_request';

const prefix = '/user';

const signup = async (payload: any) => {
  return request.get(prefix + '/signup', payload);
};

const login = async (payload: any) => {
  return request.get(prefix + '/login', payload);
};

const getUserInfoByToken = async (payload: any) => {
  return request.get(prefix + '/getUserInfoByToken', payload);
};

const updateUserInfo = async (payload: any) => {
  return request.get(prefix + '/updateUserInfo', payload);
};

const changePassword = async (payload: any) => {
  return request.get(prefix + '/changePassword', payload);
};

const userApi = {
  signup,
  login,
  getUserInfoByToken,
  updateUserInfo,
  changePassword,
};

export default userApi;
