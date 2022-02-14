import { getRequest, postRequest, putRequest } from './index';

export const getLocalProducts = async () => getRequest('/products/my_products');
