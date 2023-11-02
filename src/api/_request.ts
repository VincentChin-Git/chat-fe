import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { IHttpData, IHttpErrorData } from '@/types/request';
import toast from '@/utils/toast';

const baseUrl = process.env.SERVER_BASE_URL;

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
      const res: IHttpData = await axios.get(baseUrl + url, {
        params,
        headers,
      });
      if (res.success) resolve(res.data);
      else reject(new Error('Please try again later'));
    } catch (error) {
      const err = error as IHttpErrorData;
      console.log(err.errMessage, url);
      toast(err.errMessage);
      reject(new Error(err.errMessage));
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
      const res: IHttpData = await axios.post(baseUrl + url, data, { headers });
      if (res.success) resolve(res.data);
      else reject(new Error('Please try again later'));
    } catch (error) {
      const err = error as IHttpErrorData;
      console.log(err.errMessage, url);
      toast(err.errMessage);
      reject(new Error(err.errMessage));
    }
  });
};

const putRequest = async (url: string, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(url, data);
      if (res.status === 200) resolve(true);
      else {
        console.log('upload failed', res);
        reject(new Error('Please try again later'));
      }
    } catch (error) {
      console.log('upload failed', error);
      reject(new Error('Please try again later'));
    }
  });
};

const request = { get: getRequest, post: postRequest, put: putRequest };

export default request;
