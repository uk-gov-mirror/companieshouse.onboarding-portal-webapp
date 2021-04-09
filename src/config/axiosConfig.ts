import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";

/**
 * Api Error
 * @interface
 */
export interface ApiError {
    data: any;
    message: string;
    status: number;
}

export const STATUS_NO_RESPONSE = -1;
export const HTTP_GET: Method = "get";
export const HTTP_POST: Method = "post";
export const HTTP_PATCH: Method = "patch";
export const HTTP_DELETE: Method = "delete";

/**
 * Gets axios config with common elements for API calls. Some clients may need to add further details
 * to the returned config object, e.g. a 'data' field.
 * @param {Method} httpMethod the http method to use eg. get, post
 * @param {string} url of the api endpoint
 */
export const getBaseAxiosRequestConfig = (
  httpMethod: Method, url: string): AxiosRequestConfig => {
  return {
    headers: {
      Accept: "application/json"
    },
    method: httpMethod,
    proxy: false,
    url
  };
};

/**
 * Call the API using the supplied Axios request config.
 * @param {AxiosRequestConfig} config axios request config
 * @returns {Promise<AxiosResponse>} the api response
 * @throws {ApiError} if something goes wrong
 */
export const makeAPICall = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const axiosResponse: AxiosResponse = await axios.request<any>(config);
    return axiosResponse;
  } catch (apiErr) {
    const axiosError = apiErr as AxiosError;
    const { response, message } = axiosError;
    throw {
      data: response ? response.data : [],
      message,
      status: response ? response.status : STATUS_NO_RESPONSE,
    } as ApiError;
  }
};