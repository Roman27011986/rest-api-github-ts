import axios from 'axios';
import { toast } from 'react-toastify'
axios.defaults.baseURL = 'https://api.github.com/';

export const getUsersByName = async (query: string): Promise<any> => {
  try {
    const {data:{items}} = await axios.get(
      `search/users?q=${query}`, 
    );
  toast.success(`User ${query} found`)
  sessionStorage.setItem('users', JSON.stringify(items))
  return items;
  } catch (error) {
    toast.error(error.message)
  }
};

export const getUserRepo = async (query: string): Promise<any> => {
 try {
    const response = await axios.get(
    `users/${query}/repos`,
   );
  toast.success('success')
  return response;
 } catch (error) {
   toast.error(error.message)
 }
};

export const getUserInfo = async (query: string):Promise<any> => {
 try {
    const response = await axios.get(
    `users/${query}`,
   );
  toast.success('success')
  return response;
 } catch (error) {
   toast.error(error.message)
 }
};