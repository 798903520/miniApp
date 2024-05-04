import { weatherUrl } from "./url";
import { Notice } from "../utils/toast"
let http = {};
http.get = (url, param, header) => {
  let { params, headers } = beforRequest(param, header);
  return new Promise((resolve, reject) => { 
    Notice.showLoading('操作中...');
    uni.request({
      method: 'GET',
      url: weatherUrl + url,
      data: params,
      header: headers,
      timeout: 20 * 1000,
      success: (res) => { 
        afterResponse(res);
        resolve(res.data);
      },
      fail: (err) => {
        Notice.error(err.errMsg || 'get request ERR!', 2000);
        reject(err);
      },
      complete: () => {
        Notice.hideLoading();
      }
    });
  })
}

http.post = (url, param, header) => {
  let { params, headers } = beforRequest(param, header);
  return new Promise((resolve, reject) => { 
    let { params,headers } = Notice.showLoading('操作中...');
    uni.request({
      method: 'POST',
      url: weatherUrl + url,
      data: params,
      header: headers,
      timeout: 20 * 1000,
      success: (res) => { 
        afterResponse(res);
        resolve(res.data);
      },
      fail: (err) => {
        Notice.error(err.errMsg || 'post request ERR!', 2000);
        reject(err);
       },
       complete: () => {
         Notice.hideLoading();
       }
    });
  })
}

/**
 * 起到拦截请求作用 可以在此设置
 * @param {请求的数据} param 
 * @param {请求的header} header 
 */
function beforRequest(param, header) {
  let params = param;
  let headers = header;
  let isErr = false;
  return { params, headers };
 }
/**
 * 起到拦截返回数据的作用
 * @param {返回的数据} res 
 */
function afterResponse(res) { 
  return res;
}

export { http };