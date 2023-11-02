import request from './_request';

const prefix = '/user';

const addForgetPassword = async (payload: any) => {
  return request.post(prefix + '/addForgetPassword', payload);
};

const changePassword = async (payload: any) => {
  return request.post(prefix + '/changePassword', payload);
};

const forgetPassword = async (payload?: any) => {
  return request.post(prefix + '/forgetPassword', payload);
};

const getForgetPassCode = async (payload?: any) => {
  return request.get(prefix + '/getForgetPassCode', payload);
};

const getUserInfoByToken = async (payload?: any) => {
  return request.get(prefix + '/getUserInfoByToken', payload);
};

const login = async (payload: any) => {
  return request.post(prefix + '/login', payload);
};

const searchUser = async (payload: any) => {
  return request.get(prefix + '/searchUser', payload);
};

const signup = async (payload: any) => {
  return request.post(prefix + '/signup', payload);
};

const updateUserInfo = async (payload: any) => {
  return request.post(prefix + '/updateUserInfo', payload);
};

const userApi = {
  addForgetPassword,
  changePassword,
  forgetPassword,
  getForgetPassCode,
  getUserInfoByToken,
  login,
  searchUser,
  signup,
  updateUserInfo,
};

export default userApi;
