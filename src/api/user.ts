import request from './_request';

const prefix = '/user';

const changePassword = async (payload: any) => {
  return request.post(prefix + '/changePassword', payload);
};

const getUserInfoByToken = async (payload: any) => {
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
  changePassword,
  getUserInfoByToken,
  login,
  searchUser,
  signup,
  updateUserInfo,
};

export default userApi;
