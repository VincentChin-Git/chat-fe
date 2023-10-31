import { IHttpData, IHttpErrorData } from '@/types/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getRequest = async (url: string, params: any) => {
  const authToken = await AsyncStorage.getItem('userAuthToken');
  const headers = authToken
    ? {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' };
  return new Promise(async (resolve, reject) => {
    try {
      const res: IHttpData = await axios.get(url, {
        params,
        headers,
      });
      if (res.success) resolve(res.data);
      else reject('Please try again later');
    } catch (error) {
      const err = error as IHttpErrorData;
      console.log(err.errMessage, url);
      reject(err.errMessage);
    }
  });
};

const postRequest = async (url: string, data: any) => {
  const authToken = await AsyncStorage.getItem('userAuthToken');
  const headers = authToken
    ? {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' };
  return new Promise(async (resolve, reject) => {
    try {
      const res: IHttpData = await axios.post(url, data, { headers });
      if (res.success) resolve(res.data);
      else reject('Please try again later');
    } catch (error) {
      const err = error as IHttpErrorData;
      console.log(err.errMessage, url);
      reject(err.errMessage);
    }
  });
};

const request = { get: getRequest, post: postRequest };

export default request;
