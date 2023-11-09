import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import { IHttpData, IHttpErrorData } from '../types/request';
import toast from '../utils/toast';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

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
      const res: IHttpData = (
        await axios.get(baseUrl + url, {
          params,
          headers,
        })
      ).data;
      console.log(res, url);
      if (res.success) resolve(res.data);
      else {
        toast('Please try again later');
        reject(new Error('Please try again later'));
      }
    } catch (error) {
      const errParse = error as AxiosError;
      const err = errParse.response?.data as IHttpErrorData;
      console.log(err, url);
      if (!err || !err.errMessage) return reject(new Error(''));
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
      const res: IHttpData = (
        await axios.post(baseUrl + url, data, { headers })
      ).data;
      console.log(res, url);
      if (res.success) resolve(res.data);
      else {
        toast('Please try again later');
        reject(new Error('Please try again later'));
      }
    } catch (error) {
      const errParse = error as AxiosError;
      const err = errParse.response?.data as IHttpErrorData;
      console.log(err, url);
      if (!err || !err.errMessage) return reject(new Error(''));
      toast(err.errMessage);
      reject(new Error(err.errMessage));
    }
  });
};

const putRequest = async (url: string, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(url, data, {
        headers: { 'Content-Type': 'application/octet-stream' },
      });
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
