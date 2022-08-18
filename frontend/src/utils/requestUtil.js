export const getBackendRequestBasicHeader = () => {
  let headers = {
    "Content-Type": "application/json"
  };
    
  if (localStorage.getItem("token") != null) {
    const token = JSON.parse(localStorage.getItem("token"));
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