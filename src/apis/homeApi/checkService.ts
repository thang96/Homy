import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetAllInvoiceUnClosingsApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api-tenant/invoice-closings`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const GetListInvoiceUnClosingsApi = (token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api-tenant/invoice-closings/un-closings`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const GetDetailInvoiceUnClosingsApi = (token: string, id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api-tenant/invoice-closings/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const PutInvoiceUnClosingsApi = (
  token: string,
  data: object,
  id: string,
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api-tenant/invoice-closings/${id}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
