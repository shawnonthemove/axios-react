// import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (url, data, config) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const request = async () => {
    setLoading(true);
    await axios({
      url,
      params: data,
      method: 'GET',
    }).then(res => {
      if (res && res.status >= 200 && res.status <= 304) setResult(res.data)
      else setError(new Error('get data error in useResquest'))
    }).catch(err => {setError(err)});
    setLoading(false);
  };

  useEffect(() => {let pro = request()}, []);
  
  return {
    loading,
    result,
    error,
  };
};


// 一种处理await错误的优雅方式 
// let rejected = () => new Promise((resolve, reject) => {
//   setTimeout(() => reject('error'), 1000);
// });
// const awaitWrap = (promise) => {
//   return promise.then(res => [res, null]).catch(err => [null, err]);
// }
// await awaitWrap(rejected());

export default useRequest;