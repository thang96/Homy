import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const PutInvoiceUploadServiceApi = (token:string, invoiceId:string) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api-tenant/invoices/${invoiceId}/upload-payment`, null, {
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
