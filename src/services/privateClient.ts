import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { StatusCode } from "src/utils/constants";
import { signOut } from "src/utils/helperFunctions";

const https = require("https");

const privateClient = axios.create({
  baseURL: process.env.API_URL,
  timeout: 12400000,
  responseType: "json",
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

let requests: string[] = [];
let conflictRequest: string = "";

// Request interceptors Customize based on your need
privateClient.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }

    if (config?.url) {
      requests.push(config?.url);
      // showLoader();
    }

    // if (config.headers && config.params && config.params.requiredToken) {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const authToken = localStorage.getItem("authToken");

    config.headers["Authorization"] = "Bearer " + authToken;
    // }

    return config;
  },
  (error) => {
    // useToasts().addToast(error);
    Promise.reject(error);
  }
);

// Response interceptors Customize based on your need
privateClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    removeRequest(response?.config?.url as string);
    if (data?.code && data?.code !== StatusCode.Success) {
      return Promise.reject(new Error(data.message || "Error"));
    } else {
      // response.data = camelizeKeys(response.data);
      return Promise.resolve(response);
    }
  },
  async (error) => {
    // if (error?.response?.status !== StatusCode.Unauthorized) {

    // }
    removeRequest(error?.config?.url);
    switch (error?.response?.status) {
      // Authorization Failed Response can add other status codes here to manage error Logging
      case StatusCode.Forbidden:
        console.log("========================", error)
        signOut()
        window.location.href = "/login";
        break;
      case StatusCode.Unauthorized:
        signOut()
        console.log("Unauthorized access, please login again.");
        break;
      case StatusCode.Conflict:
        conflictRequest = error.response.config.url;
        return Promise.resolve(error.response);
      case StatusCode.BadRequest:
        return Promise.resolve(error.response);
      case StatusCode.InternalServer:
        return Promise.resolve(error.response);
      default:
        break;
    }
    return Promise.reject(error);
  }
);

// remove completed request
function removeRequest(req: string) {
  const i = requests.indexOf(req);
  if (i >= 0) {
    requests.splice(i, 1);
  }
  if (requests.length > 0) {
    // showLoader();
  } else {
    // hideLoader();
  }
  if (req === conflictRequest) {
    conflictRequest = "";
    requests = requests.filter((request) => request !== req);
  }
}

export default privateClient;
