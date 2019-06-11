
import axios from "axios";
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import env from './../config.json';




class ApiServices {

  constructor() {
    this.ApiServices = firebase.initializeApp({
      apiKey: env.API_KEY,
      authDomain: env.AUTH_DOMAIN,
      projectId: env.PROJECT_ID
    });

    const db = firebase.firestore();

    // this.ApiServices = axios.create({
    //   baseURL: "http://localhost:4000/api/v1/",
    //   withCredentials: true
    // });
  }

}

const apiService = new ApiServices();
export default apiService;
