import { appConfig } from "../config";

export const getBackendRequestBasicHeader = () => {
  let headers = {
    "Content-Type": "application/json"
  };
    
  if (localStorage.getItem(appConfig.tokenKey) != null) {
    const token = JSON.parse(localStorage.getItem(appConfig.tokenKey));
    headers = {
      ...headers,
      "Authorization": token.type + " " + token.content
    }
  }

  return headers;
} 

export const defaultErrorResponse = {
  data: {
    message: "Sorry! The service is now unavailable."
  }
}