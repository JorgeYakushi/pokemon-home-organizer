import axios from "axios";
export const test = (number: number, test: any) => {
  test(number++);
};
const onSuccess = (res: any) => {
  console.log(res);
};
const onRejected = (error: any) => {
  console.error(error);
};
axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(onSuccess, onRejected);
// export { requestInterceptor, responseInterceptor };
