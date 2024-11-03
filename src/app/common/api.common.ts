import { environment } from 'src/environments/environment';

const get = (endpoint) => environment.host + '/api/v1/customer/' + endpoint;
// const get_common = (endpoint) => environment.host + '/api/v1/common/' + endpoint;
export const ADMIN_URL = {
  login: get('auth/login'),
  register: get('auth/register'),
  updateProfile: get('auth/updateInfo'),
  changePassword: get('auth/changePassword'),
  //category
  listCategory: get('category/list'),
  allCategory: get('category/all'),
  getCategory: get('category/detail'),

  //food
  allFood: get('food/all'),
  listFood: get('food/list'),
  getFood: get('food/detail'),

  //order
  listOrder: get('order/list'),
  createOrder: get('order/create'),
  historyOrder: get('order/history'),
};
