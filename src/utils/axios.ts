import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

export const getServerSideProps = () => { }
export const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
// export const baseUrl = `http://localhost:8800/api`
export const chatBaseUrl = `${process.env.NEXT_PUBLIC_CHAT_SERVER_URL}`

const instance = axios.create({
  baseURL: baseUrl,
  headers:
    Cookies.get('accessToken') ? {
      'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      'Accept-Language': 'ru'
    } : {
      'Accept-Language': 'ru'
    }
});

export const chatApi = axios.create({
  baseURL: `${chatBaseUrl}/api`,
  headers:
    Cookies.get('chatToken') ? { 'Authorization': `Bearer ${Cookies.get('chatToken')}` } : {}
});

export default instance;

