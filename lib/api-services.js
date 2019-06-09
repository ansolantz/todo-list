

import axios from "axios";

class ApiServices {
  constructor() {
    this.ApiServices = axios.create({
      baseURL: "http://localhost:4000/api/v1/",
      withCredentials: true
    });
  }

}

const apiService = new ApiServices();
export default apiService;
