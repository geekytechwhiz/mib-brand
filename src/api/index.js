 
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import axios from 'axios';
 
const axiosParams = { 
  baseURL: 'https://api.dev.migobucks.com',
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

const didAbort = error => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

const withAbort =
  fn =>
  async (...args) => {
    const originalConfig = args[args.length - 1]; 
    const { abort, ...config } = originalConfig;
 
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try { 
      return await fn(...args.slice(0, args.length - 1), config);
    } catch (error) { 
      if(didAbort(error) && error.aborted === true)
      throw error;
    }
  };

// Main api function
const api = instance => {
  return {
    get: (url, config = {}) => withAbort(instance.get)(url, config),
    post: (url, body, config = {}) => withAbort(instance.post)(url, body, config),
    patch: (url, body, config = {}) =>
      withAbort(instance.patch)(url, body, config),
    delete: (url, config = {}) => withAbort(instance.delete)(url, config),
  };
};

export default api(axiosInstance);