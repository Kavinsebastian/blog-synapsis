import Axios, { Method, AxiosHeaders } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
  timeoutErrorMessage: "timeout",
})


axios.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {

    return Promise.reject(error)
  }
)

export const invoke = async (
  method: Method,
  url: string,
  params?: any,
  payload?: any,
  headers?: AxiosHeaders
) => {
  // TODO
  axios.defaults.headers.common.Authorization = `Bearer `;

  return axios
    .request({
      url,
      params: params ? params : null,
      data: payload ? payload : null,
      method: method ? method : "GET",
      headers: headers ? headers : { "Content-Type": "application/json" },
    })
    .catch();
}
