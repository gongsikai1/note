import axios from 'axios';
import { ElMessage } from "element-plus"

const hostname = location.hostname;

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('response', response)
  // response.data.msg
  // ElMessage.error('Oops, this is a error message.')
  // if (response.data.msg) ElMessage.error(response.data.msg)
  // if (response.data.status !== 0) return Promise.reject(response.data.msg);
  if (response.data.status !== 0) {
    ElMessage.error(response.data.msg)
    return Promise.reject(response.data.msg);
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const USER_ADD = ({ name, pass }) => axios.post(`http://${hostname}:3003/api/user/add`, {
  name,
  pass
}, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const USER_LOGIN = ({ name, pass }) => axios.post(`http://${hostname}:3003/api/user/login`, {
  name,
  pass
}, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const USER_NAME = () => axios.get(`http://${hostname}:3003/api/user/name`, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const NOTE_LIST = () => axios.get(`http://${hostname}:3003/api/note/list`, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const NOTE_ADD = ({ content }) => axios.post(`http://${hostname}:3003/api/note/add`, {
  content,
}, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const NOTE_MODIFY = ({uuid, content}) => axios.post(`http://${hostname}:3003/api/note/modify`, {
  uuid,
  content,
}, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

const NOTE_DEL = ({uuid}) => axios.post(`http://${hostname}:3003/api/note/del`, {
  uuid,
}, {
  headers: {
    token: localStorage.getItem("token")
  }
}).then(res => res.data.data)

export default {
  USER: {
    REGISTER: USER_ADD,
    LOGIN: USER_LOGIN,
    NAME: USER_NAME,
  },
  NOTE: {
    LIST: NOTE_LIST,
    ADD: NOTE_ADD,
    EDIT: NOTE_MODIFY,
    DEL: NOTE_DEL,
  }
}
