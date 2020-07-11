import { get, post, patch, del, uuid } from "../plugins/Axios";

/**
 * 登入
 */

export const Login = data => post("api/auth/login", data);

/**
 * 產品
 */

export const getProduct = data =>
  get(`api/${uuid}/admin/ec/products`, { ...data });

export const createProduct = data =>
  post(`api/${uuid}/admin/ec/product`, { ...data });

export const editProduct = (id, data) =>
  patch(`api/${uuid}/admin/ec/product/${id}`, data);

export const destroyProduct = id => del(`api/${uuid}/admin/ec/product/${id}`);

/**
 * 上傳圖片
 */

export const getPic = data =>
  post(`api/${uuid}/admin/storage`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
