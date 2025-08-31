// src/api/http.js
import axios from 'axios';
import { baseUrl } from './config';

const http = axios.create({
  baseURL: baseUrl,      
  withCredentials: true,  
});

export default http;
